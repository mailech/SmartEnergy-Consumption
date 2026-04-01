from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

model = joblib.load("models/linear_regression_model.pkl")
features = joblib.load("models/features.pkl")

class InputData(BaseModel):
    fridge: float
    ac: float
    lights: float
    microwave: float

@app.post("/api/predict")
def predict(data: InputData):

    df = pd.DataFrame([{
        "fridge": data.fridge,
        "ac": data.ac,
        "lights": data.lights,
        "microwave": data.microwave
    }])

    df["total_power"] = df.sum(axis=1)

    df["hour"] = 12
    df["day"] = 1
    df["month"] = 1
    df["day_of_week"] = 1
    df["lag_1"] = df["total_power"]
    df["lag_24"] = df["total_power"]
    df["rolling_mean_24"] = df["total_power"]
    df["rolling_std_24"] = 0

    X = df[features]
    pred = model.predict(X)[0]

    return {"predicted_power": float(pred)}