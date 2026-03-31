import os
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

# Project: Smart Energy Consumption Analysis and Prediction
# Training Script: Data Gen -> Preprocessing -> Training

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DATA_DIR = os.path.join(BASE_DIR, 'data', 'raw')
PROCESSED_DATA_DIR = os.path.join(BASE_DIR, 'data', 'processed')
MODEL_DIR = os.path.join(BASE_DIR, 'models')

# Make sure directories exist
for d in [RAW_DATA_DIR, PROCESSED_DATA_DIR, MODEL_DIR]:
    os.makedirs(d, exist_ok=True)

RAW_DATA_PATH = os.path.join(RAW_DATA_DIR, 'energy_data.csv')
CLEANED_DATA_PATH = os.path.join(PROCESSED_DATA_DIR, 'cleaned_energy_data.csv')
MODEL_PATH = os.path.join(MODEL_DIR, 'lstm_model.h5')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')

def generate_data():
    print("--- Generating synthetic energy data ---")
    date_rng = pd.date_range(start='10/1/2023', end='3/30/2026', freq='H') # Updated date range
    df = pd.DataFrame(date_rng, columns=['timestamp'])
    
    # Fridge: Cyclic pattern (on/off)
    df['fridge'] = np.random.randint(50, 150, size=len(date_rng)) * np.random.choice([0.1, 1], size=len(date_rng), p=[0.4, 0.6])
    
    # AC: Seasonality
    month = df['timestamp'].dt.month
    ac_prob = np.where((month >= 4) & (month <= 8), 0.9, 0.2)
    df['ac'] = np.random.randint(1200, 2400, size=len(date_rng)) * np.random.binomial(1, ac_prob)
    
    # Lights: Night pattern
    hour = df['timestamp'].dt.hour
    light_prob = np.where((hour >= 18) | (hour <= 6), 0.95, 0.05)
    df['lights'] = np.random.randint(30, 120, size=len(date_rng)) * np.random.binomial(1, light_prob)
    
    # Microwave: Occasional
    df['microwave'] = np.random.randint(900, 1400, size=len(date_rng)) * np.random.choice([0, 1], size=len(date_rng), p=[0.92, 0.08])
    
    # Total power (with some noise)
    df['total_power'] = (df['fridge'] + df['ac'] + df['lights'] + df['microwave']) + np.random.randint(20, 100, size=len(date_rng))
    df['total_power'] = df['total_power'].astype(int)
    
    df.to_csv(RAW_DATA_PATH, index=False)
    print(f"File saved to: {RAW_DATA_PATH}")
    return df

def preprocess_data(df):
    print("--- Preprocessing data ---")
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df.fillna(method='ffill', inplace=True)
    df.drop_duplicates(inplace=True)
    df.to_csv(CLEANED_DATA_PATH, index=False)
    print(f"Cleaned data saved to: {CLEANED_DATA_PATH}")
    return df

def create_sequences(data, seq_length):
    xs, ys = [], []
    for i in range(len(data) - seq_length):
        x = data[i : (i + seq_length)]
        y = data[i + seq_length]
        xs.append(x)
        ys.append(y)
    return np.array(xs), np.array(ys)

def train_lstm(df):
    print("--- Training LSTM model ---")
    data = df.filter(['total_power']).values
    
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)
    joblib.dump(scaler, SCALER_PATH)
    print(f"Scaler saved to: {SCALER_PATH}")
    
    seq_length = 24
    X, y = create_sequences(scaled_data, seq_length)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))
    
    train_size = int(len(X) * 0.9)
    train_X, train_y = X[:train_size], y[:train_size]
    test_X, test_y = X[train_size:], y[train_size:]
    
    model = Sequential([
        LSTM(64, return_sequences=True, input_shape=(seq_length, 1)),
        Dropout(0.2),
        LSTM(64, return_sequences=False),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dense(1)
    ])
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    print("Starting training (5 epochs)...")
    model.fit(train_X, train_y, batch_size=32, epochs=5, verbose=1, validation_split=0.1)
    
    model.save(MODEL_PATH)
    print(f"Model saved to: {MODEL_PATH}")
    
    # Simple Eval
    preds = model.predict(test_X)
    preds = scaler.inverse_transform(preds)
    actual = scaler.inverse_transform(test_y.reshape(-1, 1))
    rmse = np.sqrt(mean_squared_error(actual, preds))
    print(f"RMSE: {rmse}")

if __name__ == "__main__":
    df = generate_data()
    df = preprocess_data(df)
    train_lstm(df)
