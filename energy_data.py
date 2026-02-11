
"""
Script to generate synthetic SmartHome Energy Monitoring Dataset.
This is Week 1-2 Task: Data Collection
"""
import pandas as pd
import numpy as np
import os

def generate_data():
    print("Generating synthetic energy data...")
    # Create date range for 6 months
    date_rng = pd.date_range(start='1/1/2023', end='6/30/2023', freq='H')
    
    # Create synthetic data
    df = pd.DataFrame(date_rng, columns=['timestamp'])
    
    # Simulate device power consumption (Watts)
    # Fridge: Cyclic pattern (on/off) + base load
    df['fridge'] = np.random.randint(50, 200, size=(len(date_rng))) * np.random.choice([0, 1], size=len(date_rng), p=[0.3, 0.7])
    
    # AC: Higher in summer (April-June), lower in winter (Jan-March)
    month = df['timestamp'].dt.month
    ac_prob = np.where(month >= 4, 0.8, 0.1) # higher probability in summer months
    df['ac'] = np.random.randint(1000, 2500, size=(len(date_rng))) * np.random.binomial(1, ac_prob)
    
    # Lights: higher at night (18:00 - 06:00)
    hour = df['timestamp'].dt.hour
    light_prob = np.where((hour >= 18) | (hour <= 6), 0.9, 0.1)
    df['lights'] = np.random.randint(20, 100, size=(len(date_rng))) * np.random.binomial(1, light_prob)
    
    # Other appliances
    df['microwave'] = np.random.randint(800, 1200, size=(len(date_rng))) * np.random.choice([0, 1], size=len(date_rng), p=[0.9, 0.1])
    
    # Total power
    df['total_power'] = df['fridge'] + df['ac'] + df['lights'] + df['microwave']
    
    data_path = os.path.join("energy_consumption_project", "data", "raw", "energy_data.csv")
    df.to_csv(data_path, index=False)
    print(f"Data saved to {data_path}")

if __name__ == "__main__":
    generate_data()
