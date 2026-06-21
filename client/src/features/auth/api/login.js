import { api } from "../../../shared/lib/api";

/** POST /api/auth/login -> { token, user }. */
export function login(credentials) {
  return api.post("/api/auth/login", credentials);
}
