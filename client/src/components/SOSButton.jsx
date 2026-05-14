import { useState } from "react";

export default function SOSButton() {

  const [counting, setCounting] =
    useState(false);

  const [seconds, setSeconds] =
    useState(3);

  const startSOS = () => {

    if (counting) return;

    setCounting(true);

    let current = 3;

    setSeconds(current);

    const timer = setInterval(() => {

      current--;

      setSeconds(current);

      // ✅ FINISH
      if (current <= 0) {

        clearInterval(timer);

        navigator.geolocation.getCurrentPosition(

          (position) => {

            const lat =
              position.coords.latitude;

            const lng =
              position.coords.longitude;

            // 📱 TRUSTED PHONE
            const trustedPhone =
              localStorage.getItem(
                "trustedPhone"
              );

            // ✅ CHECK PHONE
            if (!trustedPhone) {

              alert(
                "❌ No trusted contact saved"
              );

              setCounting(false);

              setSeconds(3);

              return;
            }

            // 🚨 MESSAGE
            const message =
              `🚨 EMERGENCY ALERT!\n\nI may be in danger.\n\nMy live location:\nhttps://maps.google.com/?q=${lat},${lng}`;

            // ✅ WHATSAPP URL
            const whatsappURL =
              `https://wa.me/${trustedPhone}?text=${encodeURIComponent(message)}`;

            // 🔥 OPEN WHATSAPP
            window.open(
              whatsappURL,
              "_blank"
            );

            alert(
              "🚨 SOS SENT"
            );

            setCounting(false);

            setSeconds(3);
          },

          (error) => {

            console.log(error);

            alert(
              "❌ Location access denied"
            );

            setCounting(false);

            setSeconds(3);
          }
        );
      }

    }, 1000);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 35,
        right: 35,
        zIndex: 999999,
      }}
    >
      <button
        onClick={startSOS}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "none",
          background:
            counting
              ? "#ef4444"
              : "#b91c1c",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow:
            "0 0 30px rgba(239,68,68,0.7)",
        }}
      >
        {counting
          ? seconds
          : "🚨 SOS"}
      </button>

      {counting && (
        <div
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Sending SOS...
        </div>
      )}
    </div>
  );
}