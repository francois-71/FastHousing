"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import LogOut from "../Logout";
import { CiLogin } from "react-icons/ci";
import { BsHouseDown, BsHouses } from "react-icons/bs";
import { LiaKeySolid } from "react-icons/lia";
import { GiWorld } from "react-icons/gi";
import { FaSignature } from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import { Session } from "next-auth";

export default function Header({ session }: { session: Session | null }) {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  // update session state when user logs out

  useEffect(() => {
    if (!session) {
      closeMenu();
    }
  }, [session]);

  return (
    <nav className={styles.navbar}>
      <Link className={styles.navBarLogo} href="/">
        <Image
          src={"/DFRenting-logo.png"}
          className={styles.logoStyle}
          width={500}
          height={300}
          sizes="100vw"
          alt="DFHousing"
        />
      </Link>

      <ul
        ref={menuRef}
        className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}
      >
        <li className={styles.navItem} onClick={closeMenu}>
          <Link className={styles.navLink} href="/">
            <GiWorld className={styles.worldLogo} />
            Explore
          </Link>
        </li>
        {session ? (
          <>
            <li className={styles.navItem} onClick={closeMenu}>
              <Link className={styles.navLink} href="/property/create">
                <BsHouseDown className={styles.registerHouseLogo} /> Register a
                property
              </Link>
            </li>
            <li className={styles.navItem} onClick={closeMenu}>
              <Link className={styles.navLink} href="/properties">
                <BsHouses className={styles.houseLogo} /> My properties
              </Link>
            </li>
            <li className={styles.navItem} onClick={closeMenu}>
              <Link className={styles.navLink} href="#">
                <LiaKeySolid className={styles.keysLogo} /> Host a home
              </Link>
            </li>
            <li className={styles.navItem} onClick={closeMenu}>
              <LogOut />
            </li>
            <li className={styles.navItem} onClick={closeMenu}>
              <Link className={styles.navLink} href="/account/profile">
                <img
                  src={session.user.image || "/DFRenting-logo.jpg"}
                  className={styles.avatar}
                  alt="Profile Picture"
                />
                Profile
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem} onClick={closeMenu}>
              <Link className={styles.navLink} href="/public/auth/sign-in">
                <CiLogin className={styles.signInLogo} /> Sign in
              </Link>
            </li>
            <li className={styles.navItem} onClick={closeMenu}>
              <Link className={styles.navLink} href="/public/auth/register">
                <FaSignature className={styles.registerLogo} /> Register
              </Link>
            </li>
          </>
        )}
      </ul>

      <div
        className={`${styles.headerHamburger} ${isMenuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <span className={styles.headerBar}></span>
        <span className={styles.headerBar}></span>
        <span className={styles.headerBar}></span>
      </div>
    </nav>
  );
}
