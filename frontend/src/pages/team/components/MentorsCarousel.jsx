import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import "./MentorsCarousel.css";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const STIFFNESS = 150;
const DAMPING = 24;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const wrap = (value, count) => ((value % count) + count) % count;
const nearest = (offset, count) => wrap(offset + count / 2, count) - count / 2;

const smootherstep = (t) => t * t * t * (t * (t * 6 - 15) + 10);

const edgeMask = (size) => {
  const stops = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1].map((t) => [
    smootherstep(t).toFixed(3),
    (t * size).toFixed(1),
  ]);
  const left = stops.map(
    ([alpha, x]) => `rgba(0, 0, 0, ${alpha}) ${x}px`
  );
  const right = [...stops]
    .reverse()
    .map(([alpha, x]) => `rgba(0, 0, 0, ${alpha}) calc(100% - ${x}px)`);
  return `linear-gradient(to right, ${[...left, ...right].join(", ")})`;
};

const band = (value, max) => {
  if (value < 0) return -0.3 * (1 - Math.exp(value / 0.55));
  if (value > max) return max + 0.3 * (1 - Math.exp((max - value) / 0.55));
  return value;
};

const pose = (index, position, s) => {
  const offset = s.loop ? nearest(index - position, s.count) : index - position;
  const distance = Math.abs(offset);
  const near = Math.min(distance, 1);
  const result = {
    transform: "none",
    opacity: 1,
    visible: true,
    layer: 10 - Math.min(9, Math.round(distance * 2)),
    focus: 1,
  };

  let x = offset * s.span;
  result.visible =
    x > -(s.inset + s.cardWidth + 20) &&
    x < s.width + s.bleed * 2 - s.inset + 20;
  result.focus = 1 - near * near * (3 - 2 * near);

  if (s.mode === "tilt") {
    result.visible = result.visible && distance < 1.4;
    result.transform = `translate3d(${x}px, 0, 0) rotateY(${
      -clamp(offset, -1, 1) * 22
    }deg)`;
  } else if (s.mode === "scale") {
    x -= Math.sign(offset) * near * s.cardWidth * 0.05;
    result.transform = `translate3d(${x}px, 0, 0) scale(${
      1 - 0.1 * near
    })`;
    result.opacity = 1 - 0.45 * near;
  } else {
    result.transform = `translate3d(${x}px, 0, 0)`;
  }
  return result;
};

/**
 * Individual Mentor Card Component
 */
