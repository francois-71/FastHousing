import React from "react";
import styles from "./profile-board.module.css";
import UserDetails from "../UserDetails";
import { auth } from "@/auth";
import UserPictureDetails from "../UserPictureDetails";

export default async function Profile() {
  const session = await auth();

  if (!session) return null;

  return (
    <div className={styles.profileBoxes}>
      <UserPictureDetails image={session.user.image ? session.user.image : undefined} />
      <UserDetails
        firstName={session.user.firstName}
        lastName={session.user.lastName}
        email={session.user.email ? session.user.email : undefined}
        role={session.user.role}
      />
    </div>
  );
}
