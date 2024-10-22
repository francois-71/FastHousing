import { mailServiceConfig } from "@/config/mail/mail-service-config";

/**
 * This function calls the email service with the goal of sending an email
 * to the user so he can reset his passwords
 *
 * @param {string} email
 * @param {string} lastName
 * @param {string} token
 */
const sendResetPasswordEmail = async ({
  email,
  lastName,
  token,
}: {
  email: string;
  lastName: string | null;
  token: string;
}) => {
  console.log(
    "reset password email",
    `${mailServiceConfig.EMAIL_SERVICE_API}/send-password-reset-email`
  );

  console.log("email", email, "lastname", lastName, "token", token)

  const response = await fetch(
    `${mailServiceConfig.EMAIL_SERVICE_API}/send-password-reset-email`,
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
    console.log(response.body)
    throw new Error(
      "An error occured when tried to fetch the email service, check if email service is up"
    );
  }
};

export { sendResetPasswordEmail };
