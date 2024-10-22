import * as z from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name should contain at least 2 characters",
    })
    .max(100, {
      message: "First name should not exceed 100 characters",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name should contain at least 2 characters",
    })
    .max(100, {
      message: "Last name should not exceed 100 characters",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email",
    })
    .min(5, {
      message: "Please enter a valid email",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password should contain at least 8 characters",
    })
    .max(300, {
      message: "Password should not exceed 300 characters",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password should contain at least 8 characters",
    })
    .max(300, {
      message: "Password should not exceed 300 characters",
    }),
});
