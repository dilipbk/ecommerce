import type { Database } from "better-sqlite3";
import { NotFoundError } from "../../lib/errors.js";
import { usersRepository } from "./users.repository.js";

export interface PublicUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export function usersService(db: Database) {
  const repo = usersRepository(db);
  return {
    getById(id: number): PublicUser {
      const u = repo.findById(id);
      if (!u) throw new NotFoundError("User");
      return { id: u.id, email: u.email, name: u.name, role: u.role };
    },
  };
}
