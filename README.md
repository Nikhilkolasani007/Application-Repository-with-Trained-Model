# 🚀 Duality Hackathon – Safety Object Detection Application

This repository contains the **application layer** for our Hackathon submission.  
It integrates our trained YOLOv8 object detection model with a **backend (Flask)**, **frontend (React)**, and **PocketBase database** to deliver a real-time safety monitoring system.

---

## 📂 Project Structure


application/
├── backend/         # Flask backend (REST API for predictions)
├── frontend/        # React frontend (UI for uploading images / viewing results)
├── pocketbase/      # PocketBase database (stores metadata / logs)
├── runs/            # (optional) YOLO runs directory (ignored by git)
└── README.md        # You are here

````


bash
  pip install ultralytics torch torchvision torchaudio
````

---

## ⚡ Features

- Detects **7 safety objects**:
  - Oxygen Tank  
  - Nitrogen Tank  
  - First Aid Box  
  - Fire Alarm  
  - Safety Switch Panel  
  - Emergency Phone  
  - Fire Extinguisher  

- Full-stack integration:
  - Backend exposes REST API for inference.
  - Frontend lets users upload images and see predictions.
  - PocketBase stores results (or JSON fallback if PocketBase fails).

- Lightweight, runs on any system with Python + Node.js installed.

---

## 🛠️ Prerequisites

- Python **3.9+** (tested with 3.13)  
- Node.js **16+** and npm  
- [PocketBase](https://pocketbase.io/) binary (included in `/pocketbase`)  
- YOLOv8 + PyTorch installed:  
  ```bash
  pip install ultralytics torch torchvision torchaudio
---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/duality-hackathon-application.git
cd duality-hackathon-application
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Run backend (Flask API):

```bash
python app.py
```

* API will start on: `http://127.0.0.1:5000`
* Endpoints:

  * `POST /predict` → Upload image, get detected objects.
  * `GET /health` → Check backend status.

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

* Runs on: `http://localhost:3000`
* Upload an image → predictions from backend API will be displayed.

---

### 4. PocketBase Setup

```bash
cd ../pocketbase
./pocketbase serve
```

* PocketBase runs on: `http://127.0.0.1:8090`
* Used to store detections and metadata.
* If PocketBase is not running → results are stored in a JSON file (`backend/data.json`).

---

### 5. Model Weights

* The YOLOv8 trained weights (`best.pt`) are required in the backend.
* Place them here:

```
backend/models/best.pt
```

* If file is too large, download from Google Drive:
  👉 [Google Drive Link](https://drive.google.com/yourlink)

---

## ▶️ Running the Full App

Open **3 terminals**:

1. Run **backend** (Flask):

   ```bash
   cd backend && python app.py
   ```

2. Run **frontend** (React):

   ```bash
   cd frontend && npm start
   ```

3. Run **PocketBase** (database):

   ```bash
   cd pocketbase && ./pocketbase serve
   ```

Now open: [http://localhost:3000](http://localhost:3000) 🎉

---

## 📊 Example Workflow

1. Upload an image of a safety object.
2. Backend runs YOLOv8 → detects which of 7 objects is present.
3. Result returned to frontend + stored in PocketBase/JSON.
4. User sees prediction on the UI with bounding boxes.

---

## 🧪 Testing API Directly

You can test backend without frontend using `curl`:

```bash
curl -X POST -F "file=@test.jpg" http://127.0.0.1:5000/predict
```

Response:

```json
{
  "objects": [
    {"class": "FireExtinguisher", "confidence": 0.94, "bbox": [120, 200, 80, 150]}
  ]
}
```

---

## 📦 Deployment

* Can be containerized with **Docker** (optional).
* Backend and frontend can be deployed on **Heroku, Vercel, or Render**.
* PocketBase can run as a binary or Docker service.

---

## 📎 Related Repositories

* 🔗 **Model Training Repo:** [duality-hackathon-model](https://github.com/YOUR_USERNAME/duality-hackathon-model)
* 🔗 **Application Repo (this):** [duality-hackathon-application](https://github.com/YOUR_USERNAME/duality-hackathon-application)
* 🔗 **Full Artifacts (\~12GB) Google Drive:** [Download Here](https://drive.google.com/yourlink)

---

## 📄 Hackathon Deliverables

* **PPT:** [View Presentation](https://drive.google.com/yourlink)
* **Final Report (PDF):** [Download Report](https://drive.google.com/yourlink)

---

## 🙌 Team Notes

* Built during **HackWithHyderabad – Duality AI Hackathon**.
* Hardware: RTX 4050 Laptop GPU, 6GB VRAM.
* Optimizations: 80/20 split, data augmentation, 60 epochs, AdamW optimizer.
* Achieved **mAP50: 0.800, mAP50-95: 0.668** on validation set.

```

---

Do you also want me to add **placeholders for screenshots** (like `![UI Screenshot](docs/ui.png)`) so you can paste your PPT images directly into the README? That makes it more visually appealing to judges.
```
