import React from "react";
import styles from "./index.module.css";
import PropertyCard from "@/components/ui/Cards/PropertyCard";
import { PropertyWithImages, Image as ImageProps } from "@/types/model";
import Amenities from "@/components/ui/Amenity/Amenity";
import EditPropertyButton from "@/components/ui/Buttons/EditProperty/EditProperty";
import DeletePropertyButton from "@/components/ui/Buttons/DeleteProperty/DeleteProperty";

type HostPropertyCardDisplayProps = {
  properties: Partial<PropertyWithImages>[];
  imageQuality: number;
};

export default function HostPropertyCardDisplay({
  properties,
  imageQuality,
}: HostPropertyCardDisplayProps) {
  return (
    <div className={styles.propertyCardsContainer}>
      {properties.map((property, index) => {
        const coverImage: ImageProps | undefined = property.images?.find(
          (img) => img.coverImage
        );

        return (
          <div key={index}>
            {coverImage && (
              <PropertyCard
                property={{
                  description: property.description,
                  price: property.price,
                  id: property.id,
                  sizeValue: property.sizeValue,
                  rooms: property.rooms,
                  amenities: property.amenities,
                  currency: property.currency,
                  country: property.country,
                  zip: property.zip,
                  state: property.state,
                  city: property.city,
                  address: property.address,
                  name: property.name,
                  images: property.images,
                  categories: property.categories,
                }}
                coverImage={coverImage}
                imageQuality={imageQuality}
                editPathname="property/"
                buttons={[
                  <EditPropertyButton
                    key={`edit-${property.id}`}
                    text="Edit"
                    propertyId={property.id as string}
                  />,
                  <DeletePropertyButton
                    key={`delete-${property.id}`}
                    text="Delete"
                    propertyId={property.id as string}
                  />,
                ]}
              >
                <div className={styles.cardDescription}>
                  <span className={styles.cardDescriptionLocation}>
                    {property.city}, {property.country}
                  </span>
                  <p className={styles.cardDescriptionText}>
                    {property.description}
                  </p>
                  <p className={styles.cardDescriptionDate}>
                    Created at: &nbsp;
                    {property.createdAt
                      ? new Date(property.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "Undefined"}
                  </p>
                  <span className={styles.cardDescriptionDate}>
                    <p>Updated at: &nbsp; </p>
                    {property.updatedAt
                      ? new Date(property.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "Undefined"}
                  </span>

                  <p className={styles.cardDescriptionPrice}>
                    {property.price} {property.currency} / night
                  </p>

                  <p className={styles.cardDescriptionPrice}>
                    {property.sizeValue} {property.sizeMetric}
                  </p>
                  <p className={styles.cardDescriptionPrice}>
                    {property.rooms} rooms
                  </p>
                  <div className={styles.cardDescriptionAmenities}>
                    {property.amenities?.map((amenity, index) => {
                      return <Amenities amenity={amenity} key={index} />;
                    })}
                  </div>
                </div>
              </PropertyCard>
            )}
          </div>
        );
      })}
    </div>
  );
}
