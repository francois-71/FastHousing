import React from "react";
import styles from "./index.module.css";

export default function ErrorDisplay({
  children,
  title,
  message,
}: {
  children?: React.JSX.Element[];
  title: string;
  message: string;
}) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorTitle}>
        <h1>{title}</h1>
      </div>
      <div className={styles.errorMessage}>
        <h2>{message}</h2>
      </div>
      {/* <div className={styles.errorChildren}>{children}</div> */}
      {children && (
        <div className={styles.errorChildren}>
          {children.map((child, index) => (
            <div className={styles.errorSingleChildren} key={index}>
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

