import type { Db } from "../../db/connection.js";

export interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  created_at: string;
}

export function usersRepository(db: Db) {
  return {
    findByEmail(email: string): UserRow | undefined {
      return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as UserRow | undefined;
    },
    findById(id: number): UserRow | undefined {
      return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRow | undefined;
    },
    insert(u: { email: string; password_hash: string; name: string; role: string }): number {
      const info = db
        .prepare("INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)")
        .run(u.email, u.password_hash, u.name, u.role);
      return Number(info.lastInsertRowid);
    },
  };
}
