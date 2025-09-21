# ⚡ Duality Hackathon – Safety Object Detection Application

This repository contains the application layer for our Hackathon submission.  
It integrates our trained **YOLOv8 object detection model** with a **FastAPI backend**, **React frontend**, and **PocketBase** database to deliver a real-time safety monitoring system.

---

## 📂 Project Structure

```
Application-Repository-with-Trained-Model/
│── backend/          # FastAPI backend with YOLOv8 model
│── frontend/         # React frontend for uploading and viewing predictions
│── pocketbase/       # PocketBase binary + data storage
│── best.pt           # YOLOv8 trained model weights
│── README.md
```

---

## ⚡ Features

✅ Detects **7 safety objects**:

* Oxygen Tank  
* Nitrogen Tank  
* First Aid Box  
* Fire Alarm  
* Safety Switch Panel  
* Emergency Phone  
* Fire Extinguisher  

✅ Full-stack integration:

* **Backend** → REST API for inference  
* **Frontend** → Upload images & display predictions  
* **PocketBase** → Stores results (or falls back to JSON file)  

✅ Lightweight – runs on **Python 3.9 – 3.12** and **Node.js 16+**.

---

## 🛠️ Prerequisites

* Python 3.9 – 3.12  
* Node.js 16+ and npm  
* PocketBase binary (included in `/pocketbase`)  
* YOLOv8 + PyTorch:

```bash
pip install ultralytics torch torchvision torchaudio
```

> ⚠️ Python 3.13 may cause PyTorch install issues; use 3.12 or lower.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Nikhilkolasani007/Application-Repository-with-Trained-Model.git
cd Application-Repository-with-Trained-Model
```

---

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
```

* **Windows**:

```powershell
.\venv\Scripts\activate
```

* **Linux / Mac**:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend API:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

API will be available at: `http://127.0.0.1:8000`
<img width="1482" height="762" alt="image" src="https://github.com/user-attachments/assets/07c59d19-38be-43a1-a1d0-0d26d29568fa" />

**Endpoints**:

* `POST /predict` → Upload image, get detected objects  
* `GET /health` → Check backend status  

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`  
Upload an image → predictions from backend API will be displayed.

---

### 4️⃣ PocketBase Setup

```bash
cd ../pocketbase
```

* **Windows**:

```powershell
pocketbase.exe serve
```

* **Linux / Mac**:

```bash
./pocketbase serve
```

PocketBase admin: `http://127.0.0.1:8090/_/`  
Used to store detections and metadata. If PocketBase is not running → results are stored in `backend/detections.json`.

---

### 5️⃣ Model Weights

The YOLOv8 trained weights (`best.pt`) are required in the backend:

```
backend/models/best.pt
```

> If the file is large, download from Google Drive: [Insert Link Here]

---

## 📸 Screenshots & Demo

**Detection Example – Fire Extinguisher**  
![Detection Screenshot](<img width="1402" height="785" alt="image" src="https://github.com/user-attachments/assets/941ae742-cedd-4fd0-bd1e-4ac330fab324" />)  

**System Architecture**  
![Architecture Diagram](docs/architecture.png)  

*(Add screenshots from your PPT into the `docs/` folder and replace placeholders.)*

---

## 🚀 Quick Start

1. Start **backend**:

```bash
cd backend && uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

2. Start **PocketBase**:

```bash
cd pocketbase && ./pocketbase serve
```

3. Start **frontend**:

```bash
cd frontend && npm start
```

4. Open `http://localhost:3000` → upload image → see real-time predictions.

---

## 🧪 Testing API Directly

Without frontend, test backend using `curl`:

```bash
curl -X POST -F "file=@test.jpg" http://127.0.0.1:8000/predict
```

Expected response:

```json
{
  "objects": [
    {"class": "FireExtinguisher", "confidence": 0.94, "bbox": [120, 200, 80, 150]}
  ]
}
```



## 🙌 Team Notes

* Built for **HackWithHyderabad – Duality AI Hackathon**  
* Hardware: RTX 4050 Laptop GPU, 6GB VRAM  
* Optimizations: 80/20 split, data augmentation, 60 epochs, AdamW optimizer  
* Achieved **mAP50: 0.800, mAP50-95: 0.668** on validation set

