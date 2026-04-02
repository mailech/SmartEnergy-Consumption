/**
 * charts.js  —  SmartEnergy shared chart utilities
 * Shared helpers used across dashboard, predictions, and reports pages.
 */

// ── Global Chart.js defaults ─────────────────────────────
if (typeof Chart !== "undefined") {
  Chart.defaults.color            = "#94a3b8";
  Chart.defaults.font.family      = "'DM Sans', sans-serif";
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
}

// ── Color palette ────────────────────────────────────────
const SE_COLORS = {
  green:  "#00d4aa",
  blue:   "#0ea5e9",
  amber:  "#f59e0b",
  purple: "#a78bfa",
  red:    "#ef4444",
  muted:  "#64748b",
  greenBg:  "rgba(0,212,170,0.08)",
  blueBg:   "rgba(14,165,233,0.08)",
  amberBg:  "rgba(245,158,11,0.08)",
};

// ── Common chart options factory ─────────────────────────
function seLineOptions({ yLabel = "kW", maxTicks = 12 } = {}) {
  return {
    responsive:          true,
    maintainAspectRatio: false,
    animation:           { duration: 400 },
    plugins: {
      legend: { labels: { color: "#94a3b8", font: { size: 12 } } },
    },
    scales: {
      x: {
        ticks: { color: SE_COLORS.muted, maxTicksLimit: maxTicks, maxRotation: 45 },
        grid:  { color: "rgba(255,255,255,0.04)" },
      },
      y: {
        ticks: { color: SE_COLORS.muted, callback: v => v + " " + yLabel },
        grid:  { color: "rgba(255,255,255,0.04)" },
      },
    },
  };
}

function seBarOptions({ yLabel = "kWh" } = {}) {
  return {
    responsive:          true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#94a3b8" } },
    },
    scales: {
      x: { ticks: { color: SE_COLORS.muted }, grid: { color: "rgba(255,255,255,0.04)" } },
      y: {
        ticks: { color: SE_COLORS.muted, callback: v => v.toLocaleString() + " " + yLabel },
        grid:  { color: "rgba(255,255,255,0.04)" },
      },
    },
  };
}

function seDoughnutOptions({ position = "bottom" } = {}) {
  return {
    responsive:          true,
    maintainAspectRatio: false,
    cutout:              "65%",
    plugins: {
      legend: {
        position,
        labels: { color: "#94a3b8", font: { size: 11 }, padding: 10 },
      },
    },
  };
}

// ── Mini sparkline ───────────────────────────────────────
/**
 * Render a tiny inline sparkline into a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {number[]} data
 * @param {string} color
 */
function renderSparkline(canvas, data, color = SE_COLORS.green) {
  if (!canvas || !data.length) return;
  new Chart(canvas, {
    type: "line",
    data: {
      labels:   data.map((_, i) => i),
      datasets: [{
        data,
        borderColor:     color,
        backgroundColor: color.replace(")", ",0.15)").replace("rgb", "rgba"),
        tension:         0.4,
        fill:            true,
        pointRadius:     0,
        borderWidth:     1.5,
      }],
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      animation:           false,
      plugins:             { legend: { display: false }, tooltip: { enabled: false } },
      scales:              { x: { display: false }, y: { display: false } },
    },
  });
}

// ── Anomaly highlight plugin ─────────────────────────────
/**
 * Returns a Chart.js dataset for anomaly scatter points.
 * @param {number[]} fullData  - the full y-value array
 * @param {number} threshold   - z-score threshold (default 2.5)
 */
function anomalyDataset(fullData, threshold = 2.5) {
  const mean  = fullData.reduce((a, b) => a + b, 0) / fullData.length;
  const std   = Math.sqrt(fullData.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) / fullData.length);
  const points = fullData.map((v, i) =>
    Math.abs((v - mean) / (std || 1)) > threshold ? { x: i, y: v } : null
  ).filter(Boolean);

  return {
    label:           "Anomaly",
    data:            points,
    type:            "scatter",
    backgroundColor: SE_COLORS.red,
    pointRadius:     6,
    pointStyle:      "triangle",
    showLine:        false,
  };
}

// ── Number formatting helpers ────────────────────────────
function fmtKwh(val)  { return Number(val).toFixed(2) + " kWh"; }
function fmtKw(val)   { return Number(val).toFixed(3) + " kW";  }
function fmtPct(val)  { return (val >= 0 ? "+" : "") + Number(val).toFixed(1) + "%"; }
function fmtInr(val)  { return "₹" + Number(val).toLocaleString("en-IN"); }

// ── Exports (available globally) ─────────────────────────
window.SE_COLORS       = SE_COLORS;
window.seLineOptions   = seLineOptions;
window.seBarOptions    = seBarOptions;
window.seDoughnutOptions = seDoughnutOptions;
window.renderSparkline = renderSparkline;
window.anomalyDataset  = anomalyDataset;
window.fmtKwh = fmtKwh;
window.fmtKw  = fmtKw;
window.fmtPct = fmtPct;
window.fmtInr = fmtInr;
