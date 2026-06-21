import { LoginForm } from "./LoginForm";

export function LoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Log in</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <LoginForm />
      </div>
      <p className="mt-4 text-center text-xs text-gray-400">
        Demo: customer@example.com / customer123
      </p>
    </div>
  );
}
