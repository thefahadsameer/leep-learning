import "./FinalCTA.css";

function FinalCTA() {
  return (
    <section className="final-cta-section">
      <div className="final-cta-container">

        {/* LEFT CONTENT */}
        <div className="final-cta-content">
          <p className="final-cta-small">
            Take the next step
          </p>

          <h2 className="final-cta-title">
            Begin Your <br />
            Academic Journey Today
          </h2>

          <p className="final-cta-text">
            Connect with our academic consulting team to explore structured,
            institution-backed pathways designed to help you move forward
            with confidence and clarity.
          </p>

          <button className="btn-primary">
            Get Started Now
          </button>
        </div>

        {/* RIGHT IMAGE PLACEHOLDER */}
        <div className="final-cta-image">
          <div className="final-image-placeholder">
            Image Placeholder
          </div>
        </div>

      </div>
    </section>
  );
}

export default FinalCTA;
