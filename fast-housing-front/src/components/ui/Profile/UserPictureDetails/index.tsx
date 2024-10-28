import React from "react";
import ProfileSquare from "../ProfileSquare";
import styles from "./user-picture-details.module.css";
import Link from "next/link";

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
      <div>
        <form className={styles.formEditProfilePicture} action="">
          <Link className={styles.editProfilePicture} href=""> Edit my profile picture</Link>
        </form>
      </div>
    </ProfileSquare>
  );
}
