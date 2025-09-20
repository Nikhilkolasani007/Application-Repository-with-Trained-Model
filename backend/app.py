import os, json
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from inference import run_inference
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DETECTIONS_FILE = "detections.json"

def load_logs():
    if not os.path.exists(DETECTIONS_FILE):
        return []
    try:
        with open(DETECTIONS_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def save_logs(logs):
    with open(DETECTIONS_FILE, "w") as f:
        json.dump(logs, f, indent=2)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    detections = run_inference(contents)

    logs = load_logs()

    for det in detections:
        det["timestamp"] = datetime.utcnow().isoformat()
        logs.append(det)

    save_logs(logs)

    return {"detections": detections}
