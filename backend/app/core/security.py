import os
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
from fastapi import HTTPException, Request


SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")   # fallback only for dev
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days


# -----------------------------
# PASSWORD HASHING (argon2)
# -----------------------------
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# -----------------------------
# JWT CREATION
# -----------------------------
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """
    data must be like {"sub": user_id}
    we do NOT wrap it inside another JSON
    """
    to_encode = data.copy()

    expire = datetime.utcnow() + (expires_delta or timedelta(days=7))
    to_encode.update({"exp": expire})

    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token


# -----------------------------
# JWT DECODING
# -----------------------------
def decode_access_token(token: str):
    """
    Returns user_id (int) or raises error
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return int(user_id)

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")

    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# -----------------------------
# GET CURRENT USER ID
# -----------------------------
def get_current_user_id(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    return decode_access_token(token)
