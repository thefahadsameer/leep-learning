import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">Leep Learning</Link>
        </div>

        {/* Menu */}
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/brochure">Course Brochure</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Buttons */}
        <div className="navbar-actions">
          <Link className="btn-outline" to="/login">
            Login / Signup
          </Link>
          <Link className="btn-primary" to="/apply">
            Apply Now
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
