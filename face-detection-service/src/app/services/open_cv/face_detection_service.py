from typing import List
import numpy as np
from lib.utils.open_cv import Utils
import cv2


class FaceDetectionService:
    def __init__(self, model_path: str):
        try:
            # Load the face detection model
            self.face_cascade = cv2.CascadeClassifier(model_path)
            if self.face_cascade.empty():
                raise ValueError(f"Failed to load model from path: {model_path}")
        except Exception as e:
            raise ValueError(f"Error initializing face cascade: {e}")

    async def detect_face(self, image) -> List:
        """this function detects faces in an image and returns the number of faces detected
        in a list

        Args:
            image (_type_): _description_

        Raises:
            IOError: _description_
            ValueError: _description_
            ValueError: _description_
            ValueError: _description_
            ValueError: _description_
            RuntimeError: _description_

        Returns:
            List: _description_
        """

        try:
            image_content = await image.read()
        except Exception as e:
            raise IOError(f"Error reading image content: {e}")

        try:
            np_array = np.frombuffer(image_content, np.uint8)
        except Exception as e:
            raise ValueError(f"Error converting image content to numpy array: {e}")

        try:
            load_image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
            if load_image is None:
                raise ValueError("Error decoding image")
        except Exception as e:
            raise ValueError(f"Error decoding image: {e}")

        try:
            gray_image = cv2.cvtColor(load_image, cv2.COLOR_BGR2GRAY)
        except Exception as e:
            raise ValueError(f"Error converting image to grayscale: {e}")

        try:
            faces = self.face_cascade.detectMultiScale(
                gray_image, scaleFactor=1.20, minNeighbors=4, minSize=(30, 30)
            )
        except Exception as e:
            raise RuntimeError(f"Error detecting faces: {e}")

        return faces

    async def detect_multiple_faces(self, images: List[np.ndarray]) -> dict:
        """ this function takes a list of images and returns a dictionary with the filename as key
        and the number of faces detected in the image as value

        Args:
            images (List[np.ndarray]): _description_

        Returns:
            dict: _description_
        """

        results = {}
        for image in images:
            try:
                faces = await self.detect_face(image)

                # key as filename, value as number of faces detected
                results[image.filename] = len(faces)
            except Exception as e:
                print(f"Error processing image: {image.filename} {e}, skipping image")

        return results
