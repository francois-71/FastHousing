import React from "react";
import LoginGoogle from "./Google";
import LoginGithub from "./Github";
import styles from "./index.module.css";

export default function OAuthButtons() {
  return (
    <div className={styles.authWrapperOAuth}>
      <LoginGithub />
      <LoginGoogle />
    </div>
  );
}
