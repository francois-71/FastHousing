import React from "react";
import styles from "./user-details.module.css";
import ProfileSquare from "../ProfileSquare";
import { RoleEnum } from "@prisma/client";

interface UserDetailsProps {
  firstName: string;
  lastName: string;
  email?: string;
  role: RoleEnum;
}

export default function UserDetails({
  firstName,
  lastName,
  email,
  role,
}: UserDetailsProps) {
  return (
    <ProfileSquare>
      <ul className={styles.userDetails}>
        <li>
          <p>First name:</p> <p className={styles.details}> {firstName} </p>
        </li>
        <li>
          <p>Last name:</p> <p className={styles.details}>{lastName}</p>
        </li>
        {email && (
          <li>
            <p>Email:</p> <p className={styles.details}>{email}</p>
          </li>
        )}
        <li>
          <p>Role:</p> <p className={styles.details}>{role}</p>
        </li>
      </ul>
    </ProfileSquare>
  );
}
