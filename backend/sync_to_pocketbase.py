import os, json, requests, time
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

POCKETBASE_URL = os.getenv("POCKETBASE_URL", "http://127.0.0.1:8090")
POCKETBASE_EMAIL = os.getenv("POCKETBASE_EMAIL")
POCKETBASE_PASSWORD = os.getenv("POCKETBASE_PASSWORD")
DETECTIONS_FILE = "detections.json"


# ------------------ JSON Handling ------------------
def ensure_json_file():
    """Make sure detections.json exists and is a valid JSON array"""
    if not os.path.exists(DETECTIONS_FILE):
        with open(DETECTIONS_FILE, "w") as f:
            json.dump([], f)

def load_logs():
    try:
        with open(DETECTIONS_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def save_logs(logs):
    with open(DETECTIONS_FILE, "w") as f:
        json.dump(logs, f, indent=2)


# ------------------ PocketBase Login ------------------
def login():
    """Try admin login first, then fallback to user login"""
    # Try admin login
    res = requests.post(
        f"{POCKETBASE_URL}/api/admins/auth-with-password",
        json={"identity": POCKETBASE_EMAIL, "password": POCKETBASE_PASSWORD},
    )
    if res.status_code == 200:
        token = res.json()["token"]
        print("✅ Logged into PocketBase (admin)")
        return {"Authorization": f"Bearer {token}"}

    # Try user login
    res = requests.post(
        f"{POCKETBASE_URL}/api/collections/users/auth-with-password",
        json={"identity": POCKETBASE_EMAIL, "password": POCKETBASE_PASSWORD},
    )
    if res.status_code == 200:
        token = res.json()["token"]
        print("✅ Logged into PocketBase (user)")
        return {"Authorization": f"Bearer {token}"}

    print("❌ Login failed:", res.text)
    return None


# ------------------ Sync Function ------------------
def sync():
    ensure_json_file()
    logs = load_logs()
    if not logs:
        print("ℹ️ No detections to sync")
        return

    headers = login()
    if not headers:
        return

    uploaded = []
    for det in logs:
        payload = {
            "class": det["name"],
            "confidence": det["confidence"],
            "x1": det["bbox"][0],
            "y1": det["bbox"][1],
            "x2": det["bbox"][2],
            "y2": det["bbox"][3],
            "timestamp": det.get("timestamp", ""),
        }

        try:
            res = requests.post(
                f"{POCKETBASE_URL}/api/collections/detections/records",
                json=payload,
                headers=headers,
            )
            if res.status_code == 200:
                print(f"✅ Synced: {payload['class']} ({payload['confidence']})")
                uploaded.append(det)
            else:
                print("❌ Sync failed:", res.status_code, res.text)
        except Exception as e:
            print("⚠️ Error syncing:", e)

    if uploaded:
        remaining = [log for log in logs if log not in uploaded]
        save_logs(remaining)
        print(f"🗑️ Cleared {len(uploaded)} detections from local file.")


# ------------------ Main Loop ------------------
if __name__ == "__main__":
    while True:
        sync()
        time.sleep(10)  # run every 10 seconds
