"use server";

import { sendVerificationEmail } from "@/lib/mail/email-verification/verification-email";
import prisma from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { AuthMethodEnum } from "@/types/enums/AuthMethodEnum";
import { User, UserWithAccountDetails } from "@/types/model/user-type";
import bcrypt from "bcryptjs";

export const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) return undefined;

    return user;
  } catch (error) {
    return undefined;
  }
};

// check if the user exist with his email
const doesUserExists = async (email: string): Promise<boolean> => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return false;
  }

  return !!existingUser;
};

/*
const doesUserOwnPropertyById = async (propertyId: string, userId: string): Promise<boolean> => {
  try {
    const property 
  }
}
  */

export const getUserWithAccountDetails = async (
  email: string
): Promise<UserWithAccountDetails | undefined> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) return undefined;

    return user;
  } catch (error) {
    return undefined;
  }
};

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return undefined;
    }

    return user;
  } catch (error) {
    throw new Error("An error occured");
  }
};

// This function is triggered when signing in with the credentials
export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<{ message: string; error?: string }> => {
  // hash the password before saving it to the database
  const hashedPassword = await hashPassword(password);

  // check that the user does not exist by checking the provided email
  const existingUser = await doesUserExists(email);

  if (existingUser) {
    return {
      message: "user already exist",
      error: "user already exist",
    };
  }

  console.log("Creating user");
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword,
      },
    });

    // check if the user was created successfully
    if (!user) {
      return {
        message: "error",
        error: "error creating user",
      };
    }

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail({
      email: verificationToken.email,
      lastName,
      token: verificationToken.token,
    });

    return {
      message:
        "User registered successfully, an email has been sent to you to verify your account",
    };
  } catch (error) {
    console.log(error);

    return {
      message: "error",
      error: "error creating user",
    };
  }
};

// define a function to check user credentials (email and password)
export const verifyUserCredentials = async (
  email: string,
  password: string,
  provider: AuthMethodEnum
): Promise<{ message: string; error?: string }> => {
  if (provider !== AuthMethodEnum.CREDENTIALS) {
    return {
      message: "error",
      error: "user does not exist",
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.hashedPassword) {
      return {
        message: "error",
        error: "user does not exist",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return {
        message: "error",
        error: "Your credentials are incorrect",
      };
    }
  } catch (error) {
    return {
      message: "error",
      error: "An error occured, try again later",
    };
  }

  return {
    message: "success",
  };
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * function that takes an email and a password and updates the user's password
 *
 * @param {string} email
 * @param {string} hashedPassword
 * @return {*}  {Promise<void>}
 */

export const updateUserPassword = async ({
  userId,
  password,
  tokenId,
}: {
  userId: string;
  password: string;
  tokenId: string;
}): Promise<void> => {
  if (!password || password.length === 0) {
    throw new Error(
      "The hashed password should not be undefined or have a length of 0."
    );
  }

  // hash the password before saving it to the database

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword,
      },
    });

    await prisma.passwordResetToken.deleteMany({
      where: {
        id: tokenId,
      },
    });
  } catch (error) {
    throw new Error(
      "An error occurred while trying to update the user's password"
    );
  }
};
