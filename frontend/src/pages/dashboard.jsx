import { Link, Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>⚡ Smart Energy</h2>

        <Link
          to="predict"
          style={{
            ...styles.link,
            ...(location.pathname.includes("predict") && styles.active)
          }}
        >
          📊 Prediction
        </Link>

        <Link
          to="history"
          style={{
            ...styles.link,
            ...(location.pathname.includes("history") && styles.active)
          }}
        >
          📜 History
        </Link>
      </div>

      <div style={styles.main}>
        <div style={styles.header}>
          <h1>Energy Dashboard</h1>
        </div>

        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f3e8ff, #ffe4e6)"
  },

  sidebar: {
    width: "240px",
    background: "white",
    padding: "30px 20px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  logo: {
    marginBottom: "20px",
    color: "#7c3aed"
  },

  link: {
    textDecoration: "none",
    padding: "12px",
    borderRadius: "10px",
    color: "#333",
    fontWeight: "500",
    transition: "0.3s"
  },

  active: {
    background: "linear-gradient(135deg,#a78bfa,#f472b6)",
    color: "white"
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  header: {
    background: "white",
    padding: "20px 30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },

  content: {
    padding: "30px"
  }
};