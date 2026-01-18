import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  // Admin (double click only)
  const handleAdminAccess = () => {
    navigate("/admin/login");
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company */}
        <div>
          <h3>Leep Learning</h3>
          <p>
            An academic consulting platform focused on structured guidance,
            institutional alignment, and outcome-driven educational pathways.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4>Navigation</h4>
          <p className="footer-link" onClick={() => navigate("/")}>Home</p>
          <p className="footer-link" onClick={() => navigate("/about")}>About</p>
          <p className="footer-link" onClick={() => navigate("/brochure")}>Brochure</p>
          <p className="footer-link" onClick={() => navigate("/contact")}>Contact</p>
        </div>

        {/* Platform */}
        <div>
          <h4>Platform</h4>

          {/* Student Login (public users) */}
          <p
            className="footer-link"
            onClick={() => navigate("/login")}
          >
            Student Access
          </p>

          {/* Employee Login (sales team) */}
          <p
            className="footer-link"
            onClick={() => navigate("/employee/login")}
          >
            Employee Login
          </p>

          {/* Hidden Admin Trigger */}
          <p
            className="admin-trigger"
            onDoubleClick={handleAdminAccess}
            title="Authorized access only"
          >
            Admin Panel
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4>Contact</h4>
          <p>info@leeplearning.com</p>
          <p>Mon–Sat</p>
          <p>Global</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} LeepLearning. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
