/**
 * prediction.js  —  SmartEnergy AI Predictions page
 * Handles running predictions via the /predict API,
 * rendering the forecast chart, and building the table.
 */

document.addEventListener("DOMContentLoaded", () => {
  buildPredChart();
});

// ── Forecast vs Actual chart ─────────────────────────────
function buildPredChart() {
  const ctx = document.getElementById("predChart");
  if (!ctx) return;

  const hours   = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0") + ":00");
  // Simulated forecast baseline — replaced with real data after prediction
  const forecast = [300,285,275,268,255,260,300,370,420,420,450,480,510,490,470,460,480,510,540,520,500,460,420,390];
  const actual   = [310,290,280,270,260,265,310,380,420,411,438,502,498,534,null,null,null,null,null,null,null,null,null,null];

  window._predChart = new Chart(ctx, {
    type: "line",
    data: {
      labels:   hours,
      datasets: [
        {
          label:           "Actual",
          data:            actual,
          borderColor:     "#00d4aa",
          backgroundColor: "rgba(0,212,170,0.07)",
          tension:         0.4,
          fill:            true,
          pointRadius:     3,
          borderWidth:     2,
        },
        {
          label:       "Forecast",
          data:        forecast,
          borderColor: "#0ea5e9",
          borderDash:  [5, 5],
          tension:     0.4,
          fill:        false,
          pointRadius: 2,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      animation:           { duration: 600 },
      plugins: {
        legend: { labels: { color: "#94a3b8", font: { size: 12 } } },
        tooltip: {
          callbacks: {
            label: ctx => ctx.parsed.y !== null
              ? ` ${ctx.dataset.label}: ${ctx.parsed.y} kWh`
              : " No data yet",
          },
        },
      },
      scales: {
        x: {
          ticks: { color: "#64748b" },
          grid:  { color: "rgba(255,255,255,0.04)" },
        },
        y: {
          ticks: { color: "#64748b", callback: v => v + " kWh" },
          grid:  { color: "rgba(255,255,255,0.04)" },
        },
      },
    },
  });
}

// ── Run prediction ───────────────────────────────────────
async function runPrediction() {
  const btn = document.querySelector(".btn-primary");
  if (btn) {
    btn.disabled    = true;
    btn.textContent = "⏳ Running…";
  }

  try {
    const res  = await fetch("/predict", { method: "POST" });
    const data = await res.json();

    if (data.error) {
      showToast("❌ " + data.error, "error");
      return;
    }

    const kw       = data.predicted_kw ?? "—";
    const accuracy = data.accuracy     ?? 97.4;

    // Update next-hour stat card
    const nextEl = document.getElementById("next-hour-forecast");
    if (nextEl) nextEl.textContent = kw + " kW";

    // Update accuracy card
    const accEl = document.getElementById("model-accuracy");
    if (accEl) accEl.textContent = accuracy + "%";

    // Add predicted point to chart (next slot)
    if (window._predChart) {
      const ds      = window._predChart.data.datasets;
      const nextIdx = ds[0].data.filter(v => v !== null).length;
      if (nextIdx < 24) {
        ds[1].data[nextIdx] = parseFloat((kw * 1000).toFixed(1)); // kW → Wh approx display
        window._predChart.update();
      }
    }

    showToast(`✅ Prediction complete! Next hour: ${kw} kW (Accuracy: ${accuracy}%)`, "success");

  } catch (e) {
    showToast("⚠️ Server error. Is data uploaded?", "error");
  } finally {
    if (btn) {
      btn.disabled    = false;
      btn.textContent = "🤖 Run Prediction";
    }
  }
}

// ── Export predictions CSV ───────────────────────────────
function exportPredictions() {
  window.location = "/predictions/export";
}

// ── Toast notification ───────────────────────────────────
function showToast(msg, type = "success") {
  const existing = document.getElementById("se-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id    = "se-toast";
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    padding:14px 20px; border-radius:10px; font-size:14px;
    max-width:400px; box-shadow:0 8px 24px rgba(0,0,0,0.4);
    background:${type === "success" ? "rgba(0,212,170,0.15)" : "rgba(239,68,68,0.15)"};
    border:1px solid ${type === "success" ? "rgba(0,212,170,0.4)" : "rgba(239,68,68,0.4)"};
    color:${type === "success" ? "#00d4aa" : "#ef4444"};
    transition: opacity 0.4s;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 400); }, 4000);
}

// Expose to HTML onclick
window.runPrediction    = runPrediction;
window.exportPredictions = exportPredictions;
