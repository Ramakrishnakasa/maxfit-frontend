export function getToken() {
  return localStorage.getItem("token");
}
export function decodeToken(token) {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
export function getUserRole() {
  const token = getToken();
  const decoded = decodeToken(token);
  return decoded?.role || null;
}
export function isLoggedIn() {
  return !!getToken();
}
