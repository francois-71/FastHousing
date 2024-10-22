import { Property, Prisma } from "@prisma/client";

// Define a validator for Property with included images

type PropertyWithImages = Prisma.PropertyGetPayload<{
  include: { images: true };
}>;

export type { Property, PropertyWithImages };
