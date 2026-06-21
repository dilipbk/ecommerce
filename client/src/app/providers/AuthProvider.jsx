import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  // Called with the backend's login response: { token, user }.
  const login = useCallback(
    ({ token, user }) => {
      setToken(token);
      setStoredUser(user);
      setUser(user);
      // Drop any data cached for a previous session before loading this user's.
      queryClient.clear();
    },
    [queryClient],
  );

  const logout = useCallback(() => {
    clearToken();
    clearStoredUser();
    setUser(null);
    // Wipe cached per-user data so the next user can't see it.
    queryClient.clear();
  }, [queryClient]);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
