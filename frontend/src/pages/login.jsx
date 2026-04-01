import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "abcd" && password === "1234") {
      setError("");
      navigate("/dashboard/predict");
    } else {
      setError("❌ Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}> Smart Energy</h1>
        <p style={styles.subtitle}>Login to continue</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleLogin}>
          Login
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
    background: "linear-gradient(135deg, #ede9fe, #fce7f3)"
  },

  card: {
    background: "rgba(255,255,255,0.9)",
    padding: "40px",
    borderRadius: "20px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  title: {
    color: "#7c3aed",
    marginBottom: "5px"
  },

  subtitle: {
    marginBottom: "20px",
    color: "#6b7280"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg,#a78bfa,#f472b6)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer"
  },

  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px"
  }
};