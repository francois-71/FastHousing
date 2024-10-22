from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    HOST_ORIGIN: str
    HAARCASCADE_MODEL_PATH: str

    class Config:
        env_file = ".env"


settings = Settings()
