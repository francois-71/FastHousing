"use client";

import React from "react";
import styles from "./index.module.css";
import Modal from "../index";
import { useState } from "react";

interface GuestCountModalProps {
  onClose: () => void;
  guests: {
    adults: number;
    infants: number;
    children: number;
  };
  onAddGuests: (newGuests: {
    adults: number;
    infants: number;
    children: number;
  }) => void;
}

export default function GuestCountModal({
  guests,
  onClose,
  onAddGuests,
}: GuestCountModalProps) {
  const [adults, setAdults] = useState(guests.adults);
  const [children, setChildren] = useState(guests.children);
  const [infants, setInfants] = useState(guests.infants);

  const handleAdultCount = (value: number) => {
    if (adults + value < 1) {
      return;
    }
    const updatedAdults = adults + value;

    setAdults(updatedAdults);
    handleSave({ adults: updatedAdults, children, infants });
  };

  const handleChildrenCount = (value: number) => {
    if (children + value < 0) {
      return;
    }
    const updatedChildren = children + value;
    setChildren(updatedChildren);
    handleSave({ adults, children: updatedChildren, infants });
  };

  const handleInfantsCount = (value: number) => {
    if (infants + value < 0) {
      return;
    }
    const updatedInfants = infants + value;
    setInfants(updatedInfants);
    handleSave({ adults, children, infants: updatedInfants });
  };

  const handleSave = (newGuests: {
    adults: number;
    infants: number;
    children: number;
  }) => {
    onAddGuests(newGuests);
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.guestCount}>
        <div className={styles.guestCountTitle}>
          <h3>Adults</h3>
          <span>13+ years old</span>
        </div>
        <div className={styles.guestCountControls}>
          <button onClick={() => handleAdultCount(-1)}>-</button>
          <span>{guests.adults}</span>
          <button onClick={() => handleAdultCount(+1)}>+</button>
        </div>
      </div>
      <div className={styles.guestCount}>
        <div className={styles.guestCountTitle}>
          <h3>Children</h3>
          <span>2-12 years old</span>
        </div>
        <div className={styles.guestCountControls}>
          <button onClick={() => handleChildrenCount(-1)}>-</button>
          <span>{guests.children}</span>
          <button onClick={() => handleChildrenCount(+1)}>+</button>
        </div>
      </div>
      <div className={styles.guestCount}>
        <div className={styles.guestCountTitle}>
          <h3>Infants</h3>
          <span>0-2 years old</span>
        </div>
        <div className={styles.guestCountControls}>
          <button onClick={() => handleInfantsCount(-1)}>-</button>
          <span>{guests.infants}</span>
          <button onClick={() => handleInfantsCount(+1)}>+</button>
        </div>
      </div>
      <div className={styles.guestCountSave}>
        <button onClick={onClose}>Save</button>
      </div>
    </Modal>
  );
}
