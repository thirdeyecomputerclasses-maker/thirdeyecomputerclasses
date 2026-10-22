import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import Matter from "matter-js";

const { Engine, Bodies, Composite, Body } = Matter;

const DEFAULT_ITEMS = [
  "2D & 3D Animation",
  "Full-Stack Dev",
  "Python AI Systems",
  "Jewelry CAD Matrix",
];

const GAP = 20;
const DRAG_MIN = 4;
const ZONE_PAD = 14;

const jitter = (i) => {
  const x = Math.sin(i * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};

const layout = (list, spread, lift, tilt, sizes, isMobile = false) => {
  // Alternating Zigzag Layout: One Right corner, then one Left corner below, cascading down to the folder
  if (list.length === 4) {
    if (isMobile) {
      return [
        { x: -10, y: -lift - 16,  r: -1.2 }, // [0] Digital Marketing: Lowest card
        { x:  12, y: -lift - 68,  r:  1.2 }, // [1] UI/UX Designing: Second card
        { x:  -8, y: -lift - 120, r: -0.8 }, // [2] Software Development: Third card
        { x:  10, y: -lift - 172, r:  0.8 }, // [3] Video Editing: Top card
      ];
    }
    // Laptop / Desktop: spacious alternating right/left corner cascade
    return [
      { x: -88, y: -lift - 8,   r: -2.5 }, // [0] Digital Marketing: Lower Left corner
      { x:  88, y: -lift - 60,  r:  2.5 }, // [1] UI/UX Designing: Lower Right corner
      { x: -88, y: -lift - 114, r: -2.5 }, // [2] Software Development: Upper Left corner
      { x:  88, y: -lift - 168, r:  2.5 }, // [3] Video Editing: Top Right corner
    ];
  }

  const rows = [];
  let row = [];
  let width = 0;
  const maxPerRow = isMobile ? 2 : 3;
  const gap = isMobile ? 10 : GAP;

  list.forEach((item, i) => {
    const defaultPw = isMobile ? 135 : 180;
    const measuredW = sizes[i]?.w;
    const pw = measuredW ? Math.min(measuredW, isMobile ? 150 : 200) : defaultPw;

    if (row.length >= maxPerRow) {
      rows.push({ items: row, width });
      row = [];
      width = 0;
    }
    row.push({ i, pw });
    width += (row.length > 1 ? gap : 0) + pw;
  });
  if (row.length) rows.push({ items: row, width });

  const pos = [];
  const rowHeight = isMobile ? 54 : 70;

  rows.forEach((r, ri) => {
    let x = -r.width / 2;
    const shift = (ri % 2 ? 1 : -1) * (isMobile ? 6 : 10);
    r.items.forEach(({ i, pw }) => {
      const j = jitter(i);
      pos[i] = {
        x: x + pw / 2 + shift + (j - 0.5) * 3,
        y: -lift - ri * rowHeight - (j - 0.5) * 3,
        r: (isMobile ? tilt * 0.65 : tilt) * (j * 2 - 1),
      };
      x += pw + gap;
    });
  });
  return pos;
};

export default function FolderFloat({
  items = DEFAULT_ITEMS,
  label = "Courses",
  sublabel = "",
  trigger = "hover",
  defaultOpen = false,
  isOpen,
  closeOnLeave = false,
  closeOnSelect = false,
  physics = true,
  drift = 0.6,
  onSelect,
  onOpenChange,
  folderColor = "#1a140d",
  frontColor = "#261f15",
  paperColor = "#fefbf3",
  itemColor = "#14100a",
  itemTextColor = "#ffffff",
  labelColor = "#ffffff",
  width = 270,
  height = 185,
  radius = 18,
  spread = 205,
  lift = 26,
  tilt = 7,
  flapAngle = 34,
  restAngle = 14,
  openDuration = 520,
  stagger = 40,
  bounce = 0.3,
  className = "",
  isMobile: propIsMobile,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const [popped, setPopped] = useState(-1);
  const [live, setLive] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [internalIsMobile, setInternalIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const check = () => setInternalIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isMobile = propIsMobile !== undefined ? propIsMobile : internalIsMobile;

  const anchorRef = useRef(null);
  const pillRefs = useRef([]);
  const world = useRef({
    engine: null,
    bodies: [],
    sizes: [],
    raf: 0,
    last: 0,
    t0: 0,
    drag: null,
    zone: null,
    live: false,
  });

  const latest = useRef({});
  latest.current = { onSelect, onOpenChange, drift, reduce: false };
  const popTimer = useRef(undefined);
  const liveTimer = useRef(undefined);

  const list = items.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item
  );
  const n = list.length;
  const sub = sublabel !== undefined ? sublabel : `${n} ${n === 1 ? "course" : "courses"}`;
  const pos = layout(list, spread, lift, tilt, sizes, isMobile);

  const labelsKey = list.map((item) => `${item.label}-${item.image || ""}`).join("|");

  useLayoutEffect(() => {
    const measure = () => {
      const next = pillRefs.current
        .slice(0, n)
        .map((el) => (el ? { w: el.offsetWidth, h: el.offsetHeight } : null));
      if (next.some((s) => !s)) return;
      setSizes((prev) =>
        prev.length === next.length &&
        prev.every((s, i) => s.w === next[i].w && s.h === next[i].h)
          ? prev
          : next
      );
    };
    measure();
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
  }, [n, labelsKey]);

  const stopPhysics = useCallback(() => {
    const w = world.current;
    clearTimeout(liveTimer.current);
    cancelAnimationFrame(w.raf);
    w.raf = 0;
    if (w.engine) {
      w.bodies.forEach((b, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        el.style.setProperty("--x", `${b.position.x.toFixed(1)}px`);
        el.style.setProperty(
          "--y",
          `${(b.position.y - w.sizes[i].h / 2).toFixed(1)}px`
        );
      });
      Composite.clear(w.engine.world, false, true);
      Engine.clear(w.engine);
      w.engine = null;
    }
    w.bodies = [];
    w.drag = null;
    w.live = false;
    setLive(false);
  }, []);

  const startPhysics = useCallback(() => {
    const w = world.current;
    if (w.engine) return;
    const els = pillRefs.current.slice(0, n);
    if (els.some((el) => !el)) return;
    const engine = Engine.create({ gravity: { x: 0, y: 0 } });
    engine.enableSleeping = false;
    w.engine = engine;
    w.sizes = els.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));
    const ys = pos.map((p) => p.y);
    const zone = {
      left: -spread - ZONE_PAD,
      right: spread + ZONE_PAD,
      top: Math.min(...ys) - ZONE_PAD,
      bottom: -lift + Math.max(...w.sizes.map((s) => s.h)),
    };
    w.zone = zone;
    w.bodies = els.map((el, i) => {
      const { w: bw, h: bh } = w.sizes[i];
      const b = Bodies.rectangle(pos[i].x, pos[i].y + bh / 2, bw, bh, {
        chamfer: { radius: Math.min(bh / 2 - 1, 12) },
        restitution: 0.5,
        friction: 0,
        frictionAir: 0.08,
        inertia: Infinity,
      });
      b.plugin = { phase: jitter(i) * Math.PI * 2 };
      return b;
    });
    const T = 80;
    const walls = [
      Bodies.rectangle(
        (zone.left + zone.right) / 2,
        zone.top - T / 2,
        zone.right - zone.left + 2 * T,
        T,
        { isStatic: true }
      ),
      Bodies.rectangle(
        (zone.left + zone.right) / 2,
        zone.bottom + T / 2,
        zone.right - zone.left + 2 * T,
        T,
        { isStatic: true }
      ),
      Bodies.rectangle(
        zone.left - T / 2,
        (zone.top + zone.bottom) / 2,
        T,
        zone.bottom - zone.top + 2 * T,
        { isStatic: true }
      ),
      Bodies.rectangle(
        zone.right + T / 2,
        (zone.top + zone.bottom) / 2,
        T,
        zone.bottom - zone.top + 2 * T,
        { isStatic: true }
      ),
    ];
    Composite.add(engine.world, [...w.bodies, ...walls]);
    w.live = true;
    w.last = 0;
    w.t0 = performance.now();
    setLive(true);

    const tick = (now) => {
      const s = world.current;
      if (!s.engine) return;
      const dt = s.last ? Math.min(32, now - s.last) : 16;
      s.last = now;
      const t = (now - s.t0) / 1000;
      const k = latest.current.drift * 0.00005 * Math.min(1, t / 2);
      s.bodies.forEach((b, i) => {
        if (s.drag && s.drag.i === i) return;
        const ph = b.plugin.phase;
        Body.applyForce(b, b.position, {
          x: Math.sin(t * 0.9 + ph) * k * b.mass,
          y: Math.cos(t * 1.3 + ph * 1.7) * k * b.mass,
        });
      });
      Engine.update(s.engine, dt);
      s.bodies.forEach((b, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        el.style.setProperty("--x", `${b.position.x.toFixed(1)}px`);
        el.style.setProperty(
          "--y",
          `${(b.position.y - s.sizes[i].h / 2).toFixed(1)}px`
        );
      });
      s.raf = requestAnimationFrame(tick);
    };
    w.raf = requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, spread, lift, pos.map((p) => `${p.x},${p.y}`).join("|")]);

  const set = useCallback(
    (next) => {
      if (!next) stopPhysics();
      setInternalOpen(next);
      latest.current.onOpenChange?.(next);
    },
    [stopPhysics]
  );

  useEffect(() => {
    clearTimeout(liveTimer.current);
    if (!open || !physics || latest.current.reduce) {
      if (!open) stopPhysics();
      else if (!physics) stopPhysics();
      return undefined;
    }
    liveTimer.current = setTimeout(
      startPhysics,
      openDuration + (n - 1) * stagger + 80
    );
    return () => clearTimeout(liveTimer.current);
  }, [open, physics, openDuration, stagger, n, startPhysics, stopPhysics]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      latest.current.reduce = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(popTimer.current);
      stopPhysics();
    },
    [stopPhysics]
  );

  const pick = (item, i) => {
    latest.current.onSelect?.(item.value, i, item);
    clearTimeout(popTimer.current);
    setPopped(i);
    popTimer.current = setTimeout(() => setPopped(-1), 320);
    if (closeOnSelect) set(false);
  };

  const pointerAt = (e) => {
    const r = anchorRef.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  };

  const down = (e, i) => {
    const w = world.current;
    if (!w.live || e.button !== 0) return;
    const b = w.bodies[i];
    if (!b) return;
    const p = pointerAt(e);
    w.drag = {
      i,
      id: e.pointerId,
      dx: b.position.x - p.x,
      dy: b.position.y - p.y,
      sx: e.clientX,
      sy: e.clientY,
      pointerType: e.pointerType,
      moved: false,
    };
    // Only capture immediately for mouse or pen, not touch, so native vertical scroll is never trapped
    if (e.pointerType !== "touch") {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const move = (e, i) => {
    const w = world.current;
    const d = w.drag;
    if (!d || d.i !== i || d.id !== e.pointerId) return;
    if (!d.moved) {
      const dist = Math.hypot(e.clientX - d.sx, e.clientY - d.sy);
      if (dist >= DRAG_MIN) {
        if (d.pointerType === "touch") {
          const dx = Math.abs(e.clientX - d.sx);
          const dy = Math.abs(e.clientY - d.sy);
          // If gesture is mostly vertical, it's a page scroll — abort drag
          if (dy > dx * 1.15) {
            w.drag = null;
            return;
          }
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {}
        }
        d.moved = true;
        e.currentTarget.setAttribute("data-drag", "");
      }
    }
    if (!d.moved) return;
    const b = w.bodies[i];
    const { w: bw, h: bh } = w.sizes[i];
    const z = w.zone;
    const p = pointerAt(e);
    const x = Math.min(z.right - bw / 2, Math.max(z.left + bw / 2, p.x + d.dx));
    const y = Math.min(z.bottom - bh / 2, Math.max(z.top + bh / 2, p.y + d.dy));
    Body.setVelocity(b, {
      x: (x - b.position.x) * 0.6,
      y: (y - b.position.y) * 0.6,
    });
    Body.setPosition(b, { x, y });
  };

  const up = (e, i, item) => {
    const w = world.current;
    const d = w.drag;
    if (!d || d.i !== i || d.id !== e.pointerId) return;
    w.drag = null;
    e.currentTarget.removeAttribute("data-drag");
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    if (!d.moved && e.type === "pointerup") pick(item, i);
  };

  const hover = trigger === "hover";

  return (
    <div
      className={`folder-float${className ? ` ${className}` : ""}`}
      data-open={open ? "" : undefined}
      data-live={live ? "" : undefined}
      data-physics={physics ? "" : undefined}
      data-trigger={trigger}
      onPointerEnter={hover ? () => set(true) : undefined}
      onPointerLeave={
        hover && closeOnLeave
          ? () => {
              if (!world.current.drag) set(false);
            }
          : undefined
      }
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          set(false);
        }
      }}
      style={{
        "--ff-w": `${width}px`,
        "--ff-h": `${height}px`,
        "--ff-r": `${radius}px`,
        "--ff-back": folderColor,
        "--ff-front": frontColor,
        "--ff-paper": paperColor,
        "--ff-item": itemColor,
        "--ff-item-ink": itemTextColor,
        "--ff-label": labelColor,
        "--ff-spread": `${spread}px`,
        "--ff-lift": `${lift}px`,
        "--ff-angle": `${flapAngle}deg`,
        "--ff-rest": `${restAngle}deg`,
        "--ff-open": `${openDuration}ms`,
        "--ff-close": `${Math.round(openDuration * 0.6)}ms`,
        "--ff-stagger": `${stagger}ms`,
        "--ff-n": n,
        "--ff-spring": `cubic-bezier(0.34, ${(1 + bounce * 1.9).toFixed(2)}, 0.64, 1)`,
      }}
    >
      <style>{`
        .folder-float {
          position: relative;
          display: inline-block;
          width: var(--ff-w);
          padding-top: 14px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
          touch-action: pan-y;
        }

        .folder-float__folder {
          position: relative;
          width: var(--ff-w);
          height: var(--ff-h);
          touch-action: pan-y;
        }

        .folder-float__back {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: var(--ff-r);
          background: var(--ff-back);
          transform: perspective(600px) rotateX(8deg);
          transform-origin: 50% 100%;
          border: 1px solid rgba(246, 217, 107, 0.25);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.85);
        }

        .folder-float__back::before {
          content: '';
          position: absolute;
          top: -14px;
          left: 0;
          width: 44%;
          height: calc(14px + var(--ff-r));
          border-radius: var(--ff-r) var(--ff-r) 0 0;
          background: inherit;
          border-top: 1px solid rgba(246, 217, 107, 0.35);
          border-left: 1px solid rgba(246, 217, 107, 0.25);
          border-right: 1px solid rgba(246, 217, 107, 0.25);
        }

        .folder-float__paper {
          position: absolute;
          top: 10%;
          z-index: 1;
          right: 8%;
          left: 8%;
          height: 52%;
          border-radius: 10px;
          background: var(--ff-paper);
          opacity: 0;
          transform: translateY(12px);
          transition:
            transform var(--ff-close) var(--ff-ease-out),
            opacity var(--ff-close) ease;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
        }

        .folder-float__front {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 5px;
          height: 78%;
          padding: 16px 18px;
          box-sizing: border-box;
          border-radius: var(--ff-r);
          background: linear-gradient(180deg, color-mix(in srgb, var(--ff-front) 94%, #fff), var(--ff-front) 65%);
          color: var(--ff-label);
          border: 1px solid rgba(246, 217, 107, 0.3);
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transform: perspective(600px) rotateX(calc(-1 * var(--ff-rest)));
          transform-origin: 50% 100%;
          transition: transform var(--ff-open) cubic-bezier(0.23, 1, 0.32, 1), border-color 300ms ease;
        }

        .folder-float:hover .folder-float__front {
          border-color: rgba(246, 217, 107, 0.55);
        }

        .folder-float__label {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #ffffff;
        }

        .folder-float__sub {
          font-size: 11px;
          font-family: monospace;
          color: #f6d96b;
          opacity: 0.95;
        }

        .folder-float__trigger {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 3;
          height: 78%;
          margin: 0;
          padding: 0;
          border: 0;
          border-radius: var(--ff-r);
          background: transparent;
          cursor: pointer;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .folder-float[data-open] .folder-float__front {
          transform: perspective(600px) rotateX(calc(-1 * var(--ff-angle)));
          border-color: rgba(246, 217, 107, 0.8);
          box-shadow: 0 -14px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(246, 217, 107, 0.25);
        }

        .folder-float[data-open] .folder-float__paper {
          opacity: 1;
          transform: translateY(0);
          transition:
            transform var(--ff-open) cubic-bezier(0.23, 1, 0.32, 1),
            opacity 200ms ease;
        }

        .folder-float__items {
          position: absolute;
          top: 14px;
          left: 50%;
          z-index: 10;
          width: 0;
          height: 0;
          touch-action: pan-y;
        }

        .folder-float[data-open] .folder-float__items::before {
          content: '';
          position: absolute;
          top: calc(-1 * (var(--ff-lift) + 120px));
          left: calc(-1 * (var(--ff-spread) + 100px));
          width: calc(2 * var(--ff-spread) + 200px);
          height: calc(var(--ff-lift) + 120px);
        }

        .folder-float__item {
          position: absolute;
          top: 0;
          left: 50%;
          margin: 0;
          padding: 10px 18px;
          min-height: 58px;
          border: 1px solid color-mix(in srgb, var(--card-accent, #f6d96b) 45%, transparent);
          border-radius: 18px;
          background: rgba(18, 14, 9, 0.96);
          color: var(--ff-item-ink);
          font: inherit;
          white-space: nowrap;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.9), 0 0 24px color-mix(in srgb, var(--card-accent, #f6d96b) 25%, transparent);
          cursor: pointer;
          outline: none;
          opacity: 0;
          transform: translate(-50%, 40px) scale(0.6);
          transform-origin: 50% 50%;
          pointer-events: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: pan-y;
          transition:
            transform var(--ff-close) cubic-bezier(0.23, 1, 0.32, 1) calc((var(--ff-n) - 1 - var(--i)) * var(--ff-stagger) * 0.5),
            opacity 160ms ease calc((var(--ff-n) - 1 - var(--i)) * var(--ff-stagger) * 0.5 + var(--ff-close) * 0.45),
            scale 160ms cubic-bezier(0.23, 1, 0.32, 1),
            background-color 200ms ease,
            border-color 200ms ease;
        }

        @media (max-width: 640px) {
          .folder-float {
            width: 240px;
          }
          .folder-float__folder {
            width: 240px;
          }
          .folder-float__front {
            padding: 10px 14px;
            height: 78%;
          }
          .folder-float__label {
            font-size: 12px;
            line-height: 1.2;
          }
          .folder-float__sub {
            font-size: 9px;
          }
          .folder-float__items::before {
            display: none !important;
          }
          .folder-float__item {
            padding: 6px 12px;
            min-height: 42px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.85);
          }
          .folder-float__thumb {
            width: 32px !important;
            height: 32px !important;
            border-radius: 7px !important;
          }
          .folder-float__drift {
            gap: 9px !important;
          }
          .folder-float__item-title {
            font-size: 11.5px !important;
            line-height: 1.2 !important;
          }
          .folder-float__item-subtitle {
            font-size: 9px !important;
            margin-top: 1px !important;
          }
        }

        .folder-float[data-open] .folder-float__item {
          opacity: 1;
          transform: translate(calc(-50% + var(--x)), var(--y)) rotate(var(--r)) scale(1);
          pointer-events: auto;
          transition:
            transform var(--ff-open) var(--ff-spring) calc(var(--i) * var(--ff-stagger)),
            opacity 160ms ease calc(var(--i) * var(--ff-stagger)),
            scale 160ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .folder-float[data-live] .folder-float__item {
          cursor: grab;
          transition: scale 160ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .folder-float__item[data-drag] {
          cursor: grabbing;
        }

        @media (hover: hover) and (pointer: fine) {
          .folder-float[data-open] .folder-float__item:hover {
            scale: 1.05;
            background: #20170d;
            border-color: var(--card-accent, #f6d96b);
            box-shadow: 0 0 32px color-mix(in srgb, var(--card-accent, #f6d96b) 60%, transparent);
          }
        }

        .folder-float[data-open] .folder-float__item:active {
          scale: 0.96;
        }

        .folder-float__item[data-pop] {
          animation: folder-float-pop 320ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .folder-float__drift {
          display: flex;
          align-items: center;
          gap: 12px;
          animation: folder-float-drift 3.2s ease-in-out infinite;
          animation-delay: calc(var(--i) * -0.7s);
          animation-play-state: paused;
        }

        .folder-float[data-open] .folder-float__drift {
          animation-play-state: running;
        }

        .folder-float[data-physics] .folder-float__drift,
        .folder-float[data-live] .folder-float__drift {
          animation: none;
        }

        .folder-float__thumb {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1.5px solid color-mix(in srgb, var(--card-accent, #f6d96b) 60%, transparent);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.8);
        }

        .folder-float__drift {
          display: flex;
          align-items: center;
          gap: 14px;
          animation: folder-float-drift 3.2s ease-in-out infinite;
          animation-delay: calc(var(--i) * -0.7s);
          animation-play-state: paused;
        }

        .folder-float__item-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          line-height: 1.25;
        }

        .folder-float__item-title {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .folder-float__item-subtitle {
          font-size: 11px;
          font-family: monospace;
          color: var(--card-accent, #f6d96b);
          opacity: 0.95;
          margin-top: 2px;
        }

        @keyframes folder-float-drift {
          0%, 100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -3px;
          }
        }

        @keyframes folder-float-pop {
          30% {
            scale: 1.15;
          }
          100% {
            scale: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .folder-float__front,
          .folder-float__paper {
            transition: opacity 200ms ease;
          }
          .folder-float[data-open] .folder-float__front {
            transform: perspective(600px) rotateX(calc(-1 * var(--ff-rest)));
          }
          .folder-float__paper {
            transform: none !important;
          }
          .folder-float__item {
            transition: opacity 200ms ease;
          }
          .folder-float[data-open] .folder-float__item {
            transition: opacity 200ms ease calc(var(--i) * var(--ff-stagger));
          }
        }
      `}</style>

      {/* Floating Image Cards Cloud */}
      <div ref={anchorRef} className="folder-float__items">
        {list.map((item, i) => {
          const p = pos[i];
          return (
            <button
              key={`${item.value}-${i}`}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              type="button"
              className="folder-float__item"
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              data-pop={popped === i ? "" : undefined}
              style={{
                "--i": i,
                "--x": `${p.x.toFixed(1)}px`,
                "--y": `${p.y.toFixed(1)}px`,
                "--r": `${p.r.toFixed(2)}deg`,
                "--card-accent": item.accentColor || "#f6d96b",
              }}
              onPointerDown={(e) => down(e, i)}
              onPointerMove={(e) => move(e, i)}
              onPointerUp={(e) => up(e, i, item)}
              onPointerCancel={(e) => up(e, i, item)}
              onClick={(e) => {
                if (!world.current.live || e.detail === 0) pick(item, i);
              }}
            >
              <div className="folder-float__drift">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.label}
                    className="folder-float__thumb"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="folder-float__item-text">
                  <span className="folder-float__item-title">{item.label}</span>
                  {item.subtitle && (
                    <span className="folder-float__item-subtitle">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Physical Folder Back, Rising Paper, and 3D Tilting Front Flap */}
      <div className="folder-float__folder">
        <span className="folder-float__back" aria-hidden="true" />
        <span className="folder-float__paper" aria-hidden="true" />
        <span className="folder-float__front" aria-hidden="true">
          <span className="folder-float__label">{label}</span>
          {sub && <span className="folder-float__sub">{sub}</span>}
        </span>
        <button
          type="button"
          className="folder-float__trigger"
          aria-expanded={open}
          aria-label={`${label}, ${sub}`}
          onClick={() => set(!open)}
        />
      </div>
    </div>
  );
}
