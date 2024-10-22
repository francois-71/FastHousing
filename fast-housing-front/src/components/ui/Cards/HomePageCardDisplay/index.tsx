import React from "react";
import PropertyCard from "@/components/ui/Cards/PropertyCard";
import styles from "./index.module.css";
import { redirect } from "next/navigation";
import { PropertyWithImages } from "@/types/model";

type HomePageCardDisplayProps = {
  properties: Partial<PropertyWithImages>[];
  imageQuality: number;
};

export default function HomePageCardDisplay({
  properties,
  imageQuality,
}: HomePageCardDisplayProps) {
  if (!properties) {
    redirect("/error");
  }

  return (
    <div>
      <div className={styles.cardContainer}>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={{
              description: property.description,
              price: property.price,
              id: property.id,
              city: property.city,
              country: property.country,
              currency: property.currency,
              images: property.images,
            }}
            coverImage={property.images?.find((img) => img.coverImage)}
            imageQuality={imageQuality}
            editPathname="public/property"
          >
            <div className={styles.cardDescription}>
              <span className={styles.cardDescriptionLocation}>
                {property.city}, {property.country}
              </span>
              <p className={styles.cardDescriptionText}>
                {property.description}
              </p>
              <p className={styles.cardDescriptionPrice}>
                {property.price} {property.currency} / night
              </p>
            </div>
          </PropertyCard>
        ))}
      </div>
    </div>
  );
}
