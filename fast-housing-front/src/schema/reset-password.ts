import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password should contain at least 8 characters" })
      .max(300, { message: "Password should not exceed 300 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This specifies that the error should be attached to the confirmPassword field
  });
