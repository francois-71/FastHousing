// This is a schema validator for the create property request

import { z } from "zod";
import {
  CurrencyEnum,
  AccommodationEnum,
  AmenitiesEnum,
  SizeMetricsEnum,
} from "@/types/enums";

export const editPropertySchema = z.object({
  name: z.string().trim().max(200).min(4, {
    message:
      "The property name should contain more than 3 characters and less than 200",
  }),
  //TODO we need to adjust the regex later on
  address: z
    .string()
    .trim()
    .regex(/\d+ \w+/, {
      message: "The address should contain a number and a street name",
    })
    .min(4, {
      message: "The address should contain at least 4 characters",
    })
    .max(200, {
      message: "The address should not exceed 200 characters",
    }),
  // later on, should be an enum
  city: z
    .string()
    .trim()
    .min(4, {
      message: "The city name should contain more than 3 characters",
    })
    .max(25, {
      message: "The city name should not exceed 25 characters",
    }),

  state: z
    .string()
    .trim()
    .min(2, {
      message: "The state name should contain more than 3 characters",
    })
    .max(25, {
      message: "The state name should not exceed 25 characters",
    }),
  zip: z
    .string()
    .trim()
    .min(4, {
      message: "The zip code should contain more than 3 characters",
    })
    .max(25, {
      message: "The zip code should not exceed 25 characters",
    }),
  country: z
    .string()
    .trim()
    .min(4, {
      message: "The country name should contain more than 3 characters",
    })
    .max(25, {
      message: "The country name should not exceed 25 characters",
    }),
  description: z
    .string()
    .trim()
    .min(20, {
      message: "The description should at least contain 20 characters",
    })
    .max(200, {
      message: "The description should not exceed 200 characters",
    }),
  currency: z.nativeEnum(CurrencyEnum, {
    message:
      "Currency should be one of the following: USD, EUR, JPY, GBP, AUD, CAD, CHF, CNY, SEK, NZD",
  }),

  images: z
    .array(
      z.instanceof(File).superRefine((file, ctx) => {
        const maxFileSize = 1 * 1024 * 1024; // 1MB
        const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (file.size > maxFileSize) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File ${file.name} exceeds the maximum size of ${maxFileSize} bytes`,
          });
        }
        if (!allowedFileTypes.includes(file.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File ${file.name} is not a valid image type`,
          });
        }
      })
    )
    .min(1, "At least one image is required")
    .max(10, "You can only upload 10 images at most"),
  price: z.coerce
    .number()
    .positive()
    .min(0, {
      message: "You cannot set a price lower than 20",
    })
    .max(100000, {
      message: "You cannot set a price higher than 100000",
    }),

  amenities: z
    .array(
      z.nativeEnum(AmenitiesEnum, {
        message: "Please, choose at least one amenity",
      })
    )
    .superRefine((val, ctx) => {
      if (val.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `At least one amenity is required`,
        });
      }
      if (val.length > Object.values(AmenitiesEnum).length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `You can only choose ${Object.values(AmenitiesEnum).length} amenities at most`,
        });
      }
      val.forEach((amenity, index) => {
        if (!Object.values(AmenitiesEnum).includes(amenity)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Amenity at index ${index} is not valid`,
          });
        }
      });
    }),
  rooms: z.coerce
    .number()
    .positive({
      message: "Rooms cannot be empty",
    })
    .min(1, {
      message: "You should have at least one room",
    })
    .max(50, {
      message: "You can only have 50 rooms at most",
    }),
  sizeValue: z.coerce.number().positive({
    message: "Size is missing",
  }),
  sizeMetric: z
    .nativeEnum(SizeMetricsEnum, {
      message: "Size metrics is not valid",
    })
    .superRefine(
      // check that the size metrics exists in the enum
      (val, ctx) => {
        if (val && !Object.values(SizeMetricsEnum).includes(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Size metrics ${val} is not valid`,
          });
        }
      }
    ),
  accommodationType: z
    .nativeEnum(AccommodationEnum, {
      message: "Accommodation type is not valid",
    })
    .superRefine(
      // check that the accommodation type exists in the enum
      (val, ctx) => {
        if (val && !Object.values(AccommodationEnum).includes(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Accommodation type ${val} is not valid`,
          });
        }
      }
    ),
});

export type EditPropertyType = z.infer<typeof editPropertySchema>;
