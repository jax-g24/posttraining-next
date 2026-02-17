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
        <div className="calendar-grid">
          <div className="calendar-header">
            <div className="calendar-header-cell">Date</div>
            <div className="calendar-header-cell">Lecture</div>
            <div className="calendar-header-cell">Technical Work</div>
            <div className="calendar-header-cell">Materials</div>
            <div className="calendar-header-cell">Assignments Due</div>
          </div>

          {calendarWeeks.map((week, i) => (
            <div key={i} className={`calendar-row ${week.variant || ""}`}>
              <div className="calendar-cell">
                <div className="date-display">
                  <div className="date-month">{week.month}</div>
                  <div className="date-day">{week.day}</div>
                </div>
              </div>
              <div className="calendar-cell">
                <div className="cell-label">{week.weekLabel}</div>
                <div className="cell-content" style={week.variant === "highlight" ? { fontWeight: 600 } : undefined}>
                  {week.lecture}
                </div>
              </div>
              <div className="calendar-cell">
                {week.technicalWork.length > 0 ? (
                  week.technicalWork.map((tw, j) =>
                    tw.url ? (
                      <div key={j} className={j === 0 ? "cell-content" : "cell-subcontent"}>
                        <a href={tw.url} target="_blank" rel="noopener noreferrer" className="calendar-material-link">
                          {tw.title}
                        </a>
                      </div>
                    ) : (
                      <div key={j} className={j === 0 ? "cell-content" : "cell-subcontent"}>
                        {tw.title}
                      </div>
                    )
                  )
                ) : (
                  <div className="cell-content">—</div>
                )}
              </div>
              <div className="calendar-cell">
                {week.materials.length > 0 ? (
                  <div className="cell-content">
                    {week.materials.map((mat, j) => (
                      <a key={j} href={mat.url} target="_blank" rel="noopener noreferrer" className="calendar-material-link">
                        {mat.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="cell-content">—</div>
                )}
              </div>
              <div className="calendar-cell">
                {week.assignment ? (
                  <span className={`calendar-tag ${week.assignment.type}`}>{week.assignment.text}</span>
                ) : (
                  <div className="cell-content">—</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
