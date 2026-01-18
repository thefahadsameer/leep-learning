import "./Features.css";

function Features() {
  return (
    <section className="features-section">
      <div className="features-container">

        <h2>
          Build Your Academic Future <br />
          With Confidence
        </h2>

        <p className="features-subtext">
          Our consulting framework is designed to simplify complex academic
          decisions and guide learners toward institution-approved pathways
          with clarity, structure, and accountability.
        </p>

        <div className="features-cards">
          <div className="feature-card">
            <div className="video-placeholder">Video</div>
            <p>Guided Program Planning</p>
          </div>

          <div className="feature-card">
            <div className="video-placeholder">Video</div>
            <p>Institutional Coordination</p>
          </div>

          <div className="feature-card">
            <div className="video-placeholder">Video</div>
            <p>Accelerated Academic Pathways</p>
          </div>

          <div className="feature-card">
            <div className="video-placeholder">Video</div>
            <p>Ongoing Expert Support</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Features;
