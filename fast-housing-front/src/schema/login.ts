import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }).min(5, {
    message: "Please enter a valid email"}
  ),
  password: z.string().min(8, {
    message: "Password should contain at least 8 characters",
  }).max(300, {
    message: "Password should not exceed 300 characters",
  }),
});