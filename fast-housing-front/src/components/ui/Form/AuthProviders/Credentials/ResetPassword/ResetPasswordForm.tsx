"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { resetPasswordSchema } from "@/schema/reset-password";
import { resetPasswordWithToken } from "@/actions/auth";
import styles from "../index.module.css";
import { redirect, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit: SubmitHandler<z.infer<typeof resetPasswordSchema>> = async (
    data
  ) => {
    setError("");
    setSuccess("");

    if (!token) {
      redirect("/");
    }

    const response = await resetPasswordWithToken({
      token,
      newPassword: data.password,
    });

    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      setSuccess(response.success);
    }
  };

  return (
    <form className={styles.credentialForm} onSubmit={handleSubmit(onSubmit)}>
      {error && <p className={styles.credentialFormErrorBox}>{error}</p>}
      {success && <p className={styles.credentialFormSuccessBox}>{success}</p>}
      <div className={styles.credentialFormInput}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="********"
          autoComplete="current-password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className={styles.credentialFormInput}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          placeholder="********"
          autoComplete="current-password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <div className={styles.credentialFormSubmitButton}>
        <button type="submit" disabled={isSubmitting}>
          Reset password
        </button>
      </div>
    </form>
  );
}
