from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    HOST_ORIGIN: str = "http://localhost:3000"
    HAARCASCADE_MODEL_PATH: str = "lib/utils/open_cv_models/haarcascade_frontalface_alt2.xml"

    class Config:
        env_file = ".env"


settings = Settings()
