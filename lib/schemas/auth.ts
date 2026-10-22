import { email, z } from "zod";

export const authRegisterSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.string()
    .min(3, "password should be at least 3 characters")
    .max(20, "password should not be more than 20 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
});

export const authLoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
});

export type AuthRegisterSchema = z.infer<typeof authRegisterSchema>;
export type AuthLoginSchema = z.infer<typeof authLoginSchema>;