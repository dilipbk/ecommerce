import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth-context";
import { PATHS } from "./paths";

/**
 * Guards nested routes: unauthenticated users are redirected to /login,
 * remembering where they were headed so login can send them back.
 */
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
