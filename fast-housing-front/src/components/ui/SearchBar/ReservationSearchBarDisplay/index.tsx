import React from "react";
import styles from "./index.module.css";

// import BigReservationSearchBar from "../BigReservationSearchBar";
import ReservationSearchBar from "../ReservationSearchBar";

export default function ReservationSearchBarDisplay() {
  return (
    <div>
      <div className={styles.searchBarContainer}>
        <ReservationSearchBar />
      </div>
    </div>
  );
}
