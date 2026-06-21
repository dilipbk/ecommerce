import { useCallback, useState } from "react";
import { AuthContext } from "./auth-context";
import {
  clearStoredUser,
  clearToken,
  getStoredUser,
  setStoredUser,
  setToken,
} from "../../shared/lib/authToken";

export function AuthProvider({ children }) {
  // Rehydrate the user from storage so a reload keeps the session.
  const [user, setUser] = useState(() => getStoredUser());

  // Called with the backend's login response: { token, user }.
  const login = useCallback(({ token, user }) => {
    setToken(token);
    setStoredUser(user);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    clearStoredUser();
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
