"use client";

import styles from "./index.module.css";
import DatePicker from "react-multi-date-picker";
import GuestCountModal from "../../Modal/GuestCountModal";
import { useState } from "react";

export default function SmallReservationSearchBar() {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });

  const handleAddGuests = (newGuests: {
    adults: number;
    infants: number;
    children: number;
  }) => {
    setGuests(newGuests);
  };

  const sendGuestValues = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={sendGuestValues} className={styles.smallSearchBarForm}>
      <div className={styles.smallSearchBarOptionWrapper}>
        <input
          type="text"
          placeholder="Where are you going today ?"
          className={styles.smallSearchBarInput}
        />
      </div>
      <div className={styles.smallSearchBarOptionWrapper}>
        <DatePicker
          range={true}
          format="DD/MM/YYYY"
          inputClass={styles.smallSearchBarInput}
          placeholder="Click here to select your dates"
        />
      </div>
      {!showGuestModal ? (
        <div className={styles.smallSearchBarOptionWrapper}>
          <button
            className={styles.smallSearchBarGuestButton}
            onClick={() => setShowGuestModal(true)}
          >
            {guests.adults + guests.children + guests.infants < 2 ? (
              <span>
                {guests.adults + guests.children + guests.infants} Guest{" "}
              </span>
            ) : (
              <span>
                {" "}
                {guests.adults + guests.children + guests.infants} Guests{" "}
              </span>
            )}
          </button>
        </div>
      ) : (
        <GuestCountModal
          onClose={() => setShowGuestModal(false)}
          onAddGuests={handleAddGuests}
          guests={guests}
        />
      )}

      <div className={styles.smallSearchBarOptionWrapper}>
        <button
          id="submit-reservation"
          className={styles.smallSearchBarSubmitButton}
        >
          &#x1F50D;
        </button>
      </div>
    </form>
  );
}
