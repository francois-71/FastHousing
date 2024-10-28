"use server";

import prisma from "@/lib/prisma";
import { getImageLinkFromS3, checkS3ImageUrlValidity } from "@/lib/s3";
import { imageConfig } from "@/config/image.config";
import { compressMultipleImagesJpeg } from "@/lib/image-processing/compress";
import { Image } from "@/types/model";
import { sendFacesToDetection } from "@/lib/image-processing/face-detection/detect-face-image";
import { FacesInImages } from "@/types/micro-services/face-detection-service/detect-faces-in-images-type";

export async function getAllCoverImages(): Promise<Image[] | undefined> {
  try {
    const coverImages = await prisma.image.findMany({
      where: {
        order: 0,
      },
    });

    // check validity of the urls
    await revalidateImageUrls(coverImages);

    return coverImages;
  } catch (error) {
    console.error(error);
    throw new Error("Error in getAllCoverImages()");
  }
}

// this function also return all cover images with its propertyName.
export async function getAllCoverImagesByUser(
  userId: string
): Promise<(Image & { propertyName: string })[] | undefined> {
  try {
    // fetch cover images
    const coverImages = await prisma.image.findMany({
      where: {
        order: 0,
        property: {
          userId,
        },
      },
    });

    await revalidateImageUrls(coverImages);

    // fetch property names for the images
    const propertyIds = coverImages.map((image) => image.propertyId); // Assuming each image has a propertyId
    const properties = await prisma.property.findMany({
      where: {
        id: {
          in: propertyIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // map images to add propertyName
    const propertyMap = Object.fromEntries(
      properties.map((property) => [property.id, property.name])
    );

    const updatedImages = coverImages.map((image) => ({
      ...image,
      propertyName: propertyMap[image.propertyId] || "",
    }));

    return updatedImages;
  } catch (error) {
    console.error(error);
    throw new Error("An error occured in function getAllCoverImagesByUser");
  }
}

export async function revalidateImageUrl(image: Image): Promise<Image> {
  if (image.url) {
    const isValid = await checkS3ImageUrlValidity(image.url);
    if (!isValid) {
      try {
        image.url = await getImageLinkFromS3(image.filename);
        console.log("updating image url", image.url);
        await prisma.image.update({
          where: {
            id: image.id,
          },
          data: {
            url: image.url,
          },
        });
      } catch (error) {
        throw new Error(
          "An error occured while trying to update imageUrl (revalidateImageUrl())"
        );
      }
    }
  }

  return image;
}

export async function revalidateImageUrls(images: Image[]): Promise<Image[]> {
  return Promise.all(images.map((image) => revalidateImageUrl(image)));
}

export async function fetchImageUrl(id: string): Promise<string | undefined> {
  try {
    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    });

    if (!image || !image.url) {
      return undefined;
    }

    await revalidateImageUrl(image);

    const url = image.url;

    return url;
  } catch (error) {
    throw new Error("Error in fetchImageUrl()");
  }
}

export async function getImagesByPropertyId(
  propertyId: string
): Promise<Image[]> {
  const storedImageUrls = await prisma.image.findMany({
    where: {
      propertyId,
    },
  });

  await revalidateImageUrls(storedImageUrls);

  return storedImageUrls;
}

export async function getCoverImageByPropertyId(
  propertyId: string
): Promise<Image | undefined> {
  const storedImage = await prisma.image.findFirst({
    where: {
      propertyId,
      order: 1,
    },
  });

  if (!storedImage) {
    return undefined;
  }

  await revalidateImageUrl(storedImage);

  return storedImage;
}

export async function compressMultipleImages(
  files: File[]
): Promise<
  { compressedImage: Buffer; ext: string; fileName?: string | undefined }[]
> {
  const quality = imageConfig.imageCompressionQuality;
  try {
    const buffers = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const filename = file.name;
        const buffer = Buffer.from(arrayBuffer);

        return { buffer: buffer, fileName: filename };
      })
    );

    try {
      const compressedImages = await compressMultipleImagesJpeg(
        buffers,
        quality
      );

      return compressedImages;
    } catch (error) {
      throw new Error("Failed to compress multiple images");
    }
  } catch (error) {
    throw new Error("Failed to compress multiple images");
  }
}

// This function takes the images as input and send them to the sendFacesToDetection functions.
export async function containsFace(images: File[]): Promise<FacesInImages> {
  if (!images || images.length === 0) {
    throw new Error("No images provided");
  }

  try {
    const response: FacesInImages = await sendFacesToDetection({
      files: images,
    });
    if (!response) {
      throw new Error("No response from face detection API");
    }

    // filter images where faceCount is > 0 only
    const imagesWithFaces: FacesInImages = Object.fromEntries(
      Object.entries(response).filter(([, faceCount]) => faceCount > 0)
    );

    console.log(imagesWithFaces);

    return imagesWithFaces;
  } catch (error) {
    console.error("Error during face detection:", error);
    throw new Error("Failed to send data to Face Detection");
  }
}
