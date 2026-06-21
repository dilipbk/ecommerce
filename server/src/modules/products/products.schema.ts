import { z } from "zod";

export const listQuerySchema = z.object({
  categoryId: z.coerce.number().int().positive().optional(),
});
