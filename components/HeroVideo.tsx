"use client";

import { useRef, useState, useEffect } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showTap, setShowTap] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const timer = setTimeout(() => {
      const p = video.play();
      if (p !== undefined) {
        p.then(() => setShowTap(false)).catch(() => setShowTap(true));
      }
    }, 200);

    const onTouch = () => {
      if (video.paused) {
        video.play();
        setShowTap(false);
      }
    };
    document.addEventListener("touchstart", onTouch, { once: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("touchstart", onTouch);
    };
  }, []);

  const handleTap = () => {
    videoRef.current?.play();
    setShowTap(false);
  };

  return (
    <section className="hero">
      <div className="hero-video">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-still.jpg"
          >
            <source
              src="https://vz-3f73a609-be6.b-cdn.net/62552df7-25cc-46fa-990d-a1604c7b5c1b/play_1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div
            className={`video-tap-overlay ${showTap ? "visible" : ""}`}
            onClick={handleTap}
          >
            <span className="tap-to-play">Tap to play</span>
          </div>
        </div>
      </div>
    </section>
  );
}
