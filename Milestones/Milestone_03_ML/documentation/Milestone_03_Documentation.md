Milestone 3 – Energy Consumption Analysis and Prediction
1. Introduction

In Milestone 3, I performed time-series analysis, energy consumption prediction, and anomaly detection on the smart home energy dataset. The goal of this milestone is to analyze energy usage patterns, identify trends, predict future energy consumption, and detect unusual energy usage.

2. Data Cleaning

The dataset contained a time column in UNIX timestamp format. The time column was converted into datetime format and set as the index. The data was sorted by time, duplicate records were removed, and missing values were handled using forward fill and backward fill methods.

Steps performed:
Converted time column to datetime
Set time as index
Sorted data by time
Removed duplicates
Filled missing values
This made the dataset ready for time-series analysis.

3. Resampling

The dataset contained high-frequency data (seconds/minutes). To analyze the data properly, it was resampled into hourly data using mean values.
Resampling helps in:
Reducing noise
Understanding hourly trends
Making time-series analysis easier

4. Peak vs Off-Peak Analysis

Peak and off-peak energy consumption were calculated to understand when energy usage is highest and lowest
Peak hours: 6 PM to 10 PM
Off-peak hours: 12 AM to 6 AM
This helps in understanding energy usage patterns and load distribution.

5. Rolling Mean (Trend Analysis)

A 24-hour rolling mean was calculated to observe the trend in energy consumption.

Rolling mean helps to:
Smooth short-term fluctuations
Show long-term trends
Understand daily energy patterns
The rolling mean represents the average energy consumption over the past 24 hours.

6. Energy Consumption Prediction (Linear Regression)

A Linear Regression model was built to predict total energy consumption using weather and time features such as:
Temperature
Humidity
Wind speed
Hour
Day
Month

The model was trained and tested, and predictions were compared with actual values using graphs.
Model performance was evaluated using RMSE (Root Mean Squared Error).

7. Residual Analysis

Residual analysis was performed to evaluate model performance.
Residual = Actual − Predicted
Residual plots help in understanding whether the model is performing well or not. If residuals are randomly distributed around zero, the model is good.

8. Time-Series Forecasting (Lag Model)

Time-series forecasting was performed using lag features. Lag features are previous time-step values used to predict future values.

Lag features used:
Lag 1 (previous hour)
Lag 2 (2 hours before)
Lag 3 (3 hours before)
Lag 24 (previous day same hour)
These lag values were used to predict future energy consumption.

9. Anomaly Detection

Anomaly detection was performed to identify unusual energy consumption patterns.
Two methods were used:
Z-Score Method (Statistical Method)
One-Class SVM (Machine Learning Method)
Anomalies represent abnormal or unusual energy usage.

10. Conclusion

In Milestone 3, we performed time-series analysis, trend analysis, energy consumption prediction, forecasting, and anomaly detection on the smart home energy dataset.
I analyzed peak energy usage, daily trends using rolling mean, predicted energy consumption using Linear Regression, forecasted future consumption using lag features, and detected anomalies using statistical and machine learning methods.
This milestone helped in understanding energy usage patterns and predicting future energy consumption.

11. Tools and Technologies Used
Python
Pandas
NumPy
Matplotlib
Seaborn
Scikit-learn


12. Summary of Work

Task	Method Used
Data Cleaning	Pandas
Resampling	Time-series
Peak Analysis	Time-based
Rolling Mean	Trend Analysis
Prediction	Linear Regression
Forecasting	Lag Features
Anomaly Detection	Z-score, One-Class SVM
