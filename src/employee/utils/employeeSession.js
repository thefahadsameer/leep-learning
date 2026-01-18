const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const SESSION_MAX_LIFE = 8 * 60 * 60 * 1000; // 8 hours

export function createEmployeeSession(employee) {
  const now = Date.now();

  return {
    id: employee.id,
    name: employee.name,
    email: employee.email,
    loginAt: now,
    lastActiveAt: now,
    expiresAt: now + SESSION_MAX_LIFE
  };
}

export function isSessionValid(session) {
  if (!session) return false;

  const now = Date.now();

  if (
    !session.id ||
    !session.email ||
    !session.loginAt ||
    !session.lastActiveAt ||
    !session.expiresAt
  ) {
    return false;
  }

  if (now > session.expiresAt) return false;
  if (now - session.lastActiveAt > INACTIVITY_TIMEOUT) return false;

  return true;
}

export function updateLastActive() {
  const session = JSON.parse(localStorage.getItem("employeeSession"));
  if (!session) return;

  session.lastActiveAt = Date.now();
  localStorage.setItem("employeeSession", JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem("employeeSession");
}
