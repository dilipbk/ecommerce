import { sign, verify } from "hono/jwt";
import { env } from "../config/env.js";

export interface TokenPayload {
  sub: number;
  role: string;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  return sign({ ...payload, exp }, env.JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const decoded = (await verify(token, env.JWT_SECRET, "HS256")) as unknown as TokenPayload;
  return { sub: decoded.sub, role: decoded.role };
}
