Smart Home Energy Consumption Analysis
Milestone 1 – Infosys Internship (Week 1–2)
📌 Project Overview

This project focuses on analyzing and preprocessing the Smart Home Energy Monitoring Dataset to understand energy usage patterns and prepare the data for machine learning models.

All work was performed using Google Colab with Python libraries.

📂 Project Files

Module1_DataCollection.ipynb

Module2_DataCleaning.ipynb

HomeC.csv

🔹 Module 1 – Data Collection & Understanding

Loaded and explored the dataset using Pandas

Checked data structure, missing values, and duplicates

Performed statistical analysis

Conducted Exploratory Data Analysis (EDA)

Analyzed correlations between energy features

Goal: Understand energy usage behavior across devices and environmental factors.

🔹 Module 2 – Data Cleaning & Preprocessing

Converted UNIX timestamps to datetime format

Set datetime as index (time-series processing)

Handled missing values using forward fill

Removed duplicate timestamps

Resampled data (hourly & daily)

Treated outliers using IQR method

Normalized features using MinMaxScaler

Split data into Train (70%), Validation (15%), Test (15%)

Goal: Prepare clean, structured data ready for ML models.

🛠 Tools Used

Google Colab


Outcome

Completed data understanding

Cleaned and preprocessed dataset

Prepared data for baseline and advanced machine learning model
