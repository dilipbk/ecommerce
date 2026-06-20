import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

const schema = z.object({
  PORT: z.coerce.number().default(8000),
  JWT_SECRET: isProd
    ? z.string().min(32)
    : z.string().min(1).default("dev-secret-change-me"),
  DB_PATH: z.string().default("./ecommerce.db"),
});

export const env = schema.parse(process.env);
export type Env = z.infer<typeof schema>;
