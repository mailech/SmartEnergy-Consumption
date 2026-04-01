import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function History() {
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("history")) || [];

    stored = stored.map((item, index) => ({
      ...item,
      time: item.time || `Old Entry #${index + 1}`
    }));

    setData(stored);
  }, []);

  const chartData = data.map((item, index) => ({
    name: `#${index + 1}`,
    power: item.power,
    fridge: item.fridge,
    ac: item.ac,
    lights: item.lights,
    microwave: item.microwave
  }));

  const maxUsage =
    data.length > 0
      ? data.reduce((max, curr) =>
          curr.power > max.power ? curr : max
        )
      : null;

  const getTopAppliance = (item) => {
    const devices = [
      { name: "AC", value: item.ac },
      { name: "Fridge", value: item.fridge },
      { name: "Lights", value: item.lights },
      { name: "Microwave", value: item.microwave }
    ];

    return devices.reduce((max, curr) =>
      curr.value > max.value ? curr : max
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📜 Energy Usage History</h2>

      {data.length > 0 && (
        <div style={styles.card}>
          <h3>📈 Usage Trend</h3>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="power"
                  stroke="#7c3aed"
                  strokeWidth={3}
                />

                {showDetails && (
                  <>
                    <Line dataKey="ac" stroke="#ef4444" />
                    <Line dataKey="fridge" stroke="#3b82f6" />
                    <Line dataKey="lights" stroke="#f59e0b" />
                    <Line dataKey="microwave" stroke="#10b981" />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <button
            style={styles.button}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Elaborate"}
          </button>
        </div>
      )}

      {maxUsage && (
        <div style={styles.highlight}>
          ⚡ <b>Peak Usage:</b> {maxUsage.power.toFixed(2)} W
          <br />
          🕒 <b>Time:</b> {maxUsage.time}
          <br />
          🔍 <b>Main Cause:</b>{" "}
          {getTopAppliance(maxUsage).name} (
          {getTopAppliance(maxUsage).value} W)
        </div>
      )}

      {data.length === 0 && <p>No history yet</p>}

      {data.map((item, i) => (
        <div key={i} style={styles.card}>
          <p><b>🕒 Time:</b> {item.time}</p>

          <div style={styles.grid}>
            <p>Fridge: {item.fridge}</p>
            <p>AC: {item.ac}</p>
            <p>Lights: {item.lights}</p>
            <p>Microwave: {item.microwave}</p>
          </div>

          <hr />

          <p><b>⚡ Power:</b> {item.power.toFixed(2)} W</p>
          <p><b>💰 Cost:</b> ₹ {item.cost}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#6d28d9"
  },

  card: {
    background: "white",
    padding: "20px",
    margin: "15px 0",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
  },

  highlight: {
    background: "linear-gradient(135deg,#ede9fe,#fce7f3)",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    color: "#4c1d95"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  },

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "linear-gradient(135deg,#a78bfa,#f472b6)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }
};