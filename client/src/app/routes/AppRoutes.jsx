import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProductsPage } from "../../features/products/components/ProductsPage";
import { ProductDetailPage } from "../../features/products/components/ProductDetailPage";
import { LoginPage } from "../../features/auth/components/LoginPage";
import { CartPage } from "../../features/cart/components/CartPage";
import { OrdersPage } from "../../features/orders/components/OrdersPage";

function NotFound() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">404</h1>
      <p className="mt-2 text-gray-500">This page does not exist.</p>
    </section>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <ProductsPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "login", element: <LoginPage /> },
      // Routes that require authentication.
      {
        element: <ProtectedRoute />,
        children: [
          { path: "cart", element: <CartPage /> },
          { path: "orders", element: <OrdersPage /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
