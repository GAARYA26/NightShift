export default function FilterBar({ setSelectedType }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3000,
        display: "flex",
        gap: "10px",
      }}
    >
      {["all", "food", "medical", "mechanic"].map((type) => (
        <button
          key={type}
          onClick={() => setSelectedType(type)}
          style={{
            padding: "10px 15px",
            borderRadius: "20px",
            border: "none",
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
}