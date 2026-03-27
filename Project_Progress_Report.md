Project Title: Smart Home Energy Consumption Analysis
Internship Phase: Data Exploration, Preprocessing & Time-Series Analysis
1. DATA EXPLORATION (HomeC.csv)
Dataset Overview:
- 503,911 rows
- 32 features
- 28 numerical columns
- 4 object columns (time, icon, summary, cloudCover)

Key Steps Performed:
- Loaded dataset using pandas
- Checked null values and data types
- Converted UNIX time column to datetime
- Removed invalid timestamp entries
- Set timestamp as index
- Sorted data chronologically

Descriptive Statistics:
- Mean overall power usage: 0.8589 kW
- Maximum usage observed: 14.71 kW
- High variability detected in consumption patterns

Zone-wise Energy Aggregation:
Appliances grouped into:
- Kitchen Zone
- Living Zone
- Heating Zone
- Utility Zone

Energy Contribution:
- Heating: ~42%
- Living: ~21%
- Kitchen: ~21%
- Utility: ~16%

Insight:
Heating is the dominant energy-consuming zone.

2. HOURLY & ANOMALY ANALYSIS
Hourly Analysis:
- Extracted hour from timestamp
- Calculated hourly average energy usage
- Peak hour detected at 23:00
- Lowest average around early afternoon

High Energy Detection:
Used statistical threshold:
    Threshold = Mean + (2 × Std Dev)

- Identified significant number of high-usage events
- Living zone showed frequent spikes
- Utility zone showed rare but extreme peaks

Result:
Energy spikes and daily patterns clearly identified.

3. SYNTHETIC CLEAN DATA PREPROCESSING
Dataset:
- 4,321 rows
- 6 columns (timestamp, fridge, ac, lights, microwave, total_power)
- Hourly data from Jan 2023 to June 2023

Preprocessing Steps:
- Converted timestamp to datetime
- Set timestamp as index
- Verified proper time ordering

Time Series Decomposition:
Used additive model:
    Y(t) = Trend + Seasonality + Residual

- Period set to 24 (daily cycle)
- Trend, seasonal and residual components visualized
- Seasonal strength calculated: 0.00286

Observation:
Very weak seasonality detected in total_power.

4. Stationary test (ADF TEST)
 - Applied Augmented Dickey-Fuller (ADF) test on total_power.
 - ADF Statistic ≈ -2.98
 - p-value ≈ 0.0939

Interpretation:
Since p-value > 0.05, the series is non- stationary.

5. Autocorrelation Analysis (ACF & PACF)
ACF plotted to observe correlation across lags
PACF plotted to identify direct lag dependencies

Observation:
 - Correlation gradually decreases across lags
 - No strong sharp spikes indicating dominant autoregressive order
 - Confirms weak structured temporal dependency

6. Weekday VS Weekend Analysis
Weekday Average: 958.44
Weekend Average: 976.26

Observation:
Weekend consumption is slightly higher than weekdays.

7. MONTHLY TREND ANALYSIS
 - Data resampled monthly
 - Computed average monthly consumption

8. WEEKLY DISTRIBUTION (JANUARY ANALYSIS)
 - Extracted January data and then Resampled to weekly averages
 - Plotted weekly distribution

Observation:
Noticeable variation between weeks within January, indicating intra-month fluctuation rather than smooth monthly trend.

9. POLYNOMIAL TREND MODELING (JANUARY – DAILY AVERAGE)
 - To reduce hourly noise:
 - Data resampled to daily averages
 - Polynomial regression applied (Degree = 2)

Observation:
Slight upward trend across January

10. DISTRIBUTION ANALYSIS
Statistical Measures: Skewness: 0.4641 (slightly right-skewed), Kurtosis: -1.2595 (platykurtic)

Observation:
Data approximately symmetric

11. FREQUENCY DOMAIN ANALYSIS (FFT)
Applied Fast Fourier Transform (FFT) to detect dominant periodic components.

Result:
Dominant detected period ≈ 4321 hours

Interpretation:
No strong short-term periodic cycles detected beyond overall dataset span. Confirms weak seasonality result from decomposition.

12. MONTHLY CHANGE POINT DETECTION (CUSUM ANALYSIS)
To detect structural shifts (persistent increases or decreases) in daily average total power consumption on a monthly basis.

CUSUM Methodology:
Two cumulative sums were calculated:
 - Positive CUSUM (S_pos) → detects sustained upward shifts.
 - Negative CUSUM (S_neg) → detects sustained downward shifts.

Dynamic Thresholding:
 - Instead of fixed threshold, adaptive values were used:
 - Drift = 0.25 × standard deviation
 - Threshold = 4 × standard deviation
 - This makes detection scale-dependent and robust to variability.

