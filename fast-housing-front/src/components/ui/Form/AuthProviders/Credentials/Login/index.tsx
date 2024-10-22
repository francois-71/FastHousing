"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/schema/login";
import { logIn } from "@/actions/auth";
import { AuthMethodEnum } from "@/types/enums/AuthMethodEnum";
import Link from "next/link";
import styles from "../index.module.css";

export default function LoginCredential() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const response = await logIn(AuthMethodEnum.CREDENTIALS, formData);

      console.log(response);

      if (response?.message === "error" && response.error) {
        setError(response.error);
      } else if (!response || response.message === "credentials error") {
        setError("Invalid credentials");
      } else {
        console.log("Logging in");
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", e);
    }
  };

  return (
    <form className={styles.credentialForm} onSubmit={handleSubmit(onSubmit)}>
      {error && <p className={styles.credentialFormErrorBox}>{error}</p>}
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

      <div className={styles.credentialFormSubmitButton}>
        <button type="submit" disabled={isSubmitting}>
          Sign in
        </button>
      </div>
      <div className={styles.credentialFormForgotPassword}>
        <Link href="./forgot-password">Forgot your password?</Link>
      </div>
      <div className={styles.credentialFormRedirect}>
        <Link href="./register">Don't have an account?</Link>
      </div>

    </form>
  );
}
