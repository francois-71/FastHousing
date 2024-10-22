"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { forgotPasswordSchema } from "@/schema/forgot-password";
import styles from "../index.module.css";
import { forgotPassword } from "@/actions/auth";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();

  const onSubmit: SubmitHandler<z.infer<typeof forgotPasswordSchema>> = async (
    data
  ) => {
    setError("");
    setMessage("");

    console.log("data", data.email);
    const formData = new FormData();
    formData.append("email", data.email);

    const response = await forgotPassword(formData);

    if (response.error) {
      setError(response.error);
    } else {
      setMessage(response.message);
    }
  };

  return (
    <form className={styles.credentialForm} onSubmit={handleSubmit(onSubmit)}>
      {error && <p className={styles.credentialFormErrorBox}>{error}</p>}
      {message && <p className={styles.credentialFormSuccessBox}>{message}</p>}
      <div className={styles.credentialFormInput}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="john.doe@example.com"
          autoComplete="email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className={styles.credentialFormSubmitButton}>
        <button type="submit" disabled={isSubmitting}>
          Send reset email
        </button>
      </div>
    </form>
  );
}
