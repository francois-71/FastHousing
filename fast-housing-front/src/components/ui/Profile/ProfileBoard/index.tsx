import React from "react";
import styles from "./profile-board.module.css";
import UserDetails from "../UserDetails";
import { auth } from "@/auth";
import UserPictureDetails from "../UserPictureDetails";
import PropertyDetails from "../PropertyDetails";

async function getPropertiesImages() {
  try {
    const response = await fetch("http://localhost:3000/api/host/properties/get-images");

    if (!response.ok) {
      throw new Error("An error occured while trying to get images data");
    }

    const data = await response.json();
    console.log("data", data)

    return data.propertiesImagesFiltered;
  } catch (error) {
    throw new Error("An unexpected error occured, please try again later");
  }
}

export default async function Profile() {
  const session = await auth();

  if (!session) return null;

  const images = await getPropertiesImages();

  return (
    <div className={styles.profileBoxes}>
      <div className={styles.userPictureDetailsComponent}>
        <UserPictureDetails
          image={session.user.image ? session.user.image : undefined}
        />
      </div>
      <div className={styles.userDetailsComponent}>
        <UserDetails
          firstName={session.user.firstName}
          lastName={session.user.lastName}
          email={session.user.email ? session.user.email : undefined}
          role={session.user.role}
        />
      </div>
      <div className={styles.propertyDetailsComponent}>
        <PropertyDetails images={images} />
      </div>
    </div>
  );
}
