import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth-context";
import { PATHS } from "../routes/paths";

const navItems = [
  { to: PATHS.products, label: "Products", end: true },
  { to: PATHS.cart, label: "Cart" },
];

const linkClass = ({ isActive }) =>
  isActive
    ? "font-medium text-gray-900"
    : "text-gray-500 transition-colors hover:text-gray-900";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate(PATHS.products);
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to={PATHS.products} className="text-xl font-semibold tracking-tight text-gray-900">
          Ecommerce
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-500">Hi, {user.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-gray-500 transition-colors hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to={PATHS.login} className={linkClass}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
