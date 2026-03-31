import streamlit as st
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

st.title("Smart Energy Consumption Dashboard")

# Load data
df = pd.read_csv("data/energy_data.csv")

df['timestamp'] = pd.to_datetime(df['timestamp'])
df.set_index('timestamp', inplace=True)

# Show dataset
st.subheader("Dataset Preview")
st.write(df.head())

# Plot energy consumption
st.subheader("Total Energy Over Time")
st.line_chart(df['total_power'])

# Feature Engineering
df['hour'] = df.index.hour
df['day'] = df.index.day
df['month'] = df.index.month

# Model
features = ['fridge','ac','lights','microwave','hour','day','month']
X = df[features]
y = df['total_power']

model = LinearRegression()
model.fit(X, y)

# User input
st.subheader("Predict Energy Consumption")

fridge = st.slider("Fridge", 0, 200)
ac = st.slider("AC", 0, 2500)
lights = st.slider("Lights", 0, 100)
microwave = st.slider("Microwave", 0, 1200)
hour = st.slider("Hour", 0, 23)
day = st.slider("Day", 1, 31)
month = st.slider("Month", 1, 12)

input_data = np.array([[fridge, ac, lights, microwave, hour, day, month]])

prediction = model.predict(input_data)

st.success(f"Predicted Energy Consumption: {prediction[0]:.2f} Watts")