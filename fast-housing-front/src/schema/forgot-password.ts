import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email",
    })
    .min(5, {
      message: "Please enter a valid email",
    }),
});
