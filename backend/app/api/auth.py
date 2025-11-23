from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from app.db.deps import get_db
from app.db import crud
from app.core.security import hash_password, verify_password, create_access_token, get_current_user_id

router = APIRouter()


# -----------------------------
# Pydantic Schemas
# -----------------------------
class SignupRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True


# -----------------------------
# /auth/signup  (dev helper)
# -----------------------------
@router.post("/signup", response_model=UserResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    existing = crud.get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed = hash_password(payload.password)
    user = crud.create_user(db, email=payload.email, password_hash=hashed)
    return user


# -----------------------------
# /auth/login  (sets HttpOnly cookie)
# -----------------------------
@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, request.email)
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})

    response = JSONResponse({"message": "Logged in successfully"})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,        # important for localhost
        samesite="lax",
        max_age=60*60*24*7
    )

    return response

@router.get("/me", response_model=UserResponse)
def me(request: Request, db: Session = Depends(get_db)):
    user_id = get_current_user_id(request)
    user = crud.get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

