import "./GrowthChart.css";

function GrowthChart() {
  return (
    <section className="growth-section">
      <div className="growth-container">

        <h2 className="growth-title">
          Academic Progress <br />
          Visualized Clearly
        </h2>

        <p className="growth-subtext">
          Structured academic planning enables consistent progress through
          clearly defined milestones and institution-aligned timelines.
        </p>

        <div className="chart-area">
          <div className="bar bar-1">
            <span>Phase 1</span>
          </div>
          <div className="bar bar-2">
            <span>Phase 2</span>
          </div>
          <div className="bar bar-3">
            <span>Phase 3</span>
          </div>
          <div className="bar bar-4">
            <span>Phase 4</span>
          </div>
          <div className="bar bar-5">
            <span>Phase 5</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default GrowthChart;
