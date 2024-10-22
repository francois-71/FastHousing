"use server";

import prisma from "@/lib/prisma";
import { getImageLinkFromS3, checkS3ImageUrlValidity } from "@/lib/s3";
import { imageConfig } from "@/config/image.config";
import { compressMultipleImagesJpeg } from "@/lib/image-processing/compress";
import { Image } from "@/types/model";
import { sendFacesToDetection } from "@/lib/image-processing/face-detection/detect-face-image";

export async function getAllCoverImages(): Promise<Image[]> {
  try {
    const coverImages = await prisma.image.findMany({
      where: {
        order: 1,
      },
    });

    // check validity of the urls
    await revalidateImageUrls(coverImages);

    return coverImages;
  } catch (error) {
    throw new Error("Error in getAllCoverImages()");
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
      } catch (error){
        throw new Error("An error occured while trying to update imageUrl (revalidateImageUrl())");
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
): Promise<{ compressedImage: Buffer; ext: string; fileName?: string | undefined }[]> {
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

export async function containsFace(images: File[]): Promise<any> {
  console.log("before detectFaces");
  const response = await sendFacesToDetection({ files: images });
  console.log("response1", response);
  // parse the json to check face presence and update true or false

  for (const key in response) {
    if (response[key] > 0) {
      return false;
    }
  }

  console.log("response2", response);

  return response;
}
