import { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function generateTips(data) {
  const tips = [];

  if (data.ac > 1200) {
    tips.push("⚠ AC usage is high → Use fan (70–100W) → saves ~1.3 kWh");
  }
  if (data.microwave > 800) {
    tips.push("🍳 Reduce microwave usage → saves ~0.5 kWh");
  }
  if (data.lights > 150) {
    tips.push("💡 Switch to LED bulbs → saves energy");
  }
  if (data.fridge > 200) {
    tips.push("🧊 Improve fridge efficiency");
  }

  if (tips.length === 0) {
    tips.push("✅ Energy usage is efficient");
  }

  return tips;
}

export default function Predict() {
  const [input, setInput] = useState({
    fridge: 100,
    ac: 800,
    lights: 100,
    microwave: 500
  });

  const [result, setResult] = useState(null);
  const [tips, setTips] = useState([]);
  const [duration, setDuration] = useState(7);

  const rate = 6;

  const handle = (e) => {
    setInput({ ...input, [e.target.name]: Number(e.target.value) });
  };

  const predict = async () => {
    const res = await axios.post("/api/predict", input);

    const power = res.data.predicted_power;
    const cost = ((power / 1000) * rate).toFixed(2);

    const totalEnergy = ((power / 1000) * 24 * duration).toFixed(2);
    const totalCost = (totalEnergy * rate).toFixed(2);

    const entry = {
      ...input,
      power,
      cost,
      time: new Date().toLocaleString()
    };

    const old = JSON.parse(localStorage.getItem("history")) || [];
    localStorage.setItem("history", JSON.stringify([entry, ...old]));

    setResult({
      power,
      cost,
      totalEnergy,
      totalCost
    });

    setTips(generateTips(input));
  };

  const chartData = [
    { name: "Fridge", value: input.fridge },
    { name: "AC", value: input.ac },
    { name: "Lights", value: input.lights },
    { name: "Microwave", value: input.microwave }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚡ Smart Energy Prediction</h1>

      <div style={styles.layout}>
        <div style={styles.card}>
          <h3>🔧 Device Inputs</h3>

          {Object.keys(input).map((key) => (
            <div key={key} style={styles.inputGroup}>
              <label>{key.toUpperCase()}</label>
              <input
                type="number"
                name={key}
                value={input[key]}
                onChange={handle}
              />
            </div>
          ))}

          <label style={{ marginTop: "10px" }}>📅 Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={styles.select}
          >
            <option value={1}>1 Day</option>
            <option value={7}>1 Week</option>
            <option value={30}>1 Month</option>
          </select>

          <button style={styles.button} onClick={predict}>
            Predict Energy
          </button>
        </div>

        {result && (
          <div style={styles.card}>
            <h3>📊 Results</h3>

            <p><b>⚡ Power:</b> {result.power.toFixed(2)} W</p>
            <p><b>💰 Cost/hour:</b> ₹ {result.cost}</p>

            <div style={styles.calc}>
              Cost = (Power / 1000) × ₹6
            </div>

            <hr />

            <h4>🔮 Future Estimate</h4>

            <p><b>Energy:</b> {result.totalEnergy} kWh</p>
            <p><b>Total Cost:</b> ₹ {result.totalCost}</p>

            <div style={styles.calc}>
              Energy = (Power / 1000) × 24 × Days
            </div>

            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#a78bfa" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={styles.tipsBox}>
              <h4>💡 Smart Tips</h4>
              {tips.map((tip, i) => (
                <p key={i}>{tip}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1100px",
    margin: "auto"
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#6d28d9"
  },

  layout: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px"
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    marginTop: "5px"
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "linear-gradient(135deg,#a78bfa,#f472b6)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer"
  },

  calc: {
    background: "#f3e8ff",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px"
  },

  tipsBox: {
    marginTop: "15px",
    padding: "15px",
    background: "#fef3c7",
    borderRadius: "12px"
  }
};