"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

export default function RedirectButton({
  path,
  text,
}: {
  path: string;
  text: string;
}) {
  const router = useRouter();

  // Ensure the path is absolute

  return (
    <span className={styles.redirectButtonWrapper}>
      <button
        className={styles.redirectButton}
        onClick={() => router.push(path)}
      >
        {text}
      </button>
    </span>
  );
}
