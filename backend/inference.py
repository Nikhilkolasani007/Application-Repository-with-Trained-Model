import os
import cv2
import numpy as np
from ultralytics import YOLO

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "best.pt")

model = YOLO(MODEL_PATH)

def run_inference(img_bytes, conf_threshold=0.5):
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = model(img)
    detections = []

    for box in results[0].boxes:
        conf = float(box.conf)
        if conf < conf_threshold:
            continue
        detections.append({
            "name": results[0].names[int(box.cls)],
            "confidence": round(conf, 3),
            "bbox": [float(x) for x in box.xyxy[0].tolist()]
        })
    return detections
