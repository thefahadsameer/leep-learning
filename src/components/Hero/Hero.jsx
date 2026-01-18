import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <h1>
            Accelerate Your <br />
            Academic Journey
          </h1>

          <p>
            Leep Learning connects ambitious scholars with structured academic
            pathways, expert guidance, and institution-backed programs designed
            for faster outcomes.
          </p>

          <button className="btn-primary">
            Get Started Today
          </button>
        </div>

        {/* RIGHT IMAGE PLACEHOLDER */}
        <div className="hero-image">
          <div className="image-placeholder">
            Image Placeholder
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
