type imageConfigType = {
  imageCompressionQuality: number;
  nextImageQuality: number;
};

type revalidateTimeConfigType = {
  apiProperties: number;
  apiHostProperties: number;
};

export const imageConfig: imageConfigType = {
  imageCompressionQuality: process.env.IMAGE_COMPRESSION_QUALITY
    ? parseInt(process.env.IMAGE_COMPRESSION_QUALITY)
    : 75,
  nextImageQuality: process.env.NEXT_IMAGE_QUALITY
    ? parseInt(process.env.NEXT_IMAGE_QUALITY)
    : 75,
};

export const revalidateTimeConfig: revalidateTimeConfigType = {
  apiProperties: process.env.REVALIDATE_TIME_API_PROPERTIES
    ? parseInt(process.env.REVALIDATE_TIME_API_PROPERTIES)
    : 3600,
  apiHostProperties: process.env.REVALIDATE_TIME_API_HOST_PROPERTIES
    ? parseInt(process.env.REVALIDATE_TIME_API_HOST_PROPERTIES)
    : 3600,

};
