"use client";
import { logOut } from "@/actions/auth";
import { CiLogout } from "react-icons/ci";

import React from "react";
import styles from "./index.module.css";

export default function LogOut() {
  return (
    <button className={styles.logoutButton} onClick={() => logOut()}>
      <CiLogout className={styles.signOutLogo}/> Sign out
    </button>
  );
}
