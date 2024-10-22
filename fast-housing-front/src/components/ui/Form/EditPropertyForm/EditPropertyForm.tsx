"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./edit-property-form.module.css";
import {
  CurrencyEnum,
  AccommodationEnum,
  AmenitiesEnum,
  SizeMetricsEnum,
} from "@/types/enums";
import { EditPropertyType, editPropertySchema } from "@/schema/edit-property";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PropertyWithImages } from "@/types/model/property-type";

export default function EditPropertyForm({
  propertyId,
}: {
  propertyId: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditPropertyType>({
    resolver: zodResolver(editPropertySchema, {}, { raw: true }),
  });

  const [error, setError] = React.useState<string>("");
  const [fileCount, setFileCount] = React.useState<number>(0);
  const [initialData, setInitialData] =
    React.useState<PropertyWithImages | null>();
  const router = useRouter();

  const getPropertyDetails = async (
    propertyId: string
  ): Promise<PropertyWithImages | null> => {
    try {
      const response = await fetch(`/api/host/property/get?id=${propertyId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch property ${propertyId} `);
      }

      const data = await response.json();

      const property = data.property;

      return property;
    } catch (error) {
      console.error(`Error fetching property ${propertyId}`);

      return null;
    }
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      const property: PropertyWithImages | null =
        await getPropertyDetails(propertyId);

      if (property) {
        // Use setValue to populate the form fields
        setValue("name", property.name || "");
        setValue("address", property.address || "");
        setValue("city", property.city || "");
        setValue("state", property.state || "");
        setValue("zip", property.zip || "");
        setValue("country", property.country || "");
        setValue("description", property.description || "");
        setValue("price", property.price || 0);
        setValue("currency", property.currency || CurrencyEnum.EUR);
        setValue("rooms", property.rooms || 0);
        setValue("sizeValue", property.sizeValue);
        setValue("sizeMetric", property.sizeMetric || SizeMetricsEnum.SQM);
        setValue("amenities", property.amenities || []);
        setValue(
          "accommodationType",
          property.accommodationType || AccommodationEnum.APARTMENT
        );
        setInitialData(property);
      }
    };

    fetchPropertyData();
  }, [propertyId, setValue]);

  const onSubmit: SubmitHandler<EditPropertyType> = async (data) => {
    // this formData is for the actual values
    const formData = new FormData();

    for (const field of Object.keys(data) as Array<keyof typeof data>) {
      if (field === "images" && data.images) {
        const images = data.images;
        for (let i = 0; i < images.length; i++) {
          if (initialData?.images[i].filename !== images[i].name) {
            console.log(
              "initial image",
              initialData?.images[i].filename,
              "actual image",
              images[i].name
            );
            formData.append("images", images[i]);
          }
        }
      } else if (field === "amenities") {
        const amenities = data.amenities;
        for (let i = 0; i < amenities.length; i++) {
          if (initialData?.amenities[i] !== amenities[i])
            formData.append("amenities", amenities[i]);
        }
      } else {
        const value = data[field];
        if (typeof value === "number" || Array.isArray(value)) {
          formData.append(field, value.toString());
        } else {
          formData.append(field, value ?? "");
        }
      }
    }

    // check changes with initial data.
    console.log("initial data", initialData);
    // log formData
    Array.from(formData.entries()).forEach((entry) => {
      console.log(entry);
    });

    const response = await fetch("/api/host/property/edit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Property was modified");
    } else {
      console.error("Error modifying property");
      setError(
        "There was an error updating your property. Please try again later."
      );
    }
  };

  const handleArrowClick = () => {
    router.back();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setValue("images", fileList);
      register("images");
      setFileCount(fileList.length);
    }
  };

  return (
    <div className={styles.editPropertyFormContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.editPropertyForm}
      >
        <div className={styles.editPropertyFormTitleContainer}>
          <button
            type="button"
            onClick={handleArrowClick}
            className={styles.navigateBackward}
          >
            &#8592;
          </button>
          <h2 className={styles.editPropertyFormTitle}>Edit your property</h2>
        </div>
        {error && <div className={styles.editPropertyErrors}>{error}</div>}
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Property Name </label>
          <input
            type="text"
            placeholder="Property Name"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Address </label>
          <input type="text" placeholder="Address" {...register("address")} />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> City </label>
          <input type="text" placeholder="City" {...register("city")} />
          {errors.city && <p>{errors.city.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> State </label>
          <input type="text" placeholder="State" {...register("state")} />
          {errors.state && <p>{errors.state.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Zip </label>
          <input type="text" placeholder="Zip" {...register("zip")} />
          {errors.zip && <p>{errors.zip.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Country </label>
          <input type="text" placeholder="Country" {...register("country")} />
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Description </label>
          <input
            type="text"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Price </label>
          <input type="number" placeholder="Price" {...register("price")} />
          <select {...register("currency")}>
            {Object.values(CurrencyEnum).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          {errors.currency && <p>{errors.currency.message}</p>}
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Rooms</label>
          <input type="number" placeholder="Rooms" {...register("rooms")} />
          {errors.rooms && <p>{errors.rooms.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Size </label>
          <input type="text" placeholder="Size" {...register("sizeValue")} />
          <select {...register("sizeMetric")}>
            {Object.values(SizeMetricsEnum).map((sizeMetric) => (
              <option key={sizeMetric} value={sizeMetric}>
                {sizeMetric}
              </option>
            ))}
          </select>
          {errors.sizeValue && <p>{errors.sizeValue.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor="fileUpload" className={styles.customeFileUpload}>
            Upload Images
          </label>{" "}
          <input
            id="fileUpload" // Assign an ID to the input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            style={{ display: "none" }} // Hide the default input
          />
          <span>{fileCount} file(s) selected</span>{" "}
          {/* Display the number of files selected */}
          {errors.images && <p>{errors.images.message}</p>}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Accommodation Type </label>
          <select {...register("accommodationType")}>
            {Object.values(AccommodationEnum).map((accommodationType) => (
              <option key={accommodationType} value={accommodationType}>
                {accommodationType}
              </option>
            ))}
          </select>
          {errors.accommodationType && (
            <p>{errors.accommodationType.message}</p>
          )}
        </div>
        <div className={styles.editPropertyFormInput}>
          <label htmlFor=""> Amenities </label>
          {Object.values(AmenitiesEnum).map((amenity) => (
            <div className={styles.editPropertyFormAmenities} key={amenity}>
              <div className={styles.amenityItem}>
                <label>{amenity}</label>
                <input
                  type="checkbox"
                  value={amenity}
                  {...register("amenities")}
                  className={styles.amenityInput}
                />
              </div>
            </div>
          ))}
          {errors.amenities && <p>{errors.amenities.message}</p>}
        </div>
        <div className={styles.editPropertyFormSubmitButton}>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
