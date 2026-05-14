import { useRef, useState } from "react";

export default function FakeCall() {
  const [incoming, setIncoming] =
    useState(false);

  const [answered, setAnswered] =
    useState(false);

  const audioRef = useRef(null);

  // 📞 START FAKE CALL
  const triggerFakeCall = async () => {
    try {
      setIncoming(true);

      // 🔊 PLAY RINGTONE
      audioRef.current = new Audio(
        "/ringtone.mp3"
      );

      audioRef.current.loop = true;

      await audioRef.current.play();
    } catch (err) {
      console.log(
        "Audio failed:",
        err
      );
    }
  };

  // ✅ ANSWER CALL
  const answerCall = () => {
    setAnswered(true);

    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // ❌ END CALL
  const endCall = () => {
    setIncoming(false);

    setAnswered(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <>
      {/* 📞 BUTTON */}
      {!incoming && (
        <div
          style={{
            position: "fixed",
            left: 20,
            bottom: 30,
            zIndex: 999999,
          }}
        >
          <button
            onClick={triggerFakeCall}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 22px",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow:
                "0 0 15px rgba(37,99,235,0.5)",
            }}
          >
            📞 Fake Call
          </button>
        </div>
      )}

      {/* ☎️ CALL SCREEN */}
      {incoming && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.92)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            zIndex: 9999999,
          }}
        >
          {/* 👤 CALLER */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#444",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "50px",
            }}
          >
            👩
          </div>

          <h1
            style={{
              fontSize: "42px",
              marginTop: "20px",
            }}
          >
            Mom Calling...
          </h1>

          <p
            style={{
              marginTop: "10px",
              opacity: 0.8,
            }}
          >
            Incoming call
          </p>

          {!answered ? (
            <div
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "40px",
              }}
            >
              {/* ACCEPT */}
              <button
                onClick={answerCall}
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Accept
              </button>

              {/* DECLINE */}
              <button
                onClick={endCall}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Decline
              </button>
            </div>
          ) : (
            <div
              style={{
                marginTop: "40px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                }}
              >
                “Hey beta, where are you?”
              </p>

              <p
                style={{
                  marginTop: "10px",
                  opacity: 0.8,
                }}
              >
                Call connected...
              </p>

              <button
                onClick={endCall}
                style={{
                  marginTop: "30px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "14px 24px",
                  borderRadius: "14px",
                  cursor: "pointer",
                }}
              >
                End Call
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}