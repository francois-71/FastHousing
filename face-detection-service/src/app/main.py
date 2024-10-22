from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api.v1.endpoints import face_detection
import os

# initialize the FastAPI app
app = FastAPI()

# define the origins that are allowed to make requests to the app
origins = [os.getenv("HOST_ORIGIN")]

# add the CORS middleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

app.include_router(face_detection.router, prefix="/api", tags=["face_detection"])
