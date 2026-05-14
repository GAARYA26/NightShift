export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{
      background: "#111",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      color: "white"
    }}>
      <h3>NightShift 🌙</h3>

      {user ? (
        <div>
          Hi, {user.name} 👋
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </div>
      ) : (
        <a href="/login">Login</a>
      )}
    </div>
  );
}