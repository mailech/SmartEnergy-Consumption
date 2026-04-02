/**
 * dashboard.js  —  SmartEnergy Dashboard
 * Handles KPI cards, time-series chart, device breakdown chart,
 * and period switching (hourly / daily / weekly / monthly).
 */

document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  loadSummary();
});

// ── Globals ──────────────────────────────────────────────
let timeChart = null;
let deviceChart = null;

// Injected by Flask via dashboard.html template variables
const TIMESERIES = window.__TIMESERIES__ || {};
const SUMMARY    = window.__SUMMARY__    || {};

// ── KPI summary cards ────────────────────────────────────
async function loadSummary() {
  try {
    const res  = await fetch("/api/summary");
    const data = await res.json();

    setEl("kpi-total",  (data.total_kwh  ?? "—") + " kWh");
    setEl("kpi-avg",    (data.avg_kw     ?? "—") + " kW");
    setEl("kpi-max",    (data.max_kw     ?? "—") + " kW");
    setEl("kpi-solar",  (data.solar_gen  ?? "—") + " kWh");
    setEl("kpi-rows",   fmtNum(data.rows ?? 0));
  } catch (_) { /* no data loaded yet */ }
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function fmtNum(n) {
  return Number(n).toLocaleString();
}

// ── Chart initialisation ─────────────────────────────────
function initCharts() {
  buildTimeChart("hourly");
  buildDeviceChart();
}

// ── Time-series chart ────────────────────────────────────
function buildTimeChart(period) {
  const ctx = document.getElementById("timeChart");
  if (!ctx) return;

  const raw    = TIMESERIES[period] || { labels: [], data: [] };
  const labels = raw.labels || [];
  const data   = raw.data   || [];

  if (timeChart) timeChart.destroy();

  timeChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label:           "Energy Use (kW)",
        data,
        borderColor:     "#00d4aa",
        backgroundColor: "rgba(0,212,170,0.08)",
        tension:         0.4,
        fill:            true,
        pointRadius:     labels.length > 200 ? 0 : 2,
        borderWidth:     2,
      }],
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      animation:           { duration: 400 },
      plugins: {
        legend: { labels: { color: "#94a3b8", font: { size: 12 } } },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.parsed.y.toFixed(3)} kW`,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color:    "#64748b",
            maxTicksLimit: 12,
            maxRotation:   45,
          },
          grid: { color: "rgba(255,255,255,0.04)" },
        },
        y: {
          ticks: { color: "#64748b", callback: v => v + " kW" },
          grid:  { color: "rgba(255,255,255,0.04)" },
        },
      },
    },
  });
}

// ── Device breakdown doughnut ────────────────────────────
async function buildDeviceChart() {
  const ctx = document.getElementById("deviceChart");
  if (!ctx) return;

  let avgs   = {};
  let labels = [];

  try {
    const res  = await fetch("/api/devices");
    const data = await res.json();
    avgs   = data.avgs   || {};
    labels = data.available || [];
  } catch (_) {
    return;
  }

  if (!labels.length) return;

  const values = labels.map(l => avgs[l] || 0);
  const COLORS  = [
    "#00d4aa","#0ea5e9","#f59e0b","#a78bfa","#ef4444",
    "#22c55e","#fb923c","#38bdf8","#e879f9","#facc15",
    "#4ade80","#f87171","#34d399","#60a5fa","#c084fc",
  ];

  if (deviceChart) deviceChart.destroy();

  deviceChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data:        values,
        backgroundColor: COLORS.slice(0, labels.length),
        borderWidth: 0,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      cutout:              "65%",
      plugins: {
        legend: {
          position: "bottom",
          labels:   { color: "#94a3b8", font: { size: 11 }, padding: 10 },
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed.toFixed(4)} kW avg`,
          },
        },
      },
    },
  });
}

// ── Period switcher ──────────────────────────────────────
function setPeriod(period) {
  // Update button active state
  document.querySelectorAll(".period-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.period === period);
  });
  buildTimeChart(period);
}

// Expose to HTML onclick
window.setPeriod = setPeriod;
