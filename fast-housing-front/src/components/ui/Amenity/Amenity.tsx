import React from "react";
import styles from "./amenity.module.css";

export default function Amenity({ amenity }: { amenity: string }) {
  return <div className={styles.amenity}>{amenity}</div>;
}
