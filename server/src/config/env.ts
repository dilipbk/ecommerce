import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(8000),
  JWT_SECRET: z.string().default("dev-secret-change-me"),
  DB_PATH: z.string().default("./ecommerce.db"),
});

export const env = schema.parse(process.env);
export type Env = z.infer<typeof schema>;
