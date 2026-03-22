# Smart Energy Consumption Analysis - Milestone 3

## Project Overview
This project focuses on analysing smart home energy consumption using time-series and anomaly analysis techniques. The dataset contains appliance-level power usage such as fridge, AC, lights, and microwave, along with total power consumption.

The main goal of this milestone was to build a structured pipeline for cleaning and preprocessing energy data, creating meaningful time-based features, forecasting total power consumption, and analysing unusual or irregular energy usage patterns.

## Workflow Followed

### 1. Data Loading
The dataset was loaded from a CSV file into a pandas DataFrame for analysis.

### 2. Data Cleaning and Preprocessing
The following preprocessing steps were performed:
- converted timestamps into datetime format,
- sorted the dataset chronologically,
- removed duplicate rows,
- removed duplicate timestamps,
- handled missing values using forward fill and backward fill,
- set timestamp as the time-series index.

These steps were necessary to ensure that the dataset was clean, ordered, and suitable for time-series analysis.

### 3. Resampling
The data was resampled into hourly intervals using mean aggregation.

This step was important because time-series analysis becomes more consistent and interpretable when the data is available at regular intervals.

### 4. Exploratory Visualization
The hourly total power consumption was plotted over time to observe fluctuations, spikes, and usage behaviour.

### 5. Feature Engineering
New features were created from the time-series data:
- **hour** – hour of the day
- **day** – day of the month
- **month** – month of the year
- **day_of_week** – weekday pattern
- **lag_1** – previous hour total power
- **lag_24** – previous day same-hour total power
- **rolling_mean_24** – average power over past 24 hours
- **rolling_std_24** – variation over past 24 hours

These features help capture short-term memory, daily patterns, and recent consumption trends.

### 6. Train-Test Split
The dataset was split chronologically into:
- 80% training data
- 20% testing data

Shuffling was not used because time-series forecasting must preserve temporal order.

## Forecasting Model Used

### Linear Regression
A Linear Regression model was trained to predict `total_power` using the engineered features.

### Why Linear Regression was used
Linear Regression was selected as the main forecasting model because:
- it is simple and interpretable,
- it works well as a baseline model,
- it is suitable for feature-based forecasting,
- it makes the effect of engineered features easier to understand,
- it is computationally light and easy to evaluate.

## Model Evaluation
The forecasting model was evaluated using:
- **MAE (Mean Absolute Error)**
- **RMSE (Root Mean Squared Error)**
- **R² Score**

These metrics are appropriate for predicting continuous values such as total power consumption.

In addition to numerical evaluation, actual vs predicted plots were used to visually compare model performance.

## Additional Time-Series Analysis

### 1. Rolling Mean
A 24-hour rolling mean was calculated to smooth short-term fluctuations and observe local trends in energy consumption.

### 2. Volatility
A 24-hour rolling standard deviation was calculated to measure variation in power usage over time.

### 3. Shannon Entropy
Shannon Entropy was computed from the distribution of `total_power` values.

This was used to measure the randomness or uncertainty in the energy consumption pattern:
- higher entropy indicates greater randomness,
- lower entropy indicates more structure and predictability.

### 4. Hurst Exponent
The Hurst Exponent was calculated to analyse the long-term behaviour of the time series.

Interpretation:
- **H > 0.5** indicates persistent behaviour,
- **H = 0.5** indicates random walk behaviour,
- **H < 0.5** indicates anti-persistent behaviour.

### 5. Residual Analysis
Residuals were computed as:

`Residual = Actual - Predicted`

Residual plots and histograms were used to understand forecasting errors and their distribution.

## Anomaly Detection

### 1. Z-Score Based Anomaly Detection
Anomalies were identified using the z-score of `total_power`.

This helped detect sudden abnormal spikes or drops in energy consumption.

### 2. One-Class SVM Based Anomaly Detection
A One-Class SVM model was used on appliance-level features:
- fridge
- ac
- lights
- microwave

The appliance features were first scaled and then used to learn the normal pattern of energy usage. Observations predicted as outliers were treated as anomalies.

## Note on Model Selection

Although LSTM is commonly used for sequence-based time-series forecasting, it was not implemented in this notebook. The forecasting pipeline in this work was built using Linear Regression with engineered time-based, lag-based, and rolling features.

### Why LSTM was not used
LSTM was not used in this notebook because the current analysis focused on building a simpler, more interpretable, and feature-driven forecasting pipeline. For this stage of the project, Linear Regression was sufficient to establish a baseline model for total power prediction and to study how engineered temporal features influence energy consumption.

In addition, the notebook places emphasis on:
- clean preprocessing,
- chronological time-series handling,
- feature engineering,
- baseline forecasting,
- residual analysis,
- entropy and Hurst-based interpretation,
- anomaly detection.

This made the workflow easier to implement, explain, and evaluate in a structured way before moving to a more complex deep learning model.

## Work Not Implemented in This Notebook
The following items were not implemented in the current notebook:
- LSTM-based forecasting model
- deep learning model training and tuning
- model saving/loading for LSTM
- classification-based evaluation metrics such as accuracy, precision, recall, F1-score, and ROC-AUC for a separate labelled classification task
- Random Forest classification for labelled event prediction

These can be considered as future extensions of the project if a more advanced forecasting or classification pipeline is required.

## Files in This Repository
- `notebooks/milestone3_smart_energy_analysis.ipynb` – notebook containing the full analysis
- `Milestone3.md` – project explanation and methodology

## Conclusion
This milestone established a structured and interpretable workflow for smart energy time-series analysis. The dataset was cleaned, resampled, and transformed into useful time-based and lag-based features. A Linear Regression model was used as the main forecasting model and evaluated using MAE, RMSE, and R² score.

In addition to forecasting, the notebook also explored rolling statistics, volatility, Shannon Entropy, Hurst Exponent, residual behaviour, and anomaly detection to better understand the statistical behaviour and irregular usage patterns in household energy consumption.

Overall, the work demonstrates both forecasting analysis and behavioural analysis of smart energy data in a clean and explainable way.
