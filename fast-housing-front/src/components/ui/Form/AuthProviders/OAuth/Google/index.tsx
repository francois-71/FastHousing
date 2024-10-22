"use client";
import React from "react";

import styles from "../index.module.css";
import { FaGoogle } from "react-icons/fa";
import { logIn } from "@/actions/auth";
import { AuthMethodEnum } from "@/types/enums/AuthMethodEnum";

export default function LoginGoogle() {
  return (
    <div className={styles.oAuthButtonWrapper}>
      <button
        className={styles.oAuthButton}
        onClick={() => logIn(AuthMethodEnum.GOOGLE)}
      >
        <FaGoogle />
      </button>
    </div>
  );
}
