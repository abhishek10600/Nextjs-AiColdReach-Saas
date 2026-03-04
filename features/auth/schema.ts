import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("Invalid email").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .strict();

export const loginSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(1, "Password cannot be empty"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
