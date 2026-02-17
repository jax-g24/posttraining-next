"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ModalState {
  videoId: string;
  slides?: string;
  notes?: string;
}

interface VideoModalContextType {
  open: (state: ModalState) => void;
}

const VideoModalContext = createContext<VideoModalContextType>({ open: () => {} });

export function useVideoModal() {
  return useContext(VideoModalContext);
}

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [state, setState] = useState<ModalState | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const open = useCallback((s: ModalState) => {
    setState(s);
    setActive(true);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setActive(false);
    document.body.style.overflow = "";
    setTimeout(() => {
      if (iframeRef.current) iframeRef.current.src = "";
    }, 400);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) close();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [active, close]);

  const videoSrc = state?.videoId
    ? state.videoId.startsWith("http")
      ? state.videoId
      : `https://www.youtube.com/embed/${state.videoId}?autoplay=1&rel=0`
    : "";

  return (
    <VideoModalContext.Provider value={{ open }}>
      <div className={`page-content ${active ? "blurred" : ""}`} id="pageContent">
        {children}
      </div>

      <div className={`video-modal ${active ? "active" : ""}`}>
        <div className="modal-backdrop" onClick={close}></div>
        <div className="modal-content" ref={contentRef}>
          <div className="modal-video-wrapper">
            {active && videoSrc && (
              <iframe
                ref={iframeRef}
                src={videoSrc}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          <div className="modal-controls">
            <div className="modal-links">
              {state?.slides && (
                <a href={state.slides} target="_blank" rel="noopener noreferrer" className="modal-link">
                  Slides
                </a>
              )}
              {state?.notes && (
                <a href={state.notes} target="_blank" rel="noopener noreferrer" className="modal-link">
                  Notes
                </a>
              )}
            </div>
            <button className="modal-close" aria-label="Close video" onClick={close}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </VideoModalContext.Provider>
  );
}
