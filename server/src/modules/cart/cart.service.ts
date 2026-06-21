import type { Database } from "better-sqlite3";
import { BadRequestError } from "../../lib/errors.js";
import { cartRepository, type CartItemRow } from "./cart.repository.js";
import { productsService } from "../products/products.service.js";

export interface CartView {
  items: CartItemRow[];
  totalCents: number;
}

export function cartService(db: Database) {
  const repo = cartRepository(db);
  const products = productsService(db);

  function view(userId: number): CartView {
    const items = repo.itemsForUser(userId);
    const totalCents = items.reduce((sum, i) => sum + i.price_cents * i.quantity, 0);
    return { items, totalCents };
  }

  return {
    get(userId: number): CartView {
      return view(userId);
    },
    addItem(userId: number, productId: number, quantity: number): CartView {
      const product = products.getById(productId); // throws NotFoundError if missing
      if (quantity > product.stock) throw new BadRequestError("Quantity exceeds available stock");
      repo.upsert(userId, productId, quantity);
      return view(userId);
    },
    removeItem(userId: number, productId: number): CartView {
      repo.remove(userId, productId);
      return view(userId);
    },
  };
}
