import type { Metadata } from "next";
import { modules } from "@/lib/data";
import { ModuleCarousel } from "@/components/ModuleCarousel";

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
            <p className="course-meta">Mondays, CDSS 94, Spring 2026</p>
            <p className="course-meta">Collaboration 5:10–6PM in Cory 521</p>
            <p className="course-meta">Lecture 6:10–7:30PM in Soda 306</p>
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
        <ModuleCarousel modules={modules} />
      </main>
    </div>
  );
}
