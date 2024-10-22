import React from "react";
import styles from "./profile-square.module.css";

export default function ProfileSquare({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.card}>{children}</div>;
}
