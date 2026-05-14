import { useState } from "react";

export default function TrustedContacts() {

  const [phone, setPhone] =
    useState(
      localStorage.getItem(
        "trustedPhone"
      ) || ""
    );

  const saveContact = () => {

    localStorage.setItem(
      "trustedPhone",
      phone
    );

    alert(
      "✅ Trusted Contact Saved"
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          background:
            "rgba(255,255,255,0.08)",
          padding: "30px",
          borderRadius: "20px",
          width: "350px",
        }}
      >
        <h1>
          👨‍👩‍👧 Trusted Contact
        </h1>

        <input
          type="text"
          placeholder="Enter WhatsApp Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "20px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          onClick={saveContact}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            background: "#22c55e",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save Contact
        </button>
      </div>
    </div>
  );
}