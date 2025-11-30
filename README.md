# music-recognition
A full-stack, production-grade music recognition system inspired by Shazam.
Users can upload audio samples to identify songs, view listening history, and manage accounts — all built with modern, scalable technologies.

This project demonstrates real-world backend engineering, DSP pipelines, Postgres modeling, React state management, and authentication best practices.

🚀 Features
🎤 Music Recognition

Upload or record audio via browser.

DSP pipeline:

Preprocessing

STFT spectrogram

Peak detection

Audio fingerprint hashing

Song vector embedding

Cosine similarity search

Returns:

{
  "song_id": 12,
  "name": "Blinding Lights",
  "artist": "The Weeknd",
  "score": 0.98
}

🔐 Authentication (Secure)

Login/signup using JWT HttpOnly cookies

/auth/me auto-validates session

Frontend maintains session via React Context

📜 Listening History

Auto-logged after each recognition

User can query their personal history (newest → oldest)

🧱 Fully Containerized

Backend runs in Docker

Postgres in separate container

FFmpeg installed for universal audio decoding

Hot reload enabled for local development

🎨 Modern Frontend UI

Built with:

React + TypeScript

Vite

Framer Motion animations

Glass-morphism UI

Pages:

Login / Signup

Dashboard

Recognize

History

🏗 Project Architecture
music-recognition/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── recognize.py
│   │   │   └── history.py
│   │   ├── core/
│   │   │   └── security.py
│   │   ├── db/
│   │   │   ├── models.py
│   │   │   ├── crud.py
│   │   │   ├── deps.py
│   │   │   └── session.py
│   │   ├── services/
│   │   │   ├── audio.py
│   │   │   ├── fingerprint.py
│   │   │   └── matching.py
│   │   └── main.py
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── music-recognition-frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/AuthContext.tsx
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json

🧠 How Music Recognition Works (Technical Summary)
1️⃣ Preprocessing

Converts MP3/WAV/M4A → mono 16kHz PCM

Normalizes to float32

Uses FFmpeg via pydub

samples, sr = preprocess_audio(audio_bytes)

2️⃣ STFT Spectrogram

Window size: 2048

Hop length: 512

Produces time-frequency matrix

frequencies, times, S = stft(samples)

3️⃣ Peak Detection

Identify local maxima in frequency bins

Keeps only strong, stable peaks

4️⃣ Hashing (Shazam-style)

Each peak creates pairs:

(target_freq, anchor_freq, delta_time)


Hash = integer key inserted into database.

5️⃣ Matching

For uploaded sample:

Generate hashes

Query DB for matching hash collisions

Count collisions per song

Also supports vector embeddings with cosine similarity.

🗄 Database Schema
users
Field	Type
id	int
email	string
password_hash	string
songs
Field	Type
id	int
name	string
artist	string
fingerprint	jsonb
history
Field	Type
id	int
user_id	FK
song_id	FK
timestamp	UTC
🔧 Backend Setup
1. Install Docker

https://docs.docker.com/get-docker/

2. Build and Run
cd backend
docker compose build
docker compose up


Backend is now at:

http://localhost:8000


Swagger docs:

http://localhost:8000/docs

🎨 Frontend Setup
cd music-recognition-frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🔐 Authentication Flow

Frontend calls backend with:

fetch("http://localhost:8000/auth/login", {
  method: "POST",
  credentials: "include",
});


Backend sets:

Set-Cookie: access_token=jwt...; HttpOnly; SameSite=Lax


Frontend then fetches:

GET /auth/me


If valid → user session restored.

📡 Endpoints
Auth

POST /auth/signup

POST /auth/login

GET /auth/me

Music Recognition

POST /recognize (multipart audio upload)

History

GET /history

🧪 Testing
1. Signup
POST /auth/signup
{
  "email": "test@example.com",
  "password": "hello123"
}

2. Login
POST /auth/login


Should return:

Set-Cookie: access_token=...

3. Recognition Test
POST /recognize
file: <audio_sample.mp3>

4. History
GET /history

🏗 Future Improvements

Real audio embedding model (e.g., TRILL / YAMNet)

Replace cosine search with FAISS vector index

Batch indexing for song database

Progressive Web App version

Mobile microphone optimizations

Redis caching for fingerprint lookups
