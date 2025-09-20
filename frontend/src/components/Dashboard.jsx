import { useEffect, useState } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const records = await pb.collection("detections").getFullList({
        sort: "-created"
      });
      setLogs(records);
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>📊 Detection Logs</h1>
      <table style={{ margin: "auto", borderCollapse: "collapse", width: "90%" }}>
        <thead>
          <tr style={{ background: "#222", color: "#fff" }}>
            <th>Class</th>
            <th>Confidence</th>
            <th>BBox</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.class}</td>
              <td>{(log.confidence * 100).toFixed(1)}%</td>
              <td>[{log.x1.toFixed(0)}, {log.y1.toFixed(0)}, {log.x2.toFixed(0)}, {log.y2.toFixed(0)}]</td>
              <td>{new Date(log.created).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
