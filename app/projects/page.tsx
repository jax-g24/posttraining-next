import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects · Post Training",
};

export default function ProjectsPage() {
  return (
    <div className="course-container">
      <header className="page-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Hands-on projects to build your post-training skills</p>
      </header>

      <main className="course-content">
        <div className="projects-section">
          <div className="project-card">
            <h2>Final Project</h2>
            <p className="subtitle">
              Design and build a product demo AI product prototype that demonstrates mastery of
              course concepts. Teams of 2-4 students will propose, build, and present a demo.
            </p>

            <div className="project-timeline">
              <div className="timeline-item">
                <span className="timeline-label">Team Formation</span>
                <span className="timeline-value">Feb 9</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">Proposal Due</span>
                <span className="timeline-value">Feb 23</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">WIP Check-in</span>
                <span className="timeline-value">Mar 30</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">Demo Day</span>
                <span className="timeline-value">May 4</span>
              </div>
            </div>

            <p className="project-description">
              The final project is your opportunity to explore a topic of your choice in depth.
              Projects should demonstrate technical sophistication and original thinking. Successful
              projects might included novel alignment techniques, agent architectures, evaluation
              frameworks, and creative applications of post-training methods.
            </p>

            <div className="milestones">
              <h4 className="milestones-title">Milestones</h4>
              <div className="milestone-item">
                <span className="milestone-date">Feb 9</span>
                <span className="milestone-text">Team formation and initial idea submission</span>
              </div>
              <div className="milestone-item">
                <span className="milestone-date">Feb 23</span>
                <span className="milestone-text">Detailed proposal with methodology and timeline</span>
              </div>
              <div className="milestone-item">
                <span className="milestone-date">Mar 30</span>
                <span className="milestone-text">Work-in-progress presentation and feedback session</span>
              </div>
              <div className="milestone-item">
                <span className="milestone-date">May 4</span>
                <span className="milestone-text">Final submission and Demo Day presentation</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
