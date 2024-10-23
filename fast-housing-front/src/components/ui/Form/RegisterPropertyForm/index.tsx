"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./index.module.css";
import {
  CurrencyEnum,
  AccommodationEnum,
  AmenitiesEnum,
  SizeMetricsEnum,
} from "@/types/enums";
import {
  CreatePropertyType,
  createPropertySchema,
} from "@/schema/create-property";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function RegisterPropertyForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreatePropertyType>({
    resolver: zodResolver(createPropertySchema, {}, { raw: true }),
    defaultValues: {
      currency: CurrencyEnum.EUR,
      accommodationType: AccommodationEnum.APARTMENT,
      amenities: [AmenitiesEnum.WIFI],
      sizeMetric: SizeMetricsEnum.SQM,
      images: [],
    },
  });

  const [error, setError] = React.useState<string>("");
  const [fileCount, setFileCount] = React.useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    console.log("errors", errors);
  });

  const onSubmit: SubmitHandler<CreatePropertyType> = async (data) => {
    setError("");
    console.log("test");
    const formData = new FormData();

    for (const field of Object.keys(data) as Array<keyof typeof data>) {
      if (field === "images" && data.images) {
        const images = data.images;
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      } else if (field === "amenities") {
        const amenities = data.amenities;
        for (let i = 0; i < amenities.length; i++) {
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

    console.log("test", formData);
    try {
      const response = await fetch("/api/host/property/create", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || "There was an error creating your property. Please try again later.";
        setError(errorMessage);
      }

      return;
    } catch (error){
      setError("An unexpected error occured. Please try again later.")
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
    <div className={styles.createPropertyFormContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.createPropertyForm}
      >
        <div className={styles.createPropertyFormTitleContainer}>
          <button
            type="button"
            onClick={handleArrowClick}
            className={styles.navigateBackward}
          >
            &#8592;
          </button>
          <h2 className={styles.createPropertyFormTitle}>Register Property</h2>
        </div>
        {error && <div className={styles.createPropertyErrors}>{error}</div>}
        <div className={styles.createPropertyFormInput}>
          <label htmlFor=""> Property Name </label>
          <input
            type="text"
            placeholder="Property Name"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={styles.createPropertyFormInput}>
          <label htmlFor=""> Address </label>
          <input type="text" placeholder="Address" {...register("address")} />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div className={styles.createPropertyFormInput}>
          <label htmlFor=""> City </label>
          <input type="text" placeholder="City" {...register("city")} />
          {errors.city && <p>{errors.city.message}</p>}
        </div>
        <div className={styles.createPropertyFormInput}>
          <label htmlFor=""> State </label>
          <input type="text" placeholder="State" {...register("state")} />
          {errors.state && <p>{errors.state.message}</p>}
        </div>
        <div className={styles.createPropertyFormInput}>
          <label htmlFor=""> Zip </label>
          <input type="text" placeholder="Zip" {...register("zip")} />
          {errors.zip && <p>{errors.zip.message}</p>}
        </div>
        <div className={styles.createPropertyFormInput}>
          <label htmlFor=""> Country </label>
          <input type="text" placeholder="Country" {...register("country")} />
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <div className={styles.createPropertyFormInput}>
          <label htmlFor=""> Description </label>
          <input
            type="text"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className={styles.createPropertyFormInput}>
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
        <div className={styles.createPropertyFormInput}>
          <label htmlFor=""> Rooms</label>
          <input type="number" placeholder="Rooms" {...register("rooms")} />
          {errors.rooms && <p>{errors.rooms.message}</p>}
        </div>
        <div className={styles.createPropertyFormInput}>
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
        <div className={styles.createPropertyFormInput}>
          <label htmlFor="fileUpload" className={styles.customeFileUpload}>
            Upload Images (5MB max. per images)
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
        <div className={styles.createPropertyFormInput}>
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
        <div className={styles.createPropertyFormInput}>
          <label htmlFor=""> Amenities </label>
          {Object.values(AmenitiesEnum).map((amenity) => (
            <div className={styles.createPropertyFormAmenities} key={amenity}>
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
        <div className={styles.createPropertyFormSubmitButton}>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
