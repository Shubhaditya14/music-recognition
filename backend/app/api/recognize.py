from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.deps import get_db

router = APIRouter()

from app.services.fingerprint import extract_fingerprint
from app.services.matching import find_best_match

@router.post("/recognize")
async def recognize_song(file: UploadFile = File(...), db: Session = Depends(get_db)):

    audio_bytes = await file.read()

    fingerprint = extract_fingerprint(audio_bytes)
    match = find_best_match(fingerprint)

    return {
        "message": "Audio processed",
        "match": match
    }
