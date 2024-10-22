"use client";

import React from "react";
import styles from "./delete-property.module.css";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  propertyId: string;
  text: string;
}

async function handleDeleteProperty(
  propertyId: string
): Promise<{ success: boolean }> {
  const response = await fetch(
    `http://localhost:3000/api/host/property/delete?id=${propertyId}`,
    { method: "delete" }
  );

  if (!response.ok) {
    console.log(
      "an error occured while trying to delete the property, try again later"
    );
  }

  const data = await response.json();

  if (data.success) {
    return { success: true };
  }

  return { success: false };
}
export default function DeletePropertyButton({
  text,
  propertyId,
}: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async (propertyId: string) => {
    const { success } = await handleDeleteProperty(propertyId);

    if (success) {
      console.log("successfully deleted your property");
      router.replace("/properties");
    } else {
      console.log(
        `an error occured while trying to delete your property ${propertyId}`
      );
    }
  };

  return (
    <button
      onClick={() => handleDelete(propertyId)}
      className={styles.deletePropertyButton}
    >
      {text}
    </button>
  );
}