const MentorCard = React.memo(function MentorCard({ mentor }) {
  if (!mentor) return null;

  const initials = mentor.name
    ? mentor.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : "TE";

  return (
    <div className="mentor-carousel-card">
      <span className="mentor-card-rim" />
      <div className="mentor-card-layout">
        {/* Left: Avatar Frame & Badges */}
        <div className="mentor-card-media">
          <div className="mentor-avatar-frame">
            {mentor.image ? (
              <img
                src={mentor.image}
                alt={mentor.name}
                className="mentor-avatar-img"
                loading="lazy"
              />
            ) : (
              <div className="mentor-avatar-monogram">
                <span>{initials}</span>
                <span className="mentor-monogram-sub">THIRD EYE</span>
              </div>
            )}
          </div>
          <div className="mentor-verified-pill">
            <span className="mentor-verified-dot" />
            <span>FACULTY</span>
          </div>
        </div>

        {/* Right: Details & Scrollable Bio */}
        <div className="mentor-card-details">
          <div className="mentor-card-header-bar">
            <span className="mentor-card-index">
              #{String(mentor.index || 1).padStart(2, "0")}
            </span>
            <span className="mentor-card-category">
              {mentor.category || "MENTOR"}
            </span>
          </div>

          <h3 className="mentor-card-name" title={mentor.name}>
            {mentor.name}
          </h3>

          <div className="mentor-card-role" title={mentor.role}>
            {mentor.role}
          </div>

          <div className="mentor-card-divider" />

          <div className="mentor-card-bio-wrap">
            <div className="mentor-card-desc">
              {mentor.description
                ? mentor.description
                    .split("\n")
                    .filter((p) => p.trim().length > 0)
                    .map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                : "Dedicated mentor and subject specialist at Third Eye Computer Classes, committed to practical student upskilling and career readiness."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * React Bits Swipeable Carousel for Mentors
 */
const MentorsCarousel = forwardRef(function MentorsCarousel(
  {
    items = [],
    baseWidth = 500,
    gap = 20,
    effect = "scale",
    loop = true,
    autoplay = false,
    autoplayDelay = 4500,
    pauseOnHover = true,
    draggable = true,
    onChange,
    className = "",
  },
  ref
) {
  const count = items.length;
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const slideRefs = useRef([]);
  const engineRef = useRef(null);
  const onChangeRef = useRef(onChange);

  // Responsive width calculation
  const [stageWidth, setStageWidth] = useState(
    typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 1200) : 1000
  );
  const [active, setActive] = useState(0);

  const startRef = useRef(active);
  const reportedRef = useRef(active);

  // Compute adaptive card dimensions: bigger than react bits default (300px),
  // but perfectly sized to ensure section NEVER cuts off on any viewport.
  const computeDimensions = useCallback(() => {
    let width = baseWidth;
    let height = 410;

    if (typeof window !== "undefined") {
      const vw = window.innerWidth;
      if (vw < 480) {
        width = Math.min(vw - 36, 330);
        height = 380;
      } else if (vw < 640) {
        width = Math.min(vw - 44, 380);
        height = 390;
      } else if (vw < 1024) {
        width = 440;
        height = 390;
      } else {
        width = 500;
        height = 410;
      }
    }
    return { width, height };
  }, [baseWidth]);

  const [{ width: cardWidth, height: cardHeight }, setDimensions] = useState(
    computeDimensions
  );

  useEffect(() => {
    const handleResize = () => {
      setDimensions(computeDimensions());
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [computeDimensions]);

  const clipped = true;
  const bleed = Math.round(Math.min(48, cardWidth * 0.1));
  const inset = bleed + Math.max(0, (stageWidth - cardWidth) / 2);

  const settings = {
    count,
    mode: effect,
    width: stageWidth,
    bleed,
    inset,
    cardWidth,
    span: cardWidth + Math.max(0, gap),
    loop: loop && count > 1,
    autoplay: autoplay && count > 1,
    autoplayDelay: Math.max(1000, autoplayDelay),
    pauseOnHover,
    draggable: draggable && count > 1,
  };

  const settingsRef = useRef(settings);

  useIsomorphicLayoutEffect(() => {
    onChangeRef.current = onChange;
    settingsRef.current = settings;
  });

  // Expose imperative methods (goTo, step) to parent component
  useImperativeHandle(
    ref,
    () => ({
      goTo: (index) => engineRef.current?.goTo(index),
      step: (dir) => engineRef.current?.step(dir),
      getActive: () => active,
    }),
    [active]
  );

  // Physics animation engine
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    if (!root || !stage || !viewport) return undefined;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const state = {
      p: startRef.current,
      v: 0,
      target: startRef.current,
      shown: startRef.current,
      elapsed: 0,
      hovered: false,
      visible: true,
      drag: null,
      wheeling: false,
      wheelTimer: 0,
      suppress: false,
      last: 0,
    };

    let raf = 0;
    let alive = true;

    const unit = (s) => s.span;
    const limit = (s, value) =>
      s.loop ? value : clamp(value, 0, s.count - 1);

    const apply = () => {
      const s = settingsRef.current;
      for (let i = 0; i < s.count; i++) {
        const slide = slideRefs.current[i];
        if (!slide) continue;
        const next = pose(i, state.p, s);
        slide.style.transform = next.transform;
        slide.style.opacity = String(next.opacity);
        slide.style.visibility = next.visible ? "visible" : "hidden";
        slide.style.zIndex = String(next.layer);
      }
    };

    const announce = () => {
      const s = settingsRef.current;
      if (!s.count) return;
      const index = s.loop
        ? wrap(Math.round(state.target), s.count)
        : clamp(Math.round(state.target), 0, s.count - 1);
      if (index === state.shown) return;
      state.shown = index;
      setActive(index);
    };

    const paused = (s) =>
      (s.pauseOnHover && state.hovered) ||
      Boolean(state.drag) ||
      state.wheeling ||
      !state.visible ||
      document.hidden;

    const tick = (now) => {
      raf = 0;
      if (!alive) return;
      const s = settingsRef.current;
      const dt = state.last ? Math.min(0.05, (now - state.last) / 1000) : 1 / 60;
      state.last = now;
      let busy = false;

      if (!state.drag?.moved && !state.wheeling) {
        if (reduce) {
          state.p = state.target;
          state.v = 0;
        } else {
          const steps = Math.ceil(dt * 240);
          const h = dt / steps;
          for (let k = 0; k < steps; k++) {
            state.v +=
              (STIFFNESS * (state.target - state.p) - DAMPING * state.v) * h;
            state.p += state.v * h;
          }
          if (
            Math.abs(state.target - state.p) < 0.0004 &&
            Math.abs(state.v) < 0.004
          ) {
            state.p = state.target;
            state.v = 0;
          } else {
            busy = true;
          }
        }
        if (!busy && s.loop && s.count) {
          state.target = wrap(Math.round(state.target), s.count);
          state.p = state.target;
        }
      }

      if (s.autoplay && !paused(s)) {
        state.elapsed += dt * 1000;
        if (state.elapsed >= s.autoplayDelay) step(1, true);
        busy = true;
      }

      apply();
      if (busy) raf = requestAnimationFrame(tick);
      else state.last = 0;
    };

    const wake = () => {
      if (!raf && alive) raf = requestAnimationFrame(tick);
    };

    const moveTo = (target) => {
      state.target = target;
      state.elapsed = 0;
      announce();
      apply();
      wake();
    };

    const step = (direction, auto = false) => {
      const s = settingsRef.current;
      if (s.count < 2) return;
      let next = Math.round(state.target) + direction;
      if (!s.loop) {
        if (auto && next > s.count - 1) next = 0;
        next = clamp(next, 0, s.count - 1);
      }
      moveTo(next);
    };

    const goTo = (index) => {
      const s = settingsRef.current;
      if (!s.count) return;
      const goal = clamp(Math.round(index), 0, s.count - 1);
      const current = Math.round(state.target);
      moveTo(
        s.loop ? current + nearest(goal - wrap(current, s.count), s.count) : goal
      );
    };

    // Pointer Drag Handling
    const onPointerDown = (event) => {
      const s = settingsRef.current;
      if (!s.draggable || (event.pointerType === "mouse" && event.button !== 0))
        return;
      state.drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        p: state.p,
        from: 0,
        moved: false,
        samples: [],
      };
    };

    const onPointerMove = (event) => {
      const drag = state.drag;
      if (!drag || event.pointerId !== drag.id) return;
      const s = settingsRef.current;
      if (!drag.moved) {
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          state.drag = null;
          return;
        }
        drag.moved = true;
        drag.x = event.clientX;
        drag.p = state.p;
        drag.from = Math.round(state.target);
        viewport.setPointerCapture?.(event.pointerId);
        viewport.dataset.dragging = "true";
      }
      const raw = drag.p - (event.clientX - drag.x) / unit(s);
      state.p = s.loop ? raw : band(raw, s.count - 1);
      state.v = 0;
      state.target = Math.round(limit(s, state.p));
      drag.samples.push([event.timeStamp, event.clientX]);
      if (drag.samples.length > 8) drag.samples.shift();
      announce();
      apply();
    };

    const onPointerUp = (event) => {
      const drag = state.drag;
      if (!drag || event.pointerId !== drag.id) return;
      state.drag = null;
      delete viewport.dataset.dragging;

      if (!drag.moved) {
        wake();
        return;
      }
      state.suppress = true;
      window.setTimeout(() => {
        state.suppress = false;
      }, 0);

      const s = settingsRef.current;
      const sample =
        drag.samples.find(([time]) => event.timeStamp - time < 90) ?? [
          event.timeStamp,
          event.clientX,
        ];
      const elapsed = Math.max(16, event.timeStamp - sample[0]);
      const velocity = clamp(
        ((sample[1] - event.clientX) / elapsed) * (1000 / unit(s)),
        -12,
        12
      );
      const travelled = state.p - drag.from;
      let target = Math.round(state.p + velocity * 0.2);

      if (target === drag.from) {
        if (Math.abs(velocity) > 0.8) target += Math.sign(velocity);
        else if (Math.abs(travelled) > 0.18) target += Math.sign(travelled);
      }
      if (!s.loop) target = clamp(target, 0, s.count - 1);
      const inside = s.loop || (state.p >= 0 && state.p <= s.count - 1);
      state.v = inside ? velocity : 0;
      moveTo(target);
    };

    const onClickCapture = (event) => {
      if (!state.suppress) return;
      event.preventDefault();
      event.stopPropagation();
      state.suppress = false;
    };

    const onWheel = (event) => {
      const s = settingsRef.current;
      if (!s.draggable || Math.abs(event.deltaX) <= Math.abs(event.deltaY))
        return;
      event.preventDefault();
      const raw = state.p + event.deltaX / unit(s);
      state.p = s.loop ? raw : clamp(raw, -0.15, s.count - 0.85);
      state.v = 0;
      state.wheeling = true;
      state.target = Math.round(limit(s, state.p));
      announce();
      apply();
      window.clearTimeout(state.wheelTimer);
      state.wheelTimer = window.setTimeout(() => {
        state.wheeling = false;
        moveTo(Math.round(limit(settingsRef.current, state.p)));
      }, 120);
    };

    const onKeyDown = (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest('input, textarea, select, [contenteditable="true"]')
      )
        return;
      const s = settingsRef.current;
      const keys = {
        ArrowRight: () => step(1),
        ArrowLeft: () => step(-1),
        Home: () => goTo(0),
        End: () => goTo(s.count - 1),
      };
      if (!keys[event.key]) return;
      event.preventDefault();
      keys[event.key]();
    };

    const onEnter = () => {
      state.hovered = true;
    };

    const onLeave = () => {
      state.hovered = false;
      wake();
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const box = entries[entries.length - 1]?.contentRect;
      if (box) setStageWidth(Math.max(1, Math.round(box.width)));
    });
    resizeObserver.observe(stage);

    const visibility = new IntersectionObserver((entries) => {
      state.visible = entries.some((entry) => entry.isIntersecting);
      if (state.visible) wake();
    });
    visibility.observe(root);

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("keydown", onKeyDown);
    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);

    engineRef.current = {
      goTo,
      step,
      sync: () => {
        const s = settingsRef.current;
        if (!s.loop && s.count) {
          state.target = clamp(Math.round(state.target), 0, s.count - 1);
          state.p = clamp(state.p, -0.3, s.count - 0.7);
        }
        announce();
        apply();
        wake();
      },
    };
    engineRef.current.sync();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(state.wheelTimer);
      engineRef.current = null;
      resizeObserver.disconnect();
      visibility.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("wheel", onWheel);
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    engineRef.current?.sync();
  });

  useEffect(() => {
    if (reportedRef.current === active) return;
    reportedRef.current = active;
    onChangeRef.current?.(active);
  }, [active]);

  const mask = clipped ? edgeMask(bleed + 10) : undefined;

  return (
    <div
      ref={rootRef}
      className={`mentors-carousel-root ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Mentors Carousel"
      tabIndex={0}
    >
      <div ref={stageRef} className="mentors-carousel-stage">
        <div
          ref={viewportRef}
          className="mentors-carousel-viewport"
          data-draggable={settings.draggable ? "true" : undefined}
          style={{
            height: cardHeight,
            marginInline: bleed ? -bleed : undefined,
            overflowX: "clip",
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        >
          {items.map((mentor, index) => {
            const initial = pose(index, active, settings);
            return (
              <div
                key={mentor.id || index}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="mentors-carousel-slide"
                style={{
                  left: inset,
                  width: cardWidth,
                  height: cardHeight,
                  transform: initial.transform,
                  opacity: initial.opacity,
                  visibility: initial.visible ? "visible" : "hidden",
                  zIndex: initial.layer,
                }}
                data-current={index === active ? "true" : undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                onClick={() => {
                  if (index !== active) engineRef.current?.goTo(index);
                }}
              >
                <MentorCard mentor={mentor} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Previous / Counter / Next */}
      <div className="mentors-carousel-controls">
        <button
          type="button"
          className="mentors-carousel-arrow"
          aria-label="Previous mentor"
          onClick={() => engineRef.current?.step(-1)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="mentors-carousel-counter">
          <span className="mentors-carousel-counter-current">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span>/</span>
          <span>{String(count).padStart(2, "0")}</span>
        </div>

        <button
          type="button"
          className="mentors-carousel-arrow"
          aria-label="Next mentor"
          onClick={() => engineRef.current?.step(1)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});

export default MentorsCarousel;
