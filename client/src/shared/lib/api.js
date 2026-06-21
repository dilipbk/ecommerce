import { getToken } from "./authToken";

// Base URL of the Hono backend. Override with VITE_API_URL in a .env file.
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

/**
 * Thin fetch wrapper around the backend API.
 * - Sends/expects JSON
 * - Throws an Error with the backend's message on non-2xx responses
 *   (the Hono API returns `{ error: { message, code } }`)
 */
async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body?.error?.message ?? message;
    } catch {
      // response had no JSON body — keep the default message
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) =>
    request(path, { ...options, method: "POST", body: JSON.stringify(body) }),
  del: (path, options) => request(path, { ...options, method: "DELETE" }),
};
