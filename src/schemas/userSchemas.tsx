import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  phone: z.string().min(10, "Phone must be at least 10 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  gender: z.enum(["male", "female", "other"] as const, {
    errorMap: () => ({
      message: "Please select a gender",
    }),
  }),
  receiveNews: z.boolean().optional(),
});

export const requestPasswordResetSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const changePasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type RegisterSchema = z.infer<typeof registerSchema>;

export type RequestPasswordResetSchema = z.infer<
  typeof requestPasswordResetSchema
>;

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
