"use server";

import prisma from "@/lib/prisma";
import { Property } from "@/types/model";
import {
  compressMultipleImages,
  containsFace,
  revalidateImageUrls,
} from "./images";
import {
  deleteFilesFromS3,
  getImageLinkFromS3,
  handleUploadS3,
} from "@/lib/s3";

// make sure that the userId comes from the session when calling this method
export async function fetchPropertyById(
  id: string,
  userId: string
): Promise<Property | undefined> {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        images: true,
      },
    });

    if (!property) {
      return undefined;
    }

    await revalidateImageUrls(property.images);

    return property;
  } catch (error) {
    throw new Error("Error in fetchPropertyById()");
  }
}

export async function fetchTwentyRandomProperties(): Promise<Property[]> {
  try {
    const properties = await prisma.property.findMany({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
      },
    });

    properties.map(async (property) => {
      return revalidateImageUrls(property.images);
    });

    return properties;
  } catch (error) {
    throw new Error("Error in fetchTwentyRandomProperties(), Prisma error");
  }
}

// fetchHostProperties will return all properties for a specific host
export async function fetchHostProperties(userId: string): Promise<Property[]> {
  if (!userId || userId === "") {
    throw new Error("Error in fetchHostProperties(), userId is required");
  }
  try {
    const properties = await prisma.property.findMany({
      where: {
        userId,
      },
      include: {
        images: true,
      },
    });

    properties.map(async (property) => {
      await revalidateImageUrls(property.images);
    });

    return properties;
  } catch (error) {
    throw new Error("Error in fetchHostProperties(), Prisma error");
  }
}

export async function editProperty(
  property: Record<string, any>,
  userId: string
): Promise<{ success: boolean; message?: string | undefined }> {
  // check if the new images submitted contains faces
  try {
    const imageContainsFace = await containsFace(property.images);

    if (!imageContainsFace) {
      return { success: false, message: "Faces have been detected" };
    }

    const compressedImages = await compressMultipleImages(property.images);

    if (!compressedImages) {
      return { success: false, message: "Error compressing images" };
    }

    const imageNames = await handleUploadS3(compressedImages);

    if (!imageNames || imageNames.length === 0) {
      return { success: false, message: "Error uploading images" };
    }

    const updatedImageUrls = await Promise.all(
      imageNames.map(async (filename) => {
        return await getImageLinkFromS3(filename);
      })
    );

    if (!updatedImageUrls || updatedImageUrls.length === 0) {
      return { success: false, message: "Error getting image URLs" };
    }

    console.log("updatedImageUrls", updatedImageUrls);

    const editedProperty = await prisma.property.update({
      data: {
        name: property.name,
        address: property.address,
        city: property.city,
        state: property.state,
        zip: property.zip,
        country: property.country,
        description: property.description,
        currency: property.currency,
        images: {
          create: imageNames.map((filename, index) => ({
            filename: filename,
            order: index,
            coverImage: index === 0,
            url: updatedImageUrls[index],
          })),
        },
        price: property.price,
        amenities: property.amenities,
        rooms: property.rooms,
        sizeValue: property.sizeValue,
        sizeMetric: property.sizeMetric,
        accommodationType: property.accommodationType,
      },
      where: {
        id: property.id,
      },
    });
  } catch (error) {
    throw new Error("An error occured while trying to edit the property");
  }

  return { success: true };
}

export async function createProperty(
  property: Record<string, any>,
  sessionId: string
): Promise<{ success: boolean; message?: string | undefined }> {
  try {
    // first we should check that the images doesn't contain any faces. We don't want to store images with faces for the properties.
    // Also, we compress the images after the face check because the detection is more accurate with the original images.

    const imagesContainsFace = await containsFace(property.images);

    console.log("imagesContainsFace", imagesContainsFace);

    if (!imagesContainsFace) {
      return { success: false, message: "Faces have been detected" };
    }

    const compressedImages = await compressMultipleImages(property.images);

    if (!compressedImages) {
      return { success: false, message: "Error compressing images" };
    }

    const imageNames = await handleUploadS3(compressedImages);

    if (!imageNames || imageNames.length === 0) {
      return { success: false, message: "Error uploading images" };
    }

    const updatedImageUrls = await Promise.all(
      imageNames.map(async (filename) => {
        return await getImageLinkFromS3(filename);
      })
    );

    if (!updatedImageUrls || updatedImageUrls.length === 0) {
      return { success: false, message: "Error getting image URLs" };
    }

    console.log("updatedImageUrls", updatedImageUrls);

    const registeredProperty = await prisma.property.create({
      data: {
        name: property.name,
        address: property.address,
        city: property.city,
        state: property.state,
        zip: property.zip,
        country: property.country,
        description: property.description,
        currency: property.currency,
        images: {
          create: imageNames.map((filename, index) => ({
            filename: filename,
            order: index,
            coverImage: index === 0,
            url: updatedImageUrls[index],
          })),
        },
        price: property.price,
        amenities: property.amenities,
        rooms: property.rooms,
        sizeValue: property.sizeValue,
        sizeMetric: property.sizeMetric,
        user: {
          connect: { id: sessionId },
        },
        accommodationType: property.accommodationType,
      },
    });

    if (!registeredProperty) {
      return { success: false, message: "Error creating property" };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating property");
  }
}

/**
 * Function that deletes a property from the database and S3
 * start the transaction once the images are retrieved.
 * delete the property and then it's images from the database
 * once it's done, delete the images from S3
 *
 * @export
 * @param {string} propertyId
 * @return {*}  {Promise<void>}
 */
export async function deleteProperty(propertyId: string) {
  const propertyImages = await prisma.image.findMany({
    where: {
      propertyId,
    },
  });

  if (!propertyImages) {
    return { success: false };
  }

  const propertyFilenames: string[] = propertyImages.map(
    (image) => image.filename
  );

  if (!propertyFilenames) {
    return { success: false };
  }

  if (propertyFilenames.length === 0) {
    throw new Error(
      "Found a property with no filenames, that should not have happened, canceling the deletion process."
    );
  }

  // start the transaction to prevent partial deletion (e.g: deleting the property from the db but not from S3)
  await prisma.$transaction(async (prisma) => {
    await prisma.property.delete({
      where: {
        id: propertyId,
      },
      include: {
        images: true,
      },
    });

    try {
      await deleteFilesFromS3(propertyFilenames);
    } catch (error) {
      throw new Error(
        "An error occured while trying to delete one or many files from S3 after the deletion from the db"
      );
    }
  });
}
