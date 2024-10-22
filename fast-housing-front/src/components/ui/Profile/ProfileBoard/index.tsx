"use client";
import React from "react";
import styles from "./profile-board.module.css";
import { Session } from "next-auth";
import UserDetails from "../UserDetails";

export type UserProps = {
  sessionUser: NonNullable<Session["user"]>;
};

export default function Profile({ session }: { session: any }) {
  console.log(session);

  console.log("session user", session.user);

  return (
    <div className={styles.profileBoxes}>
      <UserDetails
        firstName={session.user.firstName}
        lastName={session.user.lastName}
        email={session.user.email}
        role={session.user.role}
      />
    </div>
  );
}
