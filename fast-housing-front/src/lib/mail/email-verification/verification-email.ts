"use server";
import { mailServiceConfig } from "@/config/mail/mail-service-config";

/**
 * This function sends a verification email to the user using the email service.
 * After a user registers, they will receive a verification email to verify their email.
 *
 * @param {string} email
 * @param {(string | null)} lastName
 * @param {string} token
 */

const sendVerificationEmail = async ({
  email,
  lastName,
  token,
}: {
  email: string;
  lastName: string | null;
  token: string;
}) => {
  const response = await fetch(
    `${mailServiceConfig.EMAIL_SERVICE_API}/send-verification-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        lastName,
        token,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Error sending verification email, check if email service is up"
    );
  }
};

export { sendVerificationEmail };
