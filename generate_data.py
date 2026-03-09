"""
Script to generate synthetic SmartHome Energy Monitoring Dataset.
This is Week 1-2 Task: Data Collection
"""
import pandas as pd
import numpy as np
import os

def generate_data():
    print("Generating synthetic energy data...")
    date_rng = pd.date_range(start='1/1/2023', end='6/30/2023', freq='h')
    df = pd.DataFrame(date_rng, columns=['timestamp'])

    df['fridge'] = np.random.randint(50, 200, size=len(date_rng)) * np.random.choice([0, 1], size=len(date_rng), p=[0.3, 0.7])

    month = df['timestamp'].dt.month
    ac_prob = np.where(month >= 4, 0.8, 0.1)
    df['ac'] = np.random.randint(1000, 2500, size=len(date_rng)) * np.random.binomial(1, ac_prob)

    hour = df['timestamp'].dt.hour
    light_prob = np.where((hour >= 18) | (hour <= 6), 0.9, 0.1)
    df['lights'] = np.random.randint(20, 100, size=len(date_rng)) * np.random.binomial(1, light_prob)

    df['microwave'] = np.random.randint(800, 1200, size=len(date_rng)) * np.random.choice([0, 1], size=len(date_rng), p=[0.9, 0.1])

    df['total_power'] = df['fridge'] + df['ac'] + df['lights'] + df['microwave']

    os.makedirs("data/raw", exist_ok=True)
    df.to_csv("data/raw/energy_data.csv", index=False)
    print("Data saved to data/raw/energy_data.csv")

if __name__ == "__main__":
    generate_data()
