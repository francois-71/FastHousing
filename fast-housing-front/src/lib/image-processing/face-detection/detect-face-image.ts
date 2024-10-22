import { faceDetectionServiceConfig } from "@/config/face-detection/face-detection-service-config";

/**
 * This function sends a File object to the face detection service to detect faces in the image.
 * This prevents users from posting images with faces when registering a property, for example.
 *
 * @param {File[]} files
 */

const sendFacesToDetection = async ({ files }: { files: File[] }): Promise<any> => {
  const formData = new FormData();
  files.forEach((file: File) => {
    formData.append(`images`, file);
  });

  // sending the images to the face detection service
  console.log("sending images to face detection service");
  try {
    const response = await fetch(
      `${faceDetectionServiceConfig.FACE_DETECTION_SERVICE_API}/detect-faces-in-image`,
      {
        method: "POST",
        body: formData,
      }
    );
    // get the json response
    const data = await response.json();

    if (!response.ok || response === undefined) {
      throw new Error("Error sending images to the face detection service");
    }

    console.log("data", data);
    
    return data;

  } catch (error) {
    throw new Error("Error sending images to the face detection service");
  }
};

export { sendFacesToDetection };
