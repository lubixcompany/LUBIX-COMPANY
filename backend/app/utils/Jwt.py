import jwt
from datetime import datetime, timedelta
from config import config

SECRET_KEY = config.SECRET_KEY
ALGORITHM = config.ALGORITHM

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=30)
    token  = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token