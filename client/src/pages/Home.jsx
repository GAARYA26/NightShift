import { useEffect, useState } from "react";
import Map from "../components/Map";
import SOSPanel from "../components/SOSPanel";
import { useSocket } from "../context/SocketContext";
import axios from "axios";
import SOSButton from "../components/SOSButton";
import FakeCall from "../components/FakeCall";
import LiveServices from "../components/LiveServices";

export default function Home() {
  const socket = useSocket();

  const [sosList, setSosList] = useState([]);

  // 🚨 SOCKET EVENTS
  useEffect(() => {
    if (!socket) return;

    // NEW SOS
    socket.on("newSOS", (data) => {
      console.log("NEW SOS:", data);

      setSosList((prev) => [...prev, data]);
    });

    // SOS ACCEPTED
    socket.on("sosAccepted", (updated) => {
      console.log("SOS ACCEPTED:", updated);

      setSosList((prev) =>
        prev.map((s) =>
          s._id === updated._id ? updated : s
        )
      );
    });

    return () => {
      socket.off("newSOS");
      socket.off("sosAccepted");
    };
  }, [socket]);

  // 🚀 ACCEPT SOS
  const handleAccept = async (sos) => {
    try {
      await axios.post(
        `https://nightshift-server.onrender.com/api/sos/accept/${sos._id}`,
        {
          acceptedBy: "Responder",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🗺️ MAP */}
      <div
        style={{
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      > <LiveServices />
        <Map />
        
      </div>

      {/* 🚨 SOS BUTTON */}
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999999,
          pointerEvents: "auto",
        }}
      >
        <SOSButton />
      </div>

      {/* 📋 SOS PANEL */}
      <div
        style={{
          position: "fixed",
          right: "20px",
          top: "80px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          zIndex: 999999,
        }}
      >
        {sosList.map((sos) => (
          <div
            key={sos._id}
            style={{
              background: "white",
              padding: "16px",
              borderRadius: "16px",
              minWidth: "240px",
              boxShadow:
                "0 0 20px rgba(0,0,0,0.3)",
            }}
          >
            <h3
              style={{
                marginBottom: "8px",
              }}
            >
              🚨 SOS Alert
            </h3>

            <p>
              Status:
              <strong>
                {" "}
                {sos.status}
              </strong>
            </p>

            {sos.status !== "accepted" && (
              <button
                onClick={() =>
                  handleAccept(sos)
                }
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Accept Emergency
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 🚨 LIVE SOS PANEL */}
      <SOSPanel />
      <FakeCall />
    </div>
  );
}