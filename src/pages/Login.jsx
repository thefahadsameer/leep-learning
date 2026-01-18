function Login() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
          Welcome Back
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "24px",
          }}
        >
          Login to continue your journey
        </p>

        <form>
          <div style={{ marginBottom: "16px" }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          <button style={buttonStyle}>
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            marginTop: "20px",
            color: "#6b7280",
          }}
        >
          Don’t have an account? Signup coming soon.
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  marginTop: "6px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  background: "#10b981",
  color: "#ffffff",
  fontSize: "16px",
  cursor: "pointer",
};

export default Login;
