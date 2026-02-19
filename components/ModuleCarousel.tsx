"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Module } from "@/lib/data";

export function ModuleCarousel({ modules }: { modules: Module[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(".module-card") as HTMLElement;
    const amount = card ? card.offsetWidth + 18 : 400;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-arrows">
        <button
          className={`carousel-arrow ${!canScrollLeft ? "hidden" : ""}`}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          &#8249;
        </button>
        <button
          className={`carousel-arrow ${!canScrollRight ? "hidden" : ""}`}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </div>
      <div className="modules-grid" ref={scrollRef}>
        {modules.map((mod) => (
          <div
            key={mod.number}
            className={`module-card ${mod.upcoming ? "upcoming" : ""} ${expanded === mod.number ? "expanded" : ""}`}
          >
            <div className="module-hero" style={{ backgroundImage: `url('${mod.heroImage}')` }}>
              {expanded === mod.number && (
                <div className="module-info-panel">
                  <div className="module-info-header">
                    <span className="module-number-dark">Module {mod.number}</span>
                    <h2 className="module-title-dark">{mod.title}</h2>
                  </div>
                  <div className="module-lectures">
                    {mod.lectures.map((lec, i) => (
                      <div key={i} className="lecture-item">
                        <div className="lecture-header">
                          <span className="lecture-name">{lec.name}</span>
                          <span className="lecture-date">{lec.date}</span>
                        </div>
                        {lec.description && <p className="lecture-description">{lec.description}</p>}
                        {lec.links.length > 0 && (
                          <div className="lecture-links">
                            {lec.links.map((link, j) =>
                              link.disabled ? (
                                <span key={j} className="lecture-link disabled">{link.label}</span>
                              ) : (
                                <a
                                  key={j}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`lecture-link ${link.variant === "slides" ? "slides" : ""}`}
                                >
                                  {link.label}
                                </a>
                              )
                            )}
                          </div>
                        )}
                        {lec.tag && (
                          <span className={`lecture-tag tag-${lec.tag.type}`}>{lec.tag.text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                className={`module-expand-btn ${expanded === mod.number ? "expanded" : ""}`}
                onClick={() => setExpanded(expanded === mod.number ? null : mod.number)}
                aria-label={expanded === mod.number ? "Collapse" : "Expand"}
              >
                {expanded === mod.number ? "−" : "+"}
              </button>
            </div>
            <div className="module-card-label">
              Module {["One", "Two", "Three", "Four"][mod.number - 1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
