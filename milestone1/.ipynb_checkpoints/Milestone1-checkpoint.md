# Milestone 1 Report  
## Smart Energy Consumption – Data Preparation Phase

---

## 1. Overview

Milestone 1 focuses on preparing the smart energy dataset for analytical and predictive tasks.  
The main aim of this phase was to transform raw time-series energy readings into a structured, clean, and analysis-ready format.

This stage establishes the foundation for advanced forecasting and machine learning in the upcoming milestone.

---

## 2. Dataset Description

Two datasets were utilized during this milestone:

### A. HomeC.xls  
A real-world smart home dataset containing appliance-level energy consumption records with timestamp information.

### B. energy_data.csv  
A structured time-series dataset representing energy usage patterns over time.

Both datasets include time-based measurements suitable for trend and statistical analysis.

---

## 3. Data Preparation Workflow

The preprocessing pipeline followed a structured sequence:

### Step 1 – Data Inspection
- Verified column names and data types
- Checked dataset dimensions
- Identified missing and duplicate records

### Step 2 – Time Conversion
- Converted timestamp column into datetime format
- Set datetime column as index for time-series operations

### Step 3 – Cleaning
- Removed duplicate entries
- Validated numerical consistency
- Ensured proper indexing

### Step 4 – Feature Engineering
- Extracted hour and month components
- Classified data into Weekend and Weekday
- Generated rolling mean values for smoothing

### Step 5 – Scaling & Splitting
- Applied MinMax normalization to numerical features
- Split dataset into training (80%) and testing (20%) sets

---

## 4. Exploratory Data Analysis

The dataset was explored using multiple analytical techniques:

- Time-series visualization of energy consumption
- Hourly aggregation analysis
- Monthly consumption trend analysis
- Appliance-wise energy comparison
- Rolling mean smoothing for noise reduction
- Correlation heatmap between numeric variables
- Polynomial regression (Degree 1, 2, and 3 comparison)
- Seasonal decomposition (Trend, Seasonal, Residual components)

---

## 5. Statistical Insights

To understand distribution and variability, the following measures were computed:

- Mean and Median
- Standard Deviation
- Skewness and Kurtosis
- Correlation coefficients
- R² evaluation for polynomial regression models

---

## 6. Tools & Libraries

The milestone implementation was carried out using:

- Python
- Pandas & NumPy
- Matplotlib & Seaborn
- Scikit-learn
- Statsmodels
- Jupyter Notebook

---

## 7. Results of Milestone 1

By the end of this milestone:

- The raw datasets were cleaned and validated.
- Time-series features were successfully engineered.
- Statistical and trend-based insights were extracted.
- The dataset was normalized and split for modeling.
- A baseline regression comparison was established.

The data is now fully prepared for predictive modeling and advanced forecasting in Milestone 2.

---