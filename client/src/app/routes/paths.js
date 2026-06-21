// Central route path constants — avoids hardcoding strings across the app.
export const PATHS = {
  products: "/",
  productDetail: (id) => `/products/${id}`,
  login: "/login",
  cart: "/cart",
  orders: "/orders",
  orderDetail: (id) => `/orders/${id}`,
};
