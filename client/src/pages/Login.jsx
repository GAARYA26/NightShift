import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://nightshift-server.onrender.com/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "business") {
        navigate("/business");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2>🌙 NightShift</h2>
        <p style={{ opacity: 0.7 }}>Login to continue</p>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
        />

        <button style={styles.button}>Login</button>

        <p style={{ marginTop: "10px" }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0b0f1a",
  },
  card: {
    padding: "30px",
    borderRadius: "16px",
    background: "rgba(20,24,40,0.8)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "280px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};