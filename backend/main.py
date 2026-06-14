import os
import pandas as pd
import numpy as np
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
from datetime import datetime, timedelta

# Project: Smart Energy Consumption Analysis and Prediction
# Backend: FastAPI

app = FastAPI(title="Smart Energy API", description="AI/ML Driven Energy Consumption Analysis")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data', 'processed')
RAW_DATA_DIR = os.path.join(BASE_DIR, 'data', 'raw')
MODEL_DIR = os.path.join(BASE_DIR, 'models')

# Load Data
CLEANED_DATA_PATH = os.path.join(DATA_DIR, 'cleaned_energy_data.csv')

# Global variables for models
lstm_model = None
scaler = None

def load_resources():
    global lstm_model, scaler
    try:
        model_path = os.path.join(MODEL_DIR, 'lstm_model.h5')
        scaler_path = os.path.join(MODEL_DIR, 'scaler.pkl')
        
        if os.path.exists(model_path):
            lstm_model = load_model(model_path)
            print("LSTM model loaded.")
        
        if os.path.exists(scaler_path):
            scaler = joblib.load(scaler_path)
            print("Scaler loaded.")
    except Exception as e:
        print(f"Error loading resources: {e}")

@app.on_event("startup")
async def startup_event():
    load_resources()

def get_df():
    if not os.path.exists(CLEANED_DATA_PATH):
        raise HTTPException(status_code=404, detail="Data not found. Please run preprocessing.")
    return pd.read_csv(CLEANED_DATA_PATH)

@app.get("/")
def read_root():
    return {"message": "Smart Energy Consumption API is running"}

@app.get("/api/dashboard")
def get_dashboard_data():
    df = get_df()
    # Last 168 hours (1 week)
    recent_df = df.tail(168).copy()
    
    # Calculate some stats
    total_consumption = float(recent_df['total_power'].sum())
    avg_consumption = float(recent_df['total_power'].mean())
    max_consumption = float(recent_df['total_power'].max())
    
    # Device breakdown (average)
    devices = ['fridge', 'ac', 'lights', 'microwave']
    breakdown = {dev: float(recent_df[dev].mean()) for dev in devices}
    
    return {
        "recent_data": recent_df.to_dict(orient='records'),
        "stats": {
            "total": total_consumption,
            "average": avg_consumption,
            "peak": max_consumption
        },
        "breakdown": breakdown
    }

@app.get("/api/predict")
def predict_next():
    global lstm_model, scaler
    if lstm_model is None or scaler is None:
        load_resources() # Try reloading
        if lstm_model is None or scaler is None:
            return {"error": "Model or scaler not found. Please train the model."}
    
    df = get_df()
    recent_values = df['total_power'].values[-24:] # Past 24 hours
    
    if len(recent_values) < 24:
        return {"error": "Not enough data for prediction. Need at least 24 points."}
    
    # Scaling
    scaled_data = scaler.transform(recent_values.reshape(-1, 1))
    X_input = scaled_data.reshape(1, 24, 1)
    
    # Prediction
    prediction_scaled = lstm_model.predict(X_input)
    prediction = float(scaler.inverse_transform(prediction_scaled)[0][0])
    
    # Suggestions based on prediction
    suggestion = ""
    if prediction > 2000:
        suggestion = "High energy surge predicted. Consider rescheduling high-power tasks."
    elif prediction > 1000:
        suggestion = "Moderate usage expected. Ensure smart plugs are active."
    else:
        suggestion = "Low energy period. Ideal for charging devices."

    return {
        "predicted_power": prediction,
        "suggestion": suggestion,
        "timestamp": (pd.to_datetime(df['timestamp'].iloc[-1]) + timedelta(hours=1)).isoformat()
    }

@app.get("/api/suggestions")
def get_suggestions():
    df = get_df()
    last_row = df.iloc[-1]
    last_val = last_row['total_power']
    
    tips = []
    if last_val > 2500:
        tips.append({"type": "critical", "text": "Extremely high consumption! Multiple heavy appliances might be running simultaneously."})
    elif last_val > 1500:
        tips.append({"type": "warning", "text": "Consumption is above average. Check your Air Conditioning settings."})
    
    # Check device specific
    if last_row['lights'] > 80:
        tips.append({"type": "info", "text": "Brightest hour! Consider using natural light if available."})
    if last_row['fridge'] > 150:
        tips.append({"type": "info", "text": "Fridge is working hard. Ensure it's properly closed."})
        
    if not tips:
        tips.append({"type": "success", "text": "Energy consumption is within optimal range. Eco-mode active!"})
        
    return {"suggestions": tips}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
