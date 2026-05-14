import axios from "axios";
import { useState } from "react";

export default function BusinessDashboard() {
  const [type, setType] = useState("mechanic");

  const goLive = async () => {
    await axios.post("http://localhost:5000/api/business/heartbeat", {
      type,
      lat: 18.5204,
      lng: 73.8567,
    });
    alert("Live 🔥");
  };

  const startTracking = () => {
    let lat = 18.52;
    let lng = 73.85;

    setInterval(async () => {
      lat += 0.001;
      lng += 0.001;

      await axios.post("http://localhost:5000/api/tracking/update-location", {
        lat,
        lng,
      });
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🏪 Business Panel</h2>

        <select onChange={(e) => setType(e.target.value)} style={styles.input}>
          <option value="food">Food</option>
          <option value="medical">Medical</option>
          <option value="mechanic">Mechanic</option>
        </select>

        <button style={styles.green} onClick={goLive}>
          Go Live
        </button>

        <button style={styles.orange} onClick={startTracking}>
          Start Tracking
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: "30px",
    borderRadius: "16px",
    background: "rgba(20,24,40,0.8)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "300px",
  },
  input: { padding: "10px" },
  green: { background: "green", color: "white", padding: "10px" },
  orange: { background: "orange", color: "white", padding: "10px" },
};