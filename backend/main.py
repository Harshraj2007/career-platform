from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Lets the React app (port 5173) call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Profile(BaseModel):
    degree: str
    cgpa: float
    skills: list[str]
    interest: str

profiles = []  # temporary storage in memory; we replace this with a database later

@app.get("/")
def read_root():
    return {"message": "Hello from the Career Platform API"}

@app.post("/profiles")
def create_profile(profile: Profile):
    profiles.append(profile)
    return {"id": len(profiles) - 1, "profile": profile}

@app.get("/profiles")
def list_profiles():
    return profiles