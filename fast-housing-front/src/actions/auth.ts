"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { AuthMethodEnum } from "@/types/enums/AuthMethodEnum";
import { loginSchema } from "@/schema/login";
import { registerSchema } from "@/schema/register";
import { forgotPasswordSchema } from "@/schema/forgot-password";
import { resetPasswordSchema } from "@/schema/reset-password";
import { AuthError } from "next-auth";
import {
  createUser,
  getUserByEmail,
  getUserWithAccountDetails,
  updateUserPassword,
  verifyUserCredentials,
} from "./user";
import { DEFAULT_HOME_REDIRECT } from "../../routes";
import { generatePasswordToken, generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail/email-verification/verification-email";
import { sendResetPasswordEmail } from "@/lib/mail/reset-password/password-reset-email";
import { getVerificationTokenByToken } from "@/lib/mail/email-verification/verification-token";
import prisma from "@/lib/prisma";
import { getPasswordResetTokenByToken } from "@/lib/mail/reset-password/password-reset-token";

export const logIn = async (
  provider: AuthMethodEnum,
  formData?: FormData
): Promise<{ message: string; error?: string }> => {
  try {
    if (provider === AuthMethodEnum.CREDENTIALS && formData) {
      const validatedFields = loginSchema.safeParse({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (!validatedFields.success) {
        return {
          message: "validation error",
          error: "Invalid fields.",
        };
      }

      const { email, password } = validatedFields.data;

      // Check if user exists by checking the email
      const existingUser = await getUserByEmail(email);

      if (
        !existingUser ||
        !existingUser.hashedPassword ||
        !existingUser.email
      ) {
        return {
          message: "error",
          error: "Invalid credentials",
        };
      }

      // Check if user's email is verified
      if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
          existingUser.email
        );

        //TODO later: send locale so we can send the email in the correct language
        await sendVerificationEmail({
          email: existingUser.email,
          lastName: existingUser.lastName,
          token: verificationToken.token,
        });

        return {
          message: "error",
          error:
            "Email not verified, we have sent you a new verification email. Please verify your email to continue.",
        };
      }

      // Check if user credentials are valid
      const validUser = await verifyUserCredentials(email, password, provider);

      if (validUser.message === "error") {
        return {
          message: "error",
          error: validUser.error,
        };
      }

      await signIn(provider, {
        email,
        password,
        redirectTo: DEFAULT_HOME_REDIRECT,
      });

      return {
        message: "success",
        error: "",
      };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "credentials error",
            error: "invalid credentials.",
          };
        default:
          return {
            message: "error",
            error: "An error occurred while signing in, please try again.",
          };
      }
    }

    throw error;
  }

  await signIn(provider, { redirectTo: DEFAULT_HOME_REDIRECT });

  return {
    message: "success",
    error: "",
  };
};

export const registerCredentials = async (formData: FormData) => {
  try {
    const validateFields = registerSchema.safeParse({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    });

    if (!validateFields.success) {
      console.log("Validation error", validateFields.error);

      return {
        message: "validation error",
        error: "invalid fields",
      };
    }

    const { firstName, lastName, email, password } = validateFields.data;

    const createdUser = await createUser(firstName, lastName, email, password);

    if (createdUser.error) {
      return {
        message: "error",
        error: createdUser.error,
      };
    }

    console.log("User created successfully");

    return {
      message: createdUser.message,
      error: "",
    };
  } catch (error) {
    console.error("Unexpected error during registerCredentials:", error);

    return {
      message: "error",
      error: "unexpected error occurred",
    };
  }
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid token",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Email doesn't not exit",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });
  } catch (error) {
    console.error("Unexpected error during newVerification:", error);

    return {
      error: "unexpected error occurred",
    };
  }

  try {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  } catch (error) {
    console.error("Unexpected error during newVerification:", error);

    return {
      error: "unexpected error occurred",
    };
  }

  return {
    success: "Email verified",
  };
};

export const forgotPassword = async (
  formData: FormData
): Promise<{ message?: string; error?: string }> => {
  const validatedEmail = forgotPasswordSchema.safeParse({
    email: formData.get("email") as string,
  });

  if (!validatedEmail.success) {
    return {
      error: "An error occured, please try again later",
    };
  }

  const { email } = validatedEmail.data;

  const existingUser = await getUserWithAccountDetails(email);

  // if the user does not exist or the user has linked accounts, we don't send a reset password email because the user is not a credentials user
  if (!existingUser || existingUser.accounts.length > 0) {
    console.log("this user does not exist");

    return {
      message:
        "If your email address is registered with us, you will receive an email with a link to reset your password.",
    };
  }

  // if the user exists and if his email is no
  const resetPasswordToken = await generatePasswordToken(email);
  if (!resetPasswordToken) {
    return {
      error: "An error occured, please try again later",
    };
  }

  await sendResetPasswordEmail({
    email: resetPasswordToken.email,
    token: resetPasswordToken.token,
    lastName: existingUser.lastName,
  });

  return {
    message:
      "If your email address is registered with us, you will receive an email with a link to reset your password.",
  };
};

export const resetPasswordWithToken = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}): Promise<{ success?: string; error?: string }> => {
  if (!token || !newPassword) {
    return {
      error: "Token and password are required.",
    };
  }

  try {
    // we fake the second password field to match the schema as it was mainly for user experience and we don't need it here
    const validatedPassword = resetPasswordSchema.safeParse({
      password: newPassword,
      confirmPassword: newPassword,
    });

    if (!validatedPassword.success) {
      return {
        error: "An error occured, please try again later",
      };
    }

    const { password } = validatedPassword.data;

    // Find the associated token generated when the user asked to reset his email
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return {
        error: "Invalid or expired token.",
      };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return {
        error: "Token has expired.",
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return {
        error: "User not found.",
      };
    }

    // Update the user's password
    await updateUserPassword({
      userId: existingUser.id,
      password,
      tokenId: existingToken.id,
    });

    return {
      success: "Your password has been successfully modified.",
    };
  } catch (error) {
    return {
      error: "An error occured",
    };
  }
};
