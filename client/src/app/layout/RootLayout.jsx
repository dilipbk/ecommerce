import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * App shell: header + footer wrap the routed page content rendered in <Outlet />.
 */
export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
