# Este archivo se encarga de cargar las variables de entorno desde el archivo .env
from dotenv import load_dotenv
import os
load_dotenv()

class config():
    URL_DATABASE = os.getenv("URL_DATABASE")
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    REFRESH_TOKEN_DAYS = int(os.getenv("REFRESH_TOKEN_DAYS"))
    GMAIL_USERNAME = os.getenv("GMAIL_USERNAME")
    GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
    URL_FRONTEND = os.getenv("URL_FRONTEND")
    MINIO_ROOT_USER = os.getenv("MINIO_ROOT_USER")
    MINIO_ROOT_PASSWORD = os.getenv("MINIO_ROOT_PASSWORD")
    ADMIN_DEFAULT = os.getenv("ADMIN_DEFAULT")
    PASSWORD_DEFAULT = os.getenv("PASSWORD_DEFAULT")
    RUN_SEED = os.getenv("RUN_SEED", "false").lower() == "true"
config = config()

