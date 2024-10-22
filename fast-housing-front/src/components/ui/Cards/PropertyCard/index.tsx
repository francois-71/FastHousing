import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import { PropertyWithImages, Image as ImageProps } from "@/types/model";

type PropertyCardProps = {
  coverImage: ImageProps | undefined;
  property: Partial<PropertyWithImages>;
  imageQuality: number;
  children?: JSX.Element;
  buttons?: any[];
  editPathname: string | null;
};

export default function PropertyCard({
  coverImage,
  property,
  editPathname,
  imageQuality,
  buttons,
  children,
}: PropertyCardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardButtonWrapper}>
        {buttons &&
          buttons.map((button, index) => {
            return (
              <div key={index}>
                {button}
              </div>
            );
          })}
      </div>
      <Link
        href={{
          pathname: `/${editPathname}/${property.id}`,
          query: {
            price: property.price,
            description: property.description,
          },
        }}
        className={styles.cardLink}
      >
        <div className={styles.cardMain}>
          <Image
            className={styles.cardImg}
            src={coverImage?.url || "/DFRenting-logo.jpg"}
            alt="Property Image"
            fill
            quality={imageQuality}
          />
        </div>

        {children}
      </Link>
    </div>
  );
}
