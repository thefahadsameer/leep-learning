import { useState } from "react";
import "./Apply.css";

function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    field: "",
    year: "",
    institution: "",
    program: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    let newErrors = {};

    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = true;
      if (!formData.email) newErrors.email = true;
      if (!formData.phone) newErrors.phone = true;
      if (!formData.address) newErrors.address = true;
    }

    if (currentStep === 2) {
      if (!formData.qualification) newErrors.qualification = true;
      if (!formData.field) newErrors.field = true;
      if (!formData.year) newErrors.year = true;
      if (!formData.institution) newErrors.institution = true;
    }

    if (currentStep === 3) {
      if (!formData.program) newErrors.program = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep(currentStep + 1);
  };

  const handleSubmit = () => {
    if (!validateStep()) return;

    setIsSubmitting(true);

    const existing =
      JSON.parse(localStorage.getItem("applications")) || [];

    const now = new Date();
    const isoTime = now.toISOString();

    const newApplication = {
      id: Date.now().toString(),
      ...formData,
      status: "New",
      date: now.toLocaleString(),
      lastUpdated: isoTime,
      auditTrail: [
        {
          action: "Application Submitted",
          from: null,
          to: "New",
          by: "Applicant",
          at: isoTime,
        },
      ],
    };

    const updatedApplications = [...existing, newApplication];

    setTimeout(() => {
      localStorage.setItem(
        "applications",
        JSON.stringify(updatedApplications)
      );

      alert("Application submitted successfully!");
      setIsSubmitting(false);
      setCurrentStep(1);
    }, 1000);
  };

  return (
    <div className="apply-page">
      <div className="apply-container">
        <div className="apply-header">
          <h1>Apply for Academic Guidance</h1>
          <p>
            Start your academic journey with expert consultation and
            institution-aligned pathways designed for confident outcomes.
          </p>
        </div>

        <div className="apply-progress">
          <div className={`step ${currentStep === 1 ? "active" : ""}`}>
            1. Personal Info
          </div>
          <div className={`step ${currentStep === 2 ? "active" : ""}`}>
            2. Academic Background
          </div>
          <div className={`step ${currentStep === 3 ? "active" : ""}`}>
            3. Program Interest
          </div>
        </div>

        {currentStep === 1 && (
          <div className="apply-section">
            <h2>Personal Information</h2>
            <div className="form-grid">
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className={errors.fullName ? "error" : ""}
              />
              <input
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
              />
              <input
                name="address"
                placeholder="Current Address"
                onChange={handleChange}
                className={`form-full ${errors.address ? "error" : ""}`}
              />
            </div>
            <div className="apply-submit">
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="apply-section">
            <h2>Academic Background</h2>
            <div className="form-grid">
              <input
                name="qualification"
                placeholder="Highest Qualification"
                onChange={handleChange}
                className={errors.qualification ? "error" : ""}
              />
              <input
                name="field"
                placeholder="Field of Study"
                onChange={handleChange}
                className={errors.field ? "error" : ""}
              />
              <input
                name="year"
                placeholder="Year of Completion"
                onChange={handleChange}
                className={errors.year ? "error" : ""}
              />
              <input
                name="institution"
                placeholder="Institution Name"
                onChange={handleChange}
                className={`form-full ${errors.institution ? "error" : ""}`}
              />
            </div>
            <div className="apply-submit">
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="apply-section">
            <h2>Program Interest</h2>

            <select
              name="program"
              onChange={handleChange}
              className={`form-full ${errors.program ? "error" : ""}`}
            >
              <option value="">Select Program Type</option>
              <option>Doctorate of Philosophy (PhD)</option>
              <option>Doctorate of Business Administration (DBA)</option>
              <option>Honorary Doctorate Program</option>
              <option>Post Doctorate Program</option>
            </select>

            <div className="apply-submit">
              <button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Application & Request Consultation"}
              </button>
            </div>
          </div>
        )}

        <p className="apply-note">
          Our academic advisor will contact you within 24–48 hours.
        </p>
      </div>
    </div>
  );
}

export default Apply;
