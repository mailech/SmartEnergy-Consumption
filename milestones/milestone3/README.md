# Smart Energy Consumption Analysis - Milestone 3

## Project Overview

This project focuses on analysing smart home energy consumption using time-series forecasting and anomaly detection techniques. The dataset includes appliance-level and overall power usage recorded over time.

The objective is to preprocess the data, create time-based features, build prediction models, and analyse unusual energy usage patterns.

---

## Dataset Used

* HomeC.csv
* energy_data.csv

Note: The dataset files are not included in this repository due to large size.

---

## Workflow

### 1. Data Loading

The datasets were loaded into a pandas DataFrame for analysis.

---

### 2. Data Preprocessing

The following steps were performed:

* converted time values into datetime format
* sorted data in chronological order
* handled missing values using forward and backward filling
* set time column as index

---

### 3. Resampling

The data was converted into hourly intervals using mean aggregation.

---

### 4. Visualization

Energy consumption was plotted over time to observe trends and patterns.

---

### 5. Feature Engineering

New features were created:

* lag_1 (previous hour value)
* lag_24 (previous day same hour value)

These features help capture time dependencies.

---

### 6. Train-Test Split

The dataset was split into:

* 80% training data
* 20% testing data

---

## Models Used

### Linear Regression

Used as a baseline model for prediction.

### LSTM Model

Used for time-series forecasting to capture sequential patterns and improve accuracy.

---

## Model Training

The LSTM model was trained using scaled sequential data with defined epochs and batch size.

---

## Evaluation Metrics

* RMSE (Root Mean Squared Error)
* MAE (Mean Absolute Error)
* R² Score

---

## Results

* Linear Regression provided baseline results
* LSTM improved prediction accuracy
* Time-based patterns were captured effectively

---

## Anomaly Detection

* Z-score method for detecting abnormal values
* One-Class SVM for identifying unusual patterns

---

## Project Files

* `SmartEnergy_TimeSeries_Forecasting.ipynb`
* `README.md`

---

## Conclusion

This project demonstrates time-series forecasting using machine learning and deep learning techniques. LSTM improves prediction accuracy by learning temporal dependencies.

---

## Future Scope

* Improve accuracy using advanced models
* Deploy using Flask
* Build real-time monitoring system


