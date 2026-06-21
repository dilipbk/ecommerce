import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../../../app/providers/auth-context";
import { PATHS } from "../../../app/routes/paths";

export function LoginForm() {
  // Prefilled with the seeded demo customer for convenience.
  const [email, setEmail] = useState("customer@example.com");
  const [password, setPassword] = useState("customer123");

  const { mutate, isPending, isError, error } = useLogin();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          auth.login(data);
          const redirectTo = location.state?.from?.pathname ?? PATHS.products;
          navigate(redirectTo, { replace: true });
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
        />
      </div>

      {isError && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
