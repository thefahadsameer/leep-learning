import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployeeSession } from "../utils/employeeSession";
import "../styles/employeeLogin.css";

function EmployeeLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !code) {
      setError("Email and secure code are required");
      return;
    }

    if (!/^\d{4}$/.test(code)) {
      setError("Secure code must be 4 digits");
      return;
    }

    const employees =
      JSON.parse(localStorage.getItem("employees")) || [];

    const employee = employees.find(
      (e) =>
        e.email === email &&
        e.secureCode === code &&
        e.active === true
    );

    if (!employee) {
      setError("Invalid credentials or inactive account");
      return;
    }

    const session = createEmployeeSession(employee);
    localStorage.setItem("employeeSession", JSON.stringify(session));

    navigate("/employee/dashboard");
  };

  return (
    <div className="employee-login-wrapper">
      <div className="employee-login-card">
        <h2>Employee Login</h2>
        <p>Sales team access</p>

        {error && <div className="employee-error">{error}</div>}

        <div className="employee-form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@leeplearning.com"
          />
        </div>

        <div className="employee-form-group">
          <label>4-Digit Secure Code</label>
          <input
            type="password"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="••••"
          />
        </div>

        <button
          className="employee-login-btn"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default EmployeeLogin;
