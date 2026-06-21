import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProductsPage } from "../../features/products/components/ProductsPage";
import { LoginPage } from "../../features/auth/components/LoginPage";
import { CartPage } from "../../features/cart/components/CartPage";

/**
 * Temporary placeholder page. Real pages will come from the feature modules
 * under src/features/* (orders).
 */
function Placeholder({ title, subtitle }) {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-gray-500">{subtitle}</p>
    </section>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <ProductsPage /> },
      { path: "login", element: <LoginPage /> },
      // Routes that require authentication.
      {
        element: <ProtectedRoute />,
        children: [{ path: "cart", element: <CartPage /> }],
      },
      {
        path: "*",
        element: <Placeholder title="404" subtitle="This page does not exist." />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
