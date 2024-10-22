"use client";
import styles from "../index.module.css";
import { FaGithub } from "react-icons/fa";
import { logIn } from "@/actions/auth";
import { AuthMethodEnum } from "@/types/enums/AuthMethodEnum";

import React from "react";

export default function LoginGithub() {
  return (
    <div className={styles.oAuthButtonWrapper}>
      <button
        className={styles.oAuthButton}
        onClick={() => logIn(AuthMethodEnum.GITHUB)}
      >
        <FaGithub />
      </button>
    </div>
  );
}
