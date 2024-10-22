"use client";
import React, {useState} from "react";
import { registerSchema } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../index.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { registerCredentials } from "@/actions/auth";
import Link from "next/link";

export default function RegisterCredential() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema, {}, { raw: true }),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // keep it for later use

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (
    data
  ) => {
    setError("");
    setSuccess("");

    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    const response = await registerCredentials(formData);

    if (response === undefined) {
      setError("An error occurred. Please try again later.");
    }

    if (response?.message === "error" && response.error) {
      setError(response.error);
    }

    if (!response.error) {
      setSuccess(response.message);
    }
  };

  return (
    <form className={styles.credentialForm} onSubmit={handleSubmit(onSubmit)}>
      {error && <p className={styles.credentialFormErrorBox}>{error}</p>}
      {success && <p className={styles.credentialFormSuccessBox}>{success}</p>}
      <div className={styles.credentialFormInput}>
        <label htmlFor="First name"> First name </label>
        <input
          type="text"
          id="first_name"
          {...register("firstName")}
          placeholder="John"
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div className={styles.credentialFormInput}>
        <label htmlFor="Last name"> Last name </label>
        <input
          type="text"
          id="last_name"
          {...register("lastName")}
          placeholder="Doe"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <div className={styles.credentialFormInput}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="john.doe@example.com"
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
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <div className={styles.credentialFormSubmitButton}>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </div>
      <div className={styles.credentialFormRedirect}>
        <span>You already have an account ? </span>
        <Link href="./sign-in">Sign in here</Link>
      </div>
    </form>
  );
}
