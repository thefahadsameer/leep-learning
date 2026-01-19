import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/employeeDashboard.css";

const STAGES = [
  "Interested",
  "Contacted",
  "Application Submitted",
  "Offer Issued",
  "Fee Paid (Partial)",
  "Fee Paid (Full)"
];

/* ✅ UPDATED PAYMENT METHODS */
const PAYMENT_MODES = [
  "Bank Transfer",
  "Bank Scanner",
  "Payment Gateway"
];

function EmployeeDashboard() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem("employeeSession"));

  const [candidates, setCandidates] = useState([]);
  const [activePaymentRow, setActivePaymentRow] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    date: "",
    mode: "Bank Transfer"
  });

  /* ---------- AUTH GUARD ---------- */
  useEffect(() => {
    if (!session) navigate("/employee/login");
  }, [navigate, session]);

  /* ---------- LOAD CANDIDATES ---------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("candidates"));
    if (stored) {
      setCandidates(stored);
    } else {
      const demo = [
        {
          id: 1,
          name: "Rahul Verma",
          city: "Delhi",
          stage: "Interested",
          totalFee: 300000,
          payments: [
            { amount: 100000, date: "2026-01-12", mode: "Bank Transfer" }
          ]
        },
        {
          id: 2,
          name: "Anjali Singh",
          city: "Patna",
          stage: "Application Submitted",
          totalFee: 250000,
          payments: []
        }
      ];
      setCandidates(demo);
      localStorage.setItem("candidates", JSON.stringify(demo));
    }
  }, []);

  /* ---------- PERSIST ---------- */
  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  /* ---------- ADMIN NOTIFY ---------- */
  const notifyAdmin = (message, type = "INFO") => {
    const logs = JSON.parse(localStorage.getItem("adminNotifications")) || [];
    logs.unshift({
      id: crypto.randomUUID(),
      type,
      message,
      employee: session.name,
      time: new Date().toISOString()
    });
    localStorage.setItem("adminNotifications", JSON.stringify(logs));
  };

  /* ---------- HELPERS ---------- */
  const totalPaid = (payments) =>
    payments.reduce((s, p) => s + Number(p.amount), 0);

  /* ---------- UPDATE CANDIDATE ---------- */
  const updateCandidate = (id, updates, logMessage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    if (logMessage) notifyAdmin(logMessage);
  };

  /* ---------- PAYMENTS ---------- */
  const addPayment = (id, candidateName) => {
    if (!paymentForm.amount || !paymentForm.date) return;

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, payments: [...c.payments, paymentForm] }
          : c
      )
    );

    notifyAdmin(
      `${session.name} added ₹${paymentForm.amount} payment via ${paymentForm.mode} for ${candidateName}`,
      "PAYMENT_ADDED"
    );

    setPaymentForm({ amount: "", date: "", mode: "Bank Transfer" });
    setActivePaymentRow(null);
  };

  const deletePayment = (cid, index, amount, name) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === cid
          ? { ...c, payments: c.payments.filter((_, i) => i !== index) }
          : c
      )
    );

    notifyAdmin(
      `${session.name} deleted ₹${amount} payment for ${name}`,
      "PAYMENT_REMOVED"
    );
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    const logs = JSON.parse(localStorage.getItem("employeeActivityLog")) || [];
    logs.push({
      employeeId: session.id,
      name: session.name,
      email: session.email,
      action: "LOGOUT",
      time: new Date().toISOString()
    });
    localStorage.setItem("employeeActivityLog", JSON.stringify(logs));
    localStorage.removeItem("employeeSession");
    navigate("/employee/login");
  };

  return (
    <div className="employee-dashboard">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>Employee Dashboard</h1>
          <p className="employee-sub">
            Welcome, <b>{session?.name}</b> | {session?.email}
          </p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="leads-card">
        <h2>Candidates</h2>

        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Stage</th>
              <th>Total Fee</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Payments</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c) => {
              const paid = totalPaid(c.payments);
              const pending = c.totalFee - paid;

              return (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.city}</td>

                  <td>
                    <select
                      className="stage-select"
                      value={c.stage}
                      onChange={(e) =>
                        updateCandidate(
                          c.id,
                          { stage: e.target.value },
                          `${session.name} changed stage of ${c.name} to ${e.target.value}`
                        )
                      }
                    >
                      {STAGES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      className="fee-input"
                      type="number"
                      value={c.totalFee}
                      onChange={(e) =>
                        updateCandidate(
                          c.id,
                          { totalFee: Number(e.target.value) },
                          `${session.name} updated fee for ${c.name}`
                        )
                      }
                    />
                  </td>

                  <td className="paid-amount">INR {paid}</td>
                  <td className="pending-amount">INR {pending}</td>

                  <td>
                    {c.payments.map((p, i) => (
                      <div className="payment-item" key={i}>
                        {p.amount} ({p.mode}) – {p.date}
                        <span
                          className="payment-delete"
                          onClick={() =>
                            deletePayment(c.id, i, p.amount, c.name)
                          }
                        >
                          ×
                        </span>
                      </div>
                    ))}

                    {activePaymentRow === c.id ? (
                      <div className="inline-payment">
                        <input
                          placeholder="Amount"
                          type="number"
                          value={paymentForm.amount}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              amount: e.target.value
                            })
                          }
                        />
                        <input
                          type="date"
                          value={paymentForm.date}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              date: e.target.value
                            })
                          }
                        />
                        <select
                          value={paymentForm.mode}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              mode: e.target.value
                            })
                          }
                        >
                          {PAYMENT_MODES.map((m) => (
                            <option key={m}>{m}</option>
                          ))}
                        </select>
                        <button onClick={() => addPayment(c.id, c.name)}>
                          Enter
                        </button>
                      </div>
                    ) : (
                      <div
                        className="add-payment-btn"
                        onClick={() => setActivePaymentRow(c.id)}
                      >
                        + Add Payment
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
