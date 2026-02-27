"use client";

import { useState } from "react";
import type { Module } from "@/lib/data";

export function ModuleCarousel({ modules }: { modules: Module[] }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const count = modules.length;

  const go = (dir: -1 | 1) => {
    setExpanded(null);
    setIndex((prev) => (prev + dir + count) % count);
  };

  const toggle = (num: number) => setExpanded(expanded === num ? null : num);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-stage">
        {modules.map((mod, i) => {
          const isActive = i === index;
          const isExpanded = expanded === mod.number && isActive;
          return (
            <div
              key={mod.number}
              className={`module-card ${isActive ? "active" : ""} ${mod.upcoming ? "upcoming" : ""} ${isExpanded ? "expanded" : ""}`}
              onClick={() => isActive && toggle(mod.number)}
            >
              <div className="module-hero" style={{ backgroundImage: `url('${mod.heroImage}')` }}>
                <div className={`module-info-panel ${isExpanded ? "visible" : ""}`}>
                  <div className="module-info-header">
                    <h2 className="module-title-dark">{mod.title}</h2>
                  </div>
                  <div className="module-lectures">
                    {mod.lectures.map((lec, li) => (
                      <div key={li} className="lecture-item">
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
                                  onClick={(e) => e.stopPropagation()}
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
                <button
                  className={`module-expand-btn ${isExpanded ? "expanded" : ""}`}
                  onClick={(e) => { e.stopPropagation(); toggle(mod.number); }}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? "−" : "+"}
                </button>
              </div>
              <div className="module-card-label">
                Module {["One", "Two", "Three", "Four"][mod.number - 1]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots">
          {modules.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === index ? "active" : ""}`}
              onClick={() => { setExpanded(null); setIndex(i); }}
              aria-label={`Go to module ${i + 1}`}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button className="carousel-arrow" onClick={() => go(-1)} aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 2 4 7 9 12"/></svg>
          </button>
          <button className="carousel-arrow" onClick={() => go(1)} aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 2 10 7 5 12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
