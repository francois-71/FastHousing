import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Config } from "@/config/amazon/s3-bucket.config";
import { v4 as uuidv4 } from "uuid";
import { parseISO, addSeconds } from "date-fns";

const Bucket = s3Config.bucket;
const s3 = new S3Client({
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.credentials.accessKeyId,
    secretAccessKey: s3Config.credentials.secretAccessKey,
  },
});

const handleUploadLocalFile =
  (setFile: React.Dispatch<React.SetStateAction<File | null>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

const handleUploadS3 = async (
  files: { compressedImage: Buffer; ext: string; fileName?: string }[] | null
) => {
  if (!files) {
    return;
  }

  return await uploadFilesToS3(files);
};

const uploadToS3 = async (fileName: string, file: Buffer) => {
  try {
    const command = new PutObjectCommand({
      Bucket,
      Key: fileName,
      Body: file,
    });
    await s3.send(command);
    console.log("File uploaded successfully");
  } catch (error) {
    throw new Error("Error uploading file to s3");
  }
};

const uploadFilesToS3 = async (
  files: { compressedImage: Buffer; ext: string; fileName?: string }[]
) => {
  const filenameArray: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i].compressedImage;
    const ext = files[i].ext;
    const originalName = files[i].fileName;
    const uid = uuidv4().replace(/-/g, "");
    const fileName = `${originalName}-${uid}.${ext}`;

    await uploadToS3(fileName, file);

    filenameArray.push(fileName);
  }

  return filenameArray;
};

const getImageLinkFromS3 = async (fileName: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket,
      Key: fileName,
    });
    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 60 * 60,
    });
    console.log("File downloaded successfully", signedUrl);

    return signedUrl;
  } catch (error) {
    throw new Error("Failed to download file");
  }
};

/**
 * Check if the image URL is valid by checking the X-Amz-Expires
 * and X-Amz-Date query parameters in the S3 pre-signed URL
 * @param {string} signedUrl
 * @return {*}  {Promise<boolean>}
 */

const checkS3ImageUrlValidity = async (signedUrl: string): Promise<boolean> => {
  const url = new URL(signedUrl);
  const expires = url.searchParams.get("X-Amz-Expires");
  const created = url.searchParams.get("X-Amz-Date");

  if (!expires || !created) {
    return false;
  }

  const expirationDate = addSeconds(parseISO(created), parseInt(expires));
  const currentDate = new Date();

  if (currentDate > expirationDate) {
    console.log("image url expired");

    return false;
  }

  return true;
};

const deleteFileFromS3 = async (filename: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket,
      Key: filename,
    });
    await s3.send(command);
    console.log("File removed successfully");
  } catch (error) {
    throw new Error("Error removing file");
  }
};

const deleteFilesFromS3 = async (filenames: string[]) => {
  for (const filename of filenames) {
    await deleteFileFromS3(filename);
  }
};

export {
  handleUploadLocalFile,
  uploadToS3,
  uploadFilesToS3,
  handleUploadS3,
  deleteFilesFromS3,
  deleteFileFromS3,
  getImageLinkFromS3,
  checkS3ImageUrlValidity,
};
