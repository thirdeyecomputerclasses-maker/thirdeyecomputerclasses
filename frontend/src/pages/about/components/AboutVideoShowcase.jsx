import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink } from "lucide-react";
import { fetchMedia, getVideoInfo } from "../../../services/mediaApi";

export default function AboutVideoShowcase() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("/assets/webreel.mp4");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoInfo = getVideoInfo(videoSrc);

  useEffect(() => {
    fetchMedia({ page: "about", type: "video" })
      .then((data) => {
        const slot = data?.find((s) => s.slotKey === "about_showcase_reel");
        if (slot?.url) {
          setVideoSrc(slot.url);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => setIsPlaying(false));
    });

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [videoSrc]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <section className="relative z-10 py-10 sm:py-14 bg-[#050505] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glow backdrop behind video container */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#f6d96b]/20 via-[#d97706]/15 to-[#f6d96b]/20 blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

          {/* Video Container Frame */}
          <div
            ref={containerRef}
            onClick={videoInfo.type === "direct" ? togglePlay : undefined}
            className="relative rounded-[24px] sm:rounded-[30px] overflow-hidden border border-[#f6d96b]/25 bg-[#0a0805] shadow-[0_20px_60px_rgba(0,0,0,0.9)] aspect-video max-h-[75vh] w-full"
          >
            {videoInfo.type === "instagram" ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black/90 p-2 sm:p-4">
                <iframe
                  src={videoInfo.embedUrl}
                  title="ThirdEye Instagram Reel"
                  className="w-full max-w-[440px] h-full rounded-[18px] border-0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
                <a
                  href={videoInfo.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-[#f6d96b] text-[#f6d96b] hover:text-black border border-[#f6d96b]/40 text-xs font-bold transition-all shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Open Reel on Instagram</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            ) : videoInfo.type === "youtube" ? (
              <iframe
                src={videoInfo.embedUrl}
                title="ThirdEye Brand Reel"
                className="w-full h-full border-0 rounded-[24px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  key={videoSrc}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Subtle Gradient Vignette Overlays */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                {/* Center Play Overlay Icon when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 transition-all pointer-events-none">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f6d96b] text-black flex items-center justify-center shadow-[0_0_35px_rgba(246,217,107,0.8)] pl-1">
                      <Play className="w-8 h-8 fill-black" />
                    </div>
                  </div>
                )}

                {/* Bottom Controls Bar for direct videos */}
                <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="p-2 sm:p-2.5 rounded-xl bg-black/75 hover:bg-black/90 text-white hover:text-[#f6d96b] backdrop-blur-md border border-white/15 transition-all shadow-md cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2 sm:p-2.5 rounded-xl bg-black/75 hover:bg-black/90 text-white hover:text-[#f6d96b] backdrop-blur-md border border-white/15 transition-all shadow-md cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="hidden sm:inline-flex p-2 sm:p-2.5 rounded-xl bg-black/75 hover:bg-black/90 text-white hover:text-[#f6d96b] backdrop-blur-md border border-white/15 transition-all shadow-md cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Video scrub / progress line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                  <div
                    className="h-full bg-gradient-to-r from-[#f6d96b] to-[#f59e0b] transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            )}

            {/* Top Left Live Badge */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-mono font-medium shadow-md pointer-events-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span>LIVE SHOWREEL</span>
              <span className="text-zinc-500">•</span>
              <span className="text-[#f6d96b]">THIRDEYE CREATIVE LABS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
