type imageConfigType = {
    imageCompressionQuality: number;
    nextImageQuality: number;
}

export const imageConfig: imageConfigType = {
    imageCompressionQuality: process.env.IMAGE_COMPRESSION_QUALITY ? parseInt(process.env.IMAGE_COMPRESSION_QUALITY) : 75,
    nextImageQuality: process.env.NEXT_IMAGE_QUALITY ? parseInt(process.env.NEXT_IMAGE_QUALITY) : 75
}