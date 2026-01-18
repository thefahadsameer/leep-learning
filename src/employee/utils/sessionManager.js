// src/employee/utils/sessionManager.js

const IDLE_LIMIT = 5 * 60 * 1000; // 5 minutes
const WARNING_TIME = 4 * 60 * 1000; // show warning at 4 min

let idleTimer = null;
let warningTimer = null;

export function startSessionMonitoring(onIdleWarning, onLogout) {
  const resetTimers = () => {
    clearTimeout(idleTimer);
    clearTimeout(warningTimer);

    updateLastActivity();

    warningTimer = setTimeout(() => {
      onIdleWarning();
    }, WARNING_TIME);

    idleTimer = setTimeout(() => {
      onLogout("AUTO_LOGOUT");
    }, IDLE_LIMIT);
  };

  const events = ["mousemove", "keydown", "click", "scroll"];
  events.forEach((e) => window.addEventListener(e, resetTimers));

  resetTimers();

  return () => {
    events.forEach((e) => window.removeEventListener(e, resetTimers));
    clearTimeout(idleTimer);
    clearTimeout(warningTimer);
  };
}

export function updateLastActivity() {
  const session = JSON.parse(localStorage.getItem("employeeSession"));
  if (!session) return;

  session.lastActiveAt = new Date().toISOString();
  localStorage.setItem("employeeSession", JSON.stringify(session));
}

export function logEmployeeActivity(type) {
  const logs = JSON.parse(localStorage.getItem("employeeActivityLog")) || [];
  logs.push({
    type,
    time: new Date().toISOString()
  });
  localStorage.setItem("employeeActivityLog", JSON.stringify(logs));
}

export function logoutEmployee(reason = "MANUAL_LOGOUT") {
  logEmployeeActivity(reason);

  const session = JSON.parse(localStorage.getItem("employeeSession"));
  if (session) {
    session.logoutAt = new Date().toISOString();
    localStorage.setItem("employeeSession", JSON.stringify(session));
  }

  localStorage.removeItem("employeeSession");
}
