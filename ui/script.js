// ===================== 🔴 BUBBLES =====================
function createBubbles() {
    const container = document.getElementById("bubbles");
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        let b = document.createElement("span");

        let size = Math.random() * 50 + 10;
        b.style.width = size + "px";
        b.style.height = size + "px";

        b.style.left = Math.random() * 100 + "%";

        let duration = Math.random() * 15 + 5;
        b.style.animationDuration = duration + "s";

        let opacity = Math.random() * 0.4 + 0.1;
        b.style.background = `rgba(255,0,0,${opacity})`;

        container.appendChild(b);
    }
}
createBubbles();


// ===================== 🟡 SLIDER VALUES =====================
function update(id, val) {
    let s = document.getElementById(id);
    let v = document.getElementById(val);

    if (s && v) {
        v.innerHTML = s.value;
        s.oninput = () => {
            v.innerHTML = s.value;
            updateLive();  // 🔥 live update
        };
    }
}

update("fridge","f_val");
update("ac","ac_val");
update("lights","l_val");
update("fan","fan_val");
update("microwave","m_val");


// ===================== 🔵 LIVE GRAPH (FORM PAGE) =====================
let liveChart;

function updateLive() {

    let fridge = document.getElementById("fridge");
    if (!fridge) return;

    let data = [
        +fridge.value,
        +ac.value,
        +lights.value,
        +fan.value,
        +microwave.value,
        +other_power.value || 0
    ];

    let total = data.reduce((a, b) => a + b, 0);
    let avg = total / 6;

    let totalBox = document.getElementById("liveTotal");
    let avgBox = document.getElementById("liveAvg");

    if (totalBox) totalBox.innerHTML = "Total: " + total + " W";
    if (avgBox) avgBox.innerHTML = "Average: " + avg + " W";

    let ctx = document.getElementById("liveChart");

    if (ctx) {
        if (liveChart) liveChart.destroy();

        liveChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Fridge", "AC", "Lights", "Fan", "Microwave", "Other"],
                datasets: [{
                    label: "Power (W)",
                    data: data,
                    backgroundColor: [
                        "#4caf50",
                        "#2196f3",
                        "#ff9800",
                        "#9c27b0",
                        "#f44336",
                        "#607d8b"
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}


// ===================== 🟢 SAVE + REDIRECT =====================
function saveAndShow() {

    let data = {
        fridge: +fridge.value,
        ac: +ac.value,
        lights: +lights.value,
        fan: +fan.value,
        microwave: +microwave.value,
        other: +other_power.value || 0
    };

    localStorage.setItem("energyData", JSON.stringify(data));

    window.location.href = "result.html";
}


// ===================== 🟣 RESULT PAGE =====================
window.onload = function () {

    updateLive(); // for form page

    let stored = localStorage.getItem("energyData");
    if (!stored) return;

    let d = JSON.parse(stored);

    let values = [
        d.fridge,
        d.ac,
        d.lights,
        d.fan,
        d.microwave,
        d.other
    ];

    let total = values.reduce((a, b) => a + b, 0);
    let avg = total / 6;

    let resultBox = document.getElementById("result");
    let avgBox = document.getElementById("average");

    if (resultBox)
        resultBox.innerHTML = "Total Energy: " + total + " W";

    if (avgBox)
        avgBox.innerHTML = "Average: " + avg + " W";

    let ctx = document.getElementById("chart");

    if (ctx) {
        new Chart(ctx, {
            type: "bar",   // 🔥 CHANGED HERE
            data: {
                labels: ["Fridge", "AC", "Lights", "Fan", "Microwave", "Other"],
                datasets: [{
                    label: "Energy Usage (W)",
                    data: values,
                    backgroundColor: [
                        "#4caf50",
                        "#2196f3",
                        "#ff9800",
                        "#9c27b0",
                        "#f44336",
                        "#607d8b"
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
};