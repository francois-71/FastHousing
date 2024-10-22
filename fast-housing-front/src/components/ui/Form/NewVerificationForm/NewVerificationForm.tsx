"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./new-verification-form.module.css";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/auth";

// define the props type

type NewVerificationFormProps = {
  status: string;
  children?: React.JSX.Element | React.JSX.Element[];
};

export default function NewVerificationForm({
  status,
  children,
}: NewVerificationFormProps) {
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");

      return;
    }

    newVerification(token)
      .then((data) => {
        console.log("im here", data.success, "data.error", data.error);
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("An error occurred");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className={styles.newVerificationContainer}>
      <div className={styles.newVerificationWrapper}>
        <div className={styles.newVerificationInformation}>
          <h1> DFHousing </h1>
          <div className={styles.newVerificationTitle}>{status}</div>
          {error && (
            <div className={styles.newVerificationError}>{error}</div>
          )}
          {success && (
            <div className={styles.newVerificationSuccess}>{success}</div>
          )}
          <div className={styles.newVerificationLoader}>
            {!success && !error && <BeatLoader />}
          </div>
          {children && (
            <div className={styles.newVerificationButtons}>{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
