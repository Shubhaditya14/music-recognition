from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.core.security import get_current_user_id
from app.db import models

router = APIRouter()

@router.get("/")
def get_history(request: Request, db: Session = Depends(get_db)):
    user_id = get_current_user_id(request)

    entries = (
        db.query(models.History)
        .filter(models.History.user_id == user_id)
        .order_by(models.History.timestamp.desc())
        .limit(50)
        .all()
    )

    result = []
    for h in entries:
        result.append({
            "timestamp": h.timestamp,
            "song": {
                "id": h.song.id,
                "name": h.song.name,
                "artist": h.song.artist,
            }
        })

    return result
