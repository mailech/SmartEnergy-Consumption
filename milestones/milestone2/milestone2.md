# SMART ENERGY CONSUMPTION – MILESTONE 2 REPORT

## 1. Introduction

In this milestone, we analyze energy consumption data over time using statistical and time-series techniques. The main objective is to understand patterns, trends, relationships, and predict future energy usage based on timestamp data.

---

## 2. Data Preprocessing

A structured dataset was created using timestamp values with hourly frequency. The dataset includes features such as fridge, AC, and total power consumption.

Basic data understanding was done using:

* df.info() to check data types and structure
* df.describe() to view statistical summary

---

## 3. Time-Based Feature Engineering

From the timestamp column, important features were extracted:

* Hour
* Date
* Month

These features help in analyzing daily, weekly, and seasonal energy consumption patterns.

---

## 4. Polynomial Trend Analysis

Polynomial regression was applied to identify trends in total power consumption using NumPy functions.

This helps in:

* Understanding long-term trends
* Smoothing noisy data

---

## 5. Average Power Consumption

Average power consumption was calculated using groupby operations such as:

df.groupby('date')['total_power'].mean()

This helps identify:

* Daily average usage
* Peak consumption periods

---

## 6. Volatility Analysis

Volatility in energy consumption was measured using:

* Standard deviation
* Rolling variance

This helps detect fluctuations and instability in energy usage.

---

## 7. Energy Consumption Distribution

The distribution of energy consumption was analyzed using histograms and density plots.

This helps understand:

* Data spread
* Skewness
* Presence of outliers

---

## 8. Probability Distribution

Energy data was analyzed using probability distribution techniques to understand the likelihood of different consumption values.

This is useful for:

* Predictive analysis
* Risk estimation

---

## 9. CUSUM Change Detection

CUSUM (Cumulative Sum) was used to detect sudden changes in energy consumption patterns.

This helps identify:

* Anomalies
* Sudden spikes or drops

---

## 10. Granger Causality Test

Granger causality was applied to check relationships between variables such as AC and total power.

This helps determine:

* Whether one variable influences another
* Cause-effect relationships

---

## 11. Holt-Winters Forecasting

The Holt-Winters method was used for forecasting future energy consumption.

It captures:

* Trend
* Seasonality

---

## 12. QQ Plot Analysis

QQ plots were used to compare the distribution of energy data with a normal distribution.

This helps check:

* Data normality
* Deviations from expected distribution

---

## 13. Correlation Analysis

### Spearman Correlation

Used to measure monotonic relationships between variables.

### Kendall Correlation

Used to measure rank-based relationships and is more robust for smaller datasets.

These methods help in understanding relationships between different energy parameters.

---

## 14. Conclusion

In this milestone, energy consumption data was analyzed using various statistical and time-series techniques. Trends, distributions, correlations, and forecasting models were explored successfully.

This analysis can help in:

* Smart energy management
* Predictive modeling
* Efficient resource utilization

---

## 15. Future Scope

* Integration with real-time IoT data
* Advanced machine learning models
* Smart energy automation systems
