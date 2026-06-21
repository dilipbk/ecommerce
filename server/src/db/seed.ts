// Demo credentials (plaintext for learners):
//   admin@example.com    / admin123   (role: admin)
//   customer@example.com / customer123 (role: customer)
import { db, transaction } from "./connection.js";
import { runMigrations } from "./migrate.js";
import { hashPassword } from "../lib/password.js";

runMigrations(db);

transaction(db, () => {
  db.exec("DELETE FROM order_items; DELETE FROM orders; DELETE FROM cart_items; DELETE FROM products; DELETE FROM categories; DELETE FROM users;");

  const insertUser = db.prepare(
    "INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)",
  );
  insertUser.run("admin@example.com", hashPassword("admin123"), "Admin", "admin");
  insertUser.run("customer@example.com", hashPassword("customer123"), "Customer", "customer");

  const insertCategory = db.prepare("INSERT INTO categories (name, slug) VALUES (?, ?)");
  const electronicsId = Number(insertCategory.run("Electronics", "electronics").lastInsertRowid);
  const booksId = Number(insertCategory.run("Books", "books").lastInsertRowid);

  const insertProduct = db.prepare(
    "INSERT INTO products (name, description, price_cents, stock, category_id) VALUES (?, ?, ?, ?, ?)",
  );
  insertProduct.run("Wireless Mouse", "Ergonomic wireless mouse", 2599, 50, electronicsId);
  insertProduct.run("Mechanical Keyboard", "RGB mechanical keyboard", 7999, 30, electronicsId);
  insertProduct.run("Clean Code", "A Handbook of Agile Software Craftsmanship", 3499, 100, booksId);
  insertProduct.run("The Pragmatic Programmer", "Your journey to mastery", 3999, 80, booksId);
});

console.log("Seed complete. Login with customer@example.com / customer123");
