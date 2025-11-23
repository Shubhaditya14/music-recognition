from sqlalchemy.orm import Session
from . import models
from datetime import datetime
from sqlalchemy import asc, desc


# -----------------------------
# USER CRUD
# -----------------------------
def create_user(db: Session, email: str, password_hash: str):
    user = models.User(email=email, password_hash=password_hash)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


# -----------------------------
# SONG CRUD
# -----------------------------
def create_song(db: Session, name: str, artist: str, fingerprint: dict):
    song = models.Song(name=name, artist=artist, fingerprint=fingerprint)
    db.add(song)
    db.commit()
    db.refresh(song)
    return song


def get_song(db: Session, song_id: int):
    return db.query(models.Song).filter(models.Song.id == song_id).first()


def get_all_songs(db: Session):
    return db.query(models.Song).all()


# -----------------------------
# HISTORY CRUD
# -----------------------------
def add_history(db: Session, user_id: int, song_id: int):
    history = models.History(
        user_id=user_id,
        song_id=song_id,
        timestamp=datetime.utcnow()
    )
    db.add(history)
    db.commit()
    db.refresh(history)
    return history


def get_history_for_user(db: Session, user_id: int):
    return (
        db.query(models.History)
        .filter(models.History.user_id == user_id)
        .order_by(models.History.timestamp.desc())
        .all()
    )