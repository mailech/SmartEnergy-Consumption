"""
predict.py  —  SmartEnergy prediction functions
"""
import os
import pickle
import numpy as np
import pandas as pd

try:
    from tensorflow.keras.models import load_model
    from tensorflow.keras.layers import LSTM
except:
    from keras.models import load_model
    from keras.layers import LSTM

BASE = os.path.dirname(__file__)
MODEL_DIR = os.path.join(BASE, "models")
MODEL_PATH = os.path.join(MODEL_DIR, "lstm_model.h5")

print("Model path:", MODEL_PATH)

# Try loading model safely
try:
    model = load_model(MODEL_PATH, compile=False, custom_objects={'LSTM': LSTM})
    print("Model loaded successfully")
except Exception as e:
    print("Model loading failed:", e)
    model = None

# Load scalers and feature columns
with open(os.path.join(MODEL_DIR, "scaler_X.pkl"), "rb") as f:
    _scaler_X = pickle.load(f)

with open(os.path.join(MODEL_DIR, "scaler_y.pkl"), "rb") as f:
    _scaler_y = pickle.load(f)

with open(os.path.join(MODEL_DIR, "feature_columns.pkl"), "rb") as f:
    _feat_cols = pickle.load(f)

TIME_STEPS = 24

DEVICE_COLS = [
    "Dishwasher [kW]", "Furnace 1 [kW]", "Furnace 2 [kW]",
    "Home office [kW]", "Fridge [kW]", "Wine cellar [kW]",
    "Garage door [kW]", "Kitchen 12 [kW]", "Kitchen 14 [kW]",
    "Kitchen 38 [kW]", "Barn [kW]", "Well [kW]",
    "Microwave [kW]", "Living room [kW]",
]

MANUAL_KEY_MAP = {
    "dishwasher":   "Dishwasher [kW]",
    "furnace1":     "Furnace 1 [kW]",
    "furnace2":     "Furnace 2 [kW]",
    "homeoffice":   "Home office [kW]",
    "fridge":       "Fridge [kW]",
    "winecellar":   "Wine cellar [kW]",
    "garage":       "Garage door [kW]",
    "kitchen12":    "Kitchen 12 [kW]",
    "kitchen14":    "Kitchen 14 [kW]",
    "kitchen38":    "Kitchen 38 [kW]",
    "barn":         "Barn [kW]",
    "well":         "Well [kW]",
    "microwave":    "Microwave [kW]",
    "livingroom":   "Living room [kW]",
    "solar":        "Solar [kW]",
    "temperature":  "temperature",
    "humidity":     "humidity",
    "windspeed":    "windSpeed",
    "apparenttemp": "apparentTemperature",
    "pressure":     "pressure",
    "dewpoint":     "dewPoint",
}

def predict_from_recent(df_recent: pd.DataFrame) -> float:
    if model is None:
        return 1.25  # dummy value if model fails

    if len(df_recent) < TIME_STEPS:
        raise ValueError(f"Need at least {TIME_STEPS} rows; got {len(df_recent)}")

    df_feat = df_recent[_feat_cols].tail(TIME_STEPS).copy()
    X_scaled = _scaler_X.transform(df_feat.values)
    X_seq = X_scaled[np.newaxis, :, :]
    pred_scaled = model.predict(X_seq, verbose=0)
    pred_kw = _scaler_y.inverse_transform(pred_scaled)
    return float(pred_kw[0, 0])

def predict_from_manual(user_data: dict) -> float:
    if model is None:
        return 1.10  # dummy value

    row = {}
    for form_key, col_name in MANUAL_KEY_MAP.items():
        row[col_name] = float(user_data.get(form_key, 0) or 0)

    device_total = sum(row.get(col, 0.0) for col in DEVICE_COLS)
    row["use [kW]"] = device_total
    row["gen [kW]"] = row.get("Solar [kW]", 0.0)
    row["House overall [kW]"] = device_total

    for col in _feat_cols:
        if col not in row:
            row[col] = 0.0

    df = pd.DataFrame([row] * TIME_STEPS, columns=_feat_cols)
    X_scaled = _scaler_X.transform(df.values)
    X_seq = X_scaled[np.newaxis, :, :]
    pred_scaled = model.predict(X_seq, verbose=0)
    pred_kw = _scaler_y.inverse_transform(pred_scaled)
    return float(pred_kw[0, 0])

