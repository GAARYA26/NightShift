import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

export default function SOSPanel() {
  const socket = useSocket();

  const [sosList, setSosList] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newSOS", (data) => {
      setSosList((prev) => [...prev, data]);
    });

    socket.on("sosAccepted", (updated) => {
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

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        top: 20,
        zIndex: 4000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {sosList.map((sos) => (
        <div
          key={sos._id}
          style={{
            background: "white",
            padding: "12px",
            borderRadius: "12px",
            width: "250px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          <h3>🚨 SOS Alert</h3>

          <p>Status: {sos.status}</p>
        </div>
      ))}
    </div>
  );
}