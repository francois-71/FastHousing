from fastapi import HTTPException, APIRouter, File, UploadFile
from typing import List
from pathlib import Path
from services.open_cv.face_detection_service import FaceDetectionService
from lib.utils.open_cv import Utils
from config.config import settings

import cv2
import numpy as np

router = APIRouter()


@router.post("/detect-faces-in-image")
async def detect_faces(images: List[UploadFile] = File(...)):

    model_path = settings.HAARCASCADE_MODEL_PATH

    print("model_path", model_path)

    if not Path(model_path).is_file():
        print("Model file not found")
        raise HTTPException(status_code=500, detail="Model file not found")

    try:
        face_detection_service = FaceDetectionService(model_path)
        response = await face_detection_service.detect_multiple_faces(images)

        print("response", response)

        return response
    except Exception as e:
        print(f"Error detecting faces: {e}")
        raise HTTPException(status_code=500, detail=f"Error detecting faces: {e}")
