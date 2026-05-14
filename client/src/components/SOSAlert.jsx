import { useEffect, useState } from "react";

export default function SafetyCheckin() {
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      alert("⚠️ Safety check-in missed!");

      // trigger SOS here later
    }
  }, [seconds]);

  return (
    <div>
      <h2>Safety Check-In</h2>
      <p>
        Confirm safety in: {seconds} seconds
      </p>

      <button onClick={() => setSeconds(300)}>
        I'm Safe ✅
      </button>
    </div>
  );
}