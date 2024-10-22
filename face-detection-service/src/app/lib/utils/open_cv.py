import os
import cv2

class Utils:

    @staticmethod
    def initialize_opencv_mode(model_path):
        classifier = cv2.CascadeClassifier()
        if not classifier.load(model_path):
            print(f"Error loading Haar cascade file from path: {model_path}")
            return None

        return classifier

    @staticmethod
    def detect_faces(model, image):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = model.detectMultiScale(gray, 1.3, 5)
        return faces

    @staticmethod
    def load_image(image_path):
        image = cv2.imread(image_path)
        if image is None:
            print(f"Error loading image from path: {image_path}")
        return image

    @staticmethod
    def draw_rectangle_around_faces(image, faces):
        for x, y, w, h in faces:
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 3)
        return image
