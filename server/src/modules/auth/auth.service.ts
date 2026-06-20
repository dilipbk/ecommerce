import type { Database } from "better-sqlite3";
import { UnauthorizedError } from "../../lib/errors.js";
import { verifyPassword } from "../../lib/password.js";
import { signToken } from "../../lib/jwt.js";
import { usersRepository } from "../users/users.repository.js";
import type { PublicUser } from "../users/users.service.js";

export function authService(db: Database) {
  const users = usersRepository(db);
  return {
    async login(email: string, password: string): Promise<{ token: string; user: PublicUser }> {
      const row = users.findByEmail(email);
      if (!row || !verifyPassword(password, row.password_hash)) {
        throw new UnauthorizedError("Invalid email or password");
      }
      const token = await signToken({ sub: row.id, role: row.role });
      return { token, user: { id: row.id, email: row.email, name: row.name, role: row.role } };
    },
  };
}
