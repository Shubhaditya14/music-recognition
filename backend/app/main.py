from fastapi import FastAPI
from app.api import auth
from app.db import models
from app.db.session import engine
from app.api import recognize
from app.api import history
from fastapi.middleware.cors import CORSMiddleware

# Create tables on startup (dev-friendly)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(recognize.router, prefix="/recognize", tags=["recognize"])

app.include_router(auth.router, prefix="/auth", tags=["auth"])

app.include_router(history.router, prefix="/history", tags=["history"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         # or ["http://localhost:3000"]
    allow_credentials=True,      # VERY IMPORTANT
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def home():
    return {"message": "Backend is running!"}