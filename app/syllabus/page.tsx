import type { Metadata } from "next";
import { modules } from "@/lib/data";

export const metadata: Metadata = {
  title: "Syllabus · Post Training",
};

export default function SyllabusPage() {
  return (
    <div className="course-container">
      <header className="course-header">
        <div className="course-header-left">
          <h1 className="course-title">Syllabus</h1>
          <p className="course-description">
            A rigorous, hands-on exploration of post-training: how we shape model behavior through
            reinforcement learning, align objectives, design reward functions, build evaluations, and
            turn foundation models into reliable, useful AI systems.
          </p>
          <div className="course-details">
            <p className="course-meta">CDSS 94 · Spring 2026</p>
            <p className="course-meta">
              Mondays | <span className="course-collab">Collaboration</span> 5:10–6PM in Cory 521 |{" "}
              <span className="course-collab">Lecture</span> 6:10–7:30PM in Soda 306
            </p>
          </div>
        </div>
        <div className="teaching-staff-right">
          <a href="https://x.com/karinanguyen_" target="_blank" rel="noopener noreferrer" className="staff-member-large">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/karina.jpeg" alt="Karina Nguyen" />
            <span>Karina Nguyen</span>
          </a>
          <a href="https://x.com/KJHMiao" target="_blank" rel="noopener noreferrer" className="staff-member-large">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/kevin.png" alt="Kevin Miao" />
            <span>Kevin Miao</span>
          </a>
        </div>
      </header>

      <main className="course-content">
        <div className="modules-grid">
          {modules.map((mod) => (
            <div key={mod.number} className={`module-card ${mod.upcoming ? "upcoming" : ""}`}>
              <div className="module-hero" style={{ backgroundImage: `url('${mod.heroImage}')` }}>
                <div className="module-overlay">
                  <span className="module-number">Module {mod.number}</span>
                  <h2 className="module-title">{mod.title}</h2>
                </div>
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
          ))}
        </div>
      </main>
    </div>
  );
}
