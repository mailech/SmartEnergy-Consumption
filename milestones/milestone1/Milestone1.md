# Milestone 1 – Data Collection and Preprocessing

## 1. Project Overview

The goal of this project is to analyze and forecast device-level energy consumption in a smart home environment using machine learning techniques.
The dataset contains energy usage information for different household devices such as refrigerator, air conditioner, lights, and microwave.

The project focuses on understanding energy patterns and preparing the dataset for predictive modeling.

---

## 2. Dataset Description

The dataset used in this project is **Smart Home Energy Monitoring Dataset**.

It contains the following columns:

* **timestamp** – Date and time of energy measurement
* **fridge** – Energy consumed by refrigerator
* **ac** – Energy consumed by air conditioner
* **lights** – Energy consumed by lighting system
* **microwave** – Energy consumed by microwave
* **total_power** – Total energy consumption of all devices

Each row represents energy consumption recorded at a specific time.

---

## 3. Data Loading

The dataset was loaded using the **Pandas library**.

```python
df = pd.read_csv("energy_data.csv")
```

The dataset size and first few rows were examined to understand the structure.

---

## 4. Timestamp Conversion

The timestamp column was converted to datetime format to perform time-based analysis.

```python
df['timestamp'] = pd.to_datetime(df['timestamp'])
df.set_index('timestamp', inplace=True)
```

This allows extraction of time-related features such as hour, day, and month.

---

## 5. Feature Engineering

Time-related features were created from the timestamp to capture temporal patterns.

Extracted features:

* Hour
* Day
* Weekday
* Month

Example code:

```python
df['hour'] = df.index.hour
df['day'] = df.index.day
df['weekday'] = df.index.dayofweek
df['month'] = df.index.month
```

---

## 6. Exploratory Data Analysis

Basic analysis was performed to understand energy consumption patterns.

### Total Energy Over Time

A line plot was created to visualize how energy consumption changes over time.

### Device-Level Energy Consumption

Average energy usage for each device was calculated and visualized using a bar chart.

Devices analyzed:

* Refrigerator
* Air Conditioner
* Lights
* Microwave

---

## 7. Lag Features

Lag features were created to capture past energy usage patterns.

Two lag variables were added:

* **lag_1** → previous hour energy consumption
* **lag_24** → energy consumption from 24 hours earlier

Example:

```python
df['lag_1'] = df['total_power'].shift(1)
df['lag_24'] = df['total_power'].shift(24)
```

---

## 8. Rolling Mean Features

Rolling averages were created to smooth energy fluctuations.

Features created:

* **rolling_mean_6** → average energy over the last 6 hours
* **rolling_mean_24** → average energy over the last 24 hours

Example:

```python
df['rolling_mean_6'] = df['total_power'].rolling(window=6).mean()
df['rolling_mean_24'] = df['total_power'].rolling(window=24).mean()
```

---

## 9. Handling Missing Values

Missing values created by lag and rolling operations were removed.

```python
df = df.dropna()
```

---

## 10. Summary

In Milestone 1, the following tasks were completed:

* Dataset loading and inspection
* Timestamp conversion
* Time feature extraction
* Exploratory data analysis
* Device-level energy analysis
* Creation of lag features
* Creation of rolling mean features
* Data cleaning and preparation

The processed dataset is now ready for machine learning model development in the next milestone.
