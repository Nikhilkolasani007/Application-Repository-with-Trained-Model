import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./mon.css"

function Monitor() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);

  // Start webcam
  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    initCamera();
  }, []);

  // Capture frames every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      captureFrame();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const captureFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!video.videoWidth) return;

    // Set canvas size to medium (640x480)
    const targetWidth = 640;
    const targetHeight = 480;
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Draw video frame scaled to medium size
    ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

    // Send frame to backend
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {
        const res = await axios.post("http://127.0.0.1:8000/predict/", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        const newDetections = res.data.detections;
        setDetections(newDetections);

        // Draw bounding boxes + labels
        drawDetections(newDetections, ctx);
      } catch (err) {
        console.error(err);
      }
    }, "image/jpeg");
  };

  const drawDetections = (detections, ctx) => {
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";

    detections.forEach((det) => {
      const [x1, y1, x2, y2] = det.bbox;

      // Scale bbox to 640x480
      const scaleX = 640 / videoRef.current.videoWidth;
      const scaleY = 480 / videoRef.current.videoHeight;

      const bx1 = x1 * scaleX;
      const by1 = y1 * scaleY;
      const bx2 = x2 * scaleX;
      const by2 = y2 * scaleY;

      ctx.beginPath();
      ctx.rect(bx1, by1, bx2 - bx1, by2 - by1);
      ctx.stroke();

      ctx.fillText(`${det.name} ${(det.confidence * 100).toFixed(1)}%`, bx1 + 5, by1 - 5);
    });
  };

  return (
    <div 
  style={{ 
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    textAlign: "center",
    marginTop: "20px"
  }}
>
  <h1>Dauality AI Space Object Detection</h1>

  {/* Hidden video (only feeds webcam) */}
  <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />

  {/* Medium canvas */}
  <canvas 
    ref={canvasRef} 
    width={640}   // fixed width
    height={480}  // fixed height
    style={{ border: "2px solid black", marginBottom: "20px" }}
  />

  <h3>Latest Detections</h3>
  {detections.length > 0 ? (
    <table style={{ borderCollapse: "collapse", width: "80%", maxWidth: "600px" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Object</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Confidence</th>
        </tr>
      </thead>
      <tbody>
        {detections.map((det, idx) => (
          <tr key={idx}>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{det.name}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {(det.confidence * 100).toFixed(1)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No detections yet...</p>
  )}
</div>

  );
}

export default Monitor;
