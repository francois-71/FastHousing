import sharp from "sharp";

export async function compressImageJpeg(
  buffer: Buffer,
  quality: number,
  fileName?: string
): Promise<{
  compressedImage: Buffer;
  ext: string;
  fileName: string | undefined;
}> {
  const compressedImage = await sharp(buffer).jpeg({ quality }).toBuffer();

  return {
    compressedImage: compressedImage,
    ext: "jpeg",
    fileName: fileName,
  };
}

export async function compressMultipleImagesJpeg(
  buffers: { buffer: Buffer; fileName: string }[],
  quality: number
): Promise<
  { compressedImage: Buffer; ext: string; fileName: string | undefined }[]
> {
  const compressedImages = await Promise.all(
    buffers.map(async (buffer) => {
      return await compressImageJpeg(buffer.buffer, quality, buffer.fileName);
    })
  );

  return compressedImages;
}