def get_device_summary(df: pd.DataFrame) -> dict:
    avgs = {
        col.replace(" [kW]", ""): round(df[col].mean(), 4)
        for col in DEVICE_COLS if col in df.columns
    }
    return {"available": list(avgs.keys()), "avgs": avgs}

def get_time_series(df: pd.DataFrame) -> dict:
    target = "use [kW]"
    df = df.copy()
    df.index = pd.to_datetime(df.index)

    def to_chart(resampled):
        return {
            "labels": resampled.index.strftime("%Y-%m-%d %H:%M").tolist(),
            "data": resampled.fillna(0).round(4).tolist(),
        }

    resampled = df[target]
    return {
        "hourly":  to_chart(resampled.resample("h").mean()),
        "daily":   to_chart(resampled.resample("D").mean()),
        "weekly":  to_chart(resampled.resample("W").mean()),
        "monthly": to_chart(resampled.resample("ME").mean()),
    }

def get_alerts(df: pd.DataFrame) -> list:
    alerts = []
    try:
        df = df.copy()
        df.index = pd.to_datetime(df.index)

        mean_use = df["use [kW]"].mean()
        std_use = df["use [kW]"].std()
        threshold = mean_use + 2.5 * std_use

        anomalies = df[df["use [kW]"] > threshold]
        if len(anomalies) > 0:
            top = anomalies["use [kW]"].nlargest(3)
            for ts, val in top.items():
                alerts.append({
                    "level": "danger",
                    "icon": "⚡",
                    "title": "High Consumption Spike",
                    "msg": f"{val:.3f} kW at {ts.strftime('%Y-%m-%d %H:%M')}",
                    "time": ts.strftime("%Y-%m-%d %H:%M"),
                })

        if not alerts:
            alerts.append({
                "level": "success",
                "icon": "✅",
                "title": "All Systems Normal",
                "msg": "No anomalies detected.",
                "time": "Now",
            })

    except:
        alerts.append({
            "level": "info",
            "icon": "ℹ️",
            "title": "Upload data to see alerts",
            "msg": "Upload dataset first.",
            "time": "—",
        })

    return alerts

def get_smart_suggestions(df: pd.DataFrame) -> list:
    tips = []
    tips.append({"icon":"💡","title":"LED Lighting","tip":"Use LED bulbs to save energy."})
    tips.append({"icon":"🔌","title":"Smart Power Strips","tip":"Reduce standby power consumption."})
    return tips

def get_suggestions_from_manual(user_data: dict) -> list:
    tips = []
    total = sum(float(user_data.get(k, 0) or 0) for k in [
        "dishwasher","furnace1","furnace2","homeoffice","fridge",
        "winecellar","garage","kitchen12","kitchen14","kitchen38",
        "barn","well","microwave","livingroom"
    ])

    if float(user_data.get("furnace1", 0) or 0) > 1:
        tips.append({"icon": "🌡️", "title": "Furnace Usage High",
                     "tip": "Consider lowering your thermostat by 2° to save energy."})

    if float(user_data.get("dishwasher", 0) or 0) > 0.5:
        tips.append({"icon": "🍽️", "title": "Dishwasher Tip",
                     "tip": "Run dishwasher only when fully loaded to save water and energy."})

    if float(user_data.get("fridge", 0) or 0) > 0.2:
        tips.append({"icon": "❄️", "title": "Fridge Efficiency",
                     "tip": "Keep fridge temperature between 3–5°C for optimal efficiency."})

    if total > 3:
        tips.append({"icon": "⚡", "title": "High Total Usage",
                     "tip": "Your total appliance load is high. Consider staggering usage."})

    if not tips:
        tips.append({"icon": "✅", "title": "Usage Looks Good",
                     "tip": "Your energy usage appears efficient. Keep it up!"})

    tips.append({"icon": "💡", "title": "LED Lighting",
                 "tip": "Switch to LED bulbs to reduce lighting energy by up to 80%."})

    return tips