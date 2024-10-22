"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./edit-property.module.css";

interface EditButtonProps {
  text: string;
  propertyId: string;
}

export default function EditPropertyButton({ text, propertyId }: EditButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      onClick={() => router.push(`property/edit/${propertyId}`)}
      className={styles.editPropertyButton}
    >
      {text}
    </button>
  );
}
