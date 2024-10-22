"use client";

import React from "react";
import styles from "./index.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, onClose }: ModalProps) {

  return (
    <div className={styles.modalContainer} onClick={onClose}>
      <div className={styles.modalContent} onClick={(event: React.MouseEvent<HTMLDivElement>) => {event.stopPropagation()}}>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}
