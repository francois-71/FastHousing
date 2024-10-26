import React from "react";
import ProfileSquare from "../ProfileSquare";
import styles from "./user-picture-details.module.css";

interface UserPictureDetailsProps {
  image?: string | undefined;
}

export default function UserPictureDetails({ image }: UserPictureDetailsProps) {
  return (
    <ProfileSquare>
      <div className={styles.profilePictureWrapper}>
        <img
          src={image ? image : "/DFRenting-logo.png"}
          className={styles.profilePicture}
          width={500}
          height={300}
          sizes="100vw"
          alt="profile picture"
        />
      </div>
    </ProfileSquare>
  );
}