Monthly Loop Analysis:
 - Data grouped month-wise.
 - CUSUM applied independently to each month.
 - Checked if S_pos or S_neg exceeded threshold.
 - Stored summary of shift detection.

Interpretation:
CUSUM revealed localized structural changes in early months but stability in later months. This confirms absence of strong long-term drift in the system.

13. GRANGER CAUSALITY ANALYSIS
To determine whether past appliance consumption contributes to predicting total power consumption.

Precondition:
The original time series was found to be non-stationary based on ADF test. To satisfy the stationarity requirement for Granger causality analysis, first-order differencing was applied to the dataset.

Interpretation:
 - AC is the strongest predictive contributor to total power consumption.
 - Microwave shows short-term predictive influence.
 - Fridge and lights do not significantly improve forecasting of total energy usage.

14. PHASE SPACE ANALYSIS
The phase space plot was constructed by plotting x(t) against x(t+1) to examine the underlying dynamics of the time series.

Observation:
The plot appears scattered without a clearly defined attractor structure. 
This suggests that the system does not exhibit strong deterministic low-dimensional dynamics based on the visuals. 

15. LYAPUNOV EXPONENT ESTIMATION
The Lyapunov exponent was estimated to evaluate the sensitivity of the system to initial conditions.

Observation:
The computed Lyapunov exponent is negative (approximately -1.63), indicating that nearby trajectories converge over time.
This suggests that the system is stable and does not exhibit chaotic behavior, with low sensitivity to initial conditions.

16. CROSS SPECTRAL DENSITY ANALYSIS
Cross Spectral Density (CSD) analysis was performed to examine the frequency-domain relationship between individual appliance consumption and total power usage.

Observation:
The CSD plots were generated to visualize shared frequency components between signals. 

17. CORRELATION HEATMAP ANALYSIS
A correlation heatmap was generated to analyze linear relationships between appliance-level features.

Observation:
The correlations between features were generally not close to ±1, indicating the absence of extremely strong linear relationships. 
This suggests that the features are not highly redundant, although moderate correlations may still exist.

18. MULTICOLLINEARITY CHECK USING VIF
Variance Inflation Factor (VIF) analysis was conducted to detect multicollinearity among input features.

Observation:
All VIF values were close to 1 (below 5), indicating that multicollinearity is minimal and the features can be reliably used for modeling without significant redundancy.

19. MUTUAL INFORMATION ANALYSIS
Mutual Information (MI) analysis was used to measure the dependency between individual appliances and total power consumption, capturing both linear and nonlinear relationships.

Observation:
Among all appliances, the AC exhibited the highest mutual information with total power, indicating it has the strongest influence on overall energy consumption.
Other appliances showed comparatively lower dependency.

20. EXPONENTIALLY WEIGHTED MOVING AVERAGE(EWMA)
Exponentially Weighted Moving Average (EWMA) smoothing was applied to the total power time series to reduce noise and enhance trend visibility.

Observation:
EWMA smoothing reduces short-term fluctuations and highlights the underlying trend more clearly.

21. TIME-SERIES COMPLEXITY & ANOMALY DETECTION 
 21.1 Shannon Entropy
Shannon Entropy measures randomness in the time series.

Observation & Interpretation:
Computed by converting data into a probability distribution.
Obtained value ≈ 3.52.
Indicates moderate randomness in energy consumption.
Suggests presence of both structure and variability.

 21.2 Hurst Exponent (R/S Analysis)
Measures long-term memory of the time series.

Observation & Interpretation:
Computed using Rescaled Range (R/S) method.
Obtained value ≈ 0.86 (> 0.5).
Indicates strong persistence (trend-following behavior).
High/low consumption tends to continue over time.

 21.3 Cumulative Deviation Plot
Shows cumulative deviation from mean over time.

Observation & Interpretation:
Plot exhibits a smooth V-shaped structure.
Indicates presence of long-term trends.
Supports the high Hurst exponent result and also, suggests data is not purely random.

 21.4 One-Class SVM (Anomaly Detection)
Used for boundary-based anomaly detection.

Observation & Interpretation:
Trained only on normal data patterns.
Detects points outside boundary as anomalies.
Artificial anomalies (~2%) were introduced for testing.
Model successfully identifies abnormal energy usage.

 21.5 Model Evaluation
Recall = 1.0 → all anomalies detected.
Precision ≈ 0.44 → some false positives present.
F1 Score ≈ 0.61 → moderate balance.
AUC = 1.0 → strong separability of classes.

 21.6 Hyperparameter Tuning
Parameters tuned: nu and gamma.
Tested multiple combinations.
Best parameters:
nu = 0.01
gamma = 0.01
Best F1 Score ≈ 0.96.
Tuning significantly improved anomaly detection performance.
