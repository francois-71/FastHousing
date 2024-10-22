import prisma from "@/lib/prisma";

/**
 * This function gets the verification token by the email.
 *
 * @param {string} email
 * @return {*}
 */

const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

/**
 * This function gets the verification token by the token.
 *
 * @param {string} token
 * @return {*}
 */

const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export { getVerificationTokenByEmail, getVerificationTokenByToken };
