# Smart Energy Consumption Analysis – Milestone 2

## Overview
In Milestone 2 we analyze device-level energy consumption using time-series analysis techniques.

The dataset contains timestamp-based readings for appliances like fridge, AC, lights and microwave.

## Analysis Performed

### Polynomial Trend Analysis
Polynomial regression was used to capture the long-term trend of total power consumption.

### Cyclic Encoding
Hour and month features were encoded using sine and cosine transformations.

### Entropy and Volatility
Shannon entropy and rolling standard deviation were calculated to analyze randomness and fluctuation in energy usage.

### Probability Distribution
Energy consumption distribution was compared with normal, log-normal and exponential distributions.

### CUSUM Detection
CUSUM algorithm was applied to detect sudden shifts in consumption.

### Granger Causality
Granger test was used to study whether device usage influences total power consumption.

### Holt-Winters Forecasting
Triple exponential smoothing was used to capture trend and seasonality.

### Correlation Analysis
Spearman and Kendall correlations were used to analyze relationships between devices.

## Tools Used
Python  
Pandas  
NumPy  
Matplotlib  
Seaborn  
Statsmodels  
SciPy
