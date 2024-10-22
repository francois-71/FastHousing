import React from "react";
import styles from "./user-details.module.css";
import { RoleEnum } from "@prisma/client";
import ProfileSquare from "../ProfileSquare";

type UserDetails = {
  firstName: string;
  lastName: string;
  role: RoleEnum;
  email: string;
};

export default function UserDetails(userDetails: UserDetails) {
  return (
    <ProfileSquare>
      <ul className={styles.userDetails}>
        <li>
          <p>First name:</p> <p className={styles.details}> {userDetails.firstName} </p>
        </li>
        <li>
          <p>Last name:</p> <p className={styles.details}>{userDetails.lastName}</p>
        </li>
        <li>
          <p>Email:</p> <p className={styles.details}>{userDetails.email}</p>
        </li>
        <li>
          <p>Role:</p> <p className={styles.details}>{userDetails.role}</p>
        </li>
      </ul> 
      </ProfileSquare >
  );
}
