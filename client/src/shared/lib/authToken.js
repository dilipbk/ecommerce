// Persistent storage for the JWT and current user, kept in localStorage so the
// session survives page reloads. Centralized here so api.js and AuthProvider
// share one source of truth (and one place to change the storage keys).
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const setStoredUser = (user) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));
export const clearStoredUser = () => localStorage.removeItem(USER_KEY);
