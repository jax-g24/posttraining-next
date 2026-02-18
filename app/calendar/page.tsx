import type { Metadata } from "next";
import { calendarWeeks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Calendar · Post Training",
};

export default function CalendarPage() {
  return (
    <div className="course-container">
      <header className="page-header">
        <h1 className="page-title">Calendar</h1>
        <p className="page-subtitle">Weekly schedule of lectures, labs, and assignments</p>
      </header>

      <main className="course-content">
        <div className="calendar-cards">
          {calendarWeeks.map((week, i) => (
            <div key={i} className={`cal-card ${week.variant || ""}`}>
              <div className="cal-card-date">
                <span className="cal-card-month">{week.month}</span>
                <span className="cal-card-day">{week.day}</span>
              </div>
              <div className="cal-card-body">
                <div className="cal-card-section">
                  <div className="cal-card-label">{week.weekLabel}</div>
                  <div className="cal-card-lecture" style={week.variant === "highlight" ? { fontWeight: 500 } : undefined}>
                    {week.lecture}
                  </div>
                </div>
                {week.technicalWork.length > 0 && (
                  <div className="cal-card-section">
                    <div className="cal-card-label">Technical Work</div>
                    <div className="cal-card-row">
                      {week.technicalWork.map((tw, j) =>
                        tw.url ? (
                          <a key={j} href={tw.url} target="_blank" rel="noopener noreferrer" className="cal-card-link">
                            {tw.title}
                          </a>
                        ) : (
                          <span key={j} className="cal-card-meta">{tw.title}</span>
                        )
                      )}
                    </div>
                  </div>
                )}
                {week.materials.length > 0 && (
                  <div className="cal-card-section">
                    <div className="cal-card-label">Materials</div>
                    <div className="cal-card-row">
                      {week.materials.map((mat, j) => (
                        <a key={j} href={mat.url} target="_blank" rel="noopener noreferrer" className="cal-card-link">
                          {mat.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {week.assignment && (
                  <div className="cal-card-section">
                    <div className="cal-card-label">Due</div>
                    <div className="cal-card-tag">{week.assignment.text}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
