"use client";

import React from "react";
import LoginCredential from "@/components/ui/Form/AuthProviders/Credentials/Login";
import RegisterCredential from "@/components/ui/Form/AuthProviders/Credentials/Register";
import styles from "./index.module.css";
import OAuthButtons from "@/components/ui/Form/AuthProviders/OAuth";
import { AuthFormEnum } from "@/types/enums/auth-form/auth-form";
import { useSearchParams } from "next/navigation";
import ResetPassword from "../../Form/AuthProviders/Credentials/ResetPassword/ResetPasswordForm";
import ForgotPasswordForm from "../../Form/AuthProviders/Credentials/ForgotPassword/ForgotPasswordForm";
import { useRouter } from "next/navigation";

export default function AuthWrapper({ formType }: { formType: AuthFormEnum }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "This account is already linked to another user"
      : null;

  const handleArrowClick = () => {
    router.back();
  };

  return (
    <div className={styles.authWrapperContainer}>
      <div className={styles.authWrapperForms}>
        {urlError && (
          <div className={styles.authWrapperError}>
            <span>{urlError}</span>
          </div>
        )}

        {formType === AuthFormEnum.LOGIN ? (
          <div className={styles.authWrapperCredentialsForm}>
            <div className={styles.authFormTitleContainer}>
              <button
                type="button"
                onClick={handleArrowClick}
                className={styles.navigateBackward}
              >
                &#8592;
              </button>
              <h3 className={styles.authWrapperTitle}>Sign in</h3>
            </div>
            <LoginCredential />
          </div>
        ) : formType === AuthFormEnum.REGISTER ? (
          <div className={styles.authWrapperCredentialsForm}>
            <div className={styles.authFormTitleContainer}>
              <button
                type="button"
                onClick={handleArrowClick}
                className={styles.navigateBackward}
              >
                &#8592;
              </button>
              <h3 className={styles.authWrapperTitle}>Register</h3>
            </div>
            <RegisterCredential />
          </div>
        ) : formType === AuthFormEnum.RESET_PASSWORD ? (
          <div className={styles.authWrapperCredentialsForm}>
            <div className={styles.authFormTitleContainer}>
              <button
                type="button"
                onClick={handleArrowClick}
                className={styles.navigateBackward}
              >
                &#8592;
              </button>
              <h3 className={styles.authWrapperTitle}>Reset password</h3>
            </div>
            <ResetPassword />
          </div>
        ) : formType === AuthFormEnum.FORGOT_PASSWORD ? (
          <div className={styles.authWrapperCredentialsForm}>
            <div className={styles.authFormTitleContainer}>
              <button
                type="button"
                onClick={handleArrowClick}
                className={styles.navigateBackward}
              >
                &#8592;
              </button>
              <h3 className={styles.authWrapperTitle}>Forgot password </h3>
            </div>
            <ForgotPasswordForm />
          </div>
        ) : null}
        <div className={styles.authWrapperSeparatorContainer}>
          <hr className={styles.authWrapperSeparator} />
          <span className={styles.authWrapperSeparatorText}>or</span>
        </div>
        <OAuthButtons />
      </div>
    </div>
  );
}
