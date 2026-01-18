import "./WhyWorks.css";

function WhyWorks() {
  return (
    <section className="why-section">
      <div className="why-container">

        <h2>
          A Smarter Way To <br />
          Achieve Academic Milestones
        </h2>

        <div className="why-grid">

          <div className="why-card">
            <div className="icon-placeholder">$</div>
            <p className="why-title">Structured Guidance</p>
            <p className="why-text">
              Clear academic planning eliminates confusion and reduces delays
              caused by unverified or fragmented information.
            </p>
          </div>

          <div className="why-card">
            <div className="icon-placeholder">👥</div>
            <p className="why-title">Pre-Aligned Institutions</p>
            <p className="why-text">
              Programs are aligned with institutions beforehand, ensuring
              smoother admissions and faster processing timelines.
            </p>
          </div>

          <div className="why-card">
            <div className="icon-placeholder">⏱</div>
            <p className="why-title">Time-Optimized Pathways</p>
            <p className="why-text">
              Academic routes are designed to minimize unnecessary steps while
              maintaining institutional standards.
            </p>
          </div>

          <div className="why-card">
            <div className="icon-placeholder">🎯</div>
            <p className="why-title">Outcome-Focused Support</p>
            <p className="why-text">
              Continuous oversight ensures learners stay aligned with their
              academic goals from start to completion.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyWorks;
