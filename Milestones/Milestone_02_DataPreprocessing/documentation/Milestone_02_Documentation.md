
Milestone2 – Data Cleaning, Preprocessing, EDA and Time Series Modeling

1. Objective

The objective of this milestone was to clean and prepare the smart home energy dataset and then analyze it using EDA and time series techniques. After analyzing the data, a simple prediction model was built to predict energy consumption.

The main tasks performed were:

Data cleaning and preprocessing
Handling missing values and outliers
Converting timestamp into datetime format
Resampling time-series data
Creating time-based features
Exploratory Data Analysis (EDA)
Correlation analysis
Trend analysis using time-series plots
Polynomial trend modeling
Linear Regression modeling for prediction
Model evaluation using error metrics


2. Dataset Used
HomeC.csv (Real Dataset)

This is the smart home energy dataset used in the project.

The dataset contains:
Timestamp values
Appliance-level energy consumption
Total house energy usage
Weather-related data such as temperature, humidity, pressure, and wind speed

Since the dataset is large, it was stored locally and used for analysis.

3. Data Cleaning

Before doing analysis, the dataset was cleaned using the following steps:
Loaded the dataset using Pandas
Checked column names and data types
Converted timestamp into datetime format
Set timestamp column as index for time-series analysis
Removed duplicate timestamps
Selected only numeric columns for analysis
Handled missing values using forward fill and backward fill

These steps made the dataset ready for time-series analysis.

4. Outlier Detection

Energy datasets sometimes contain very high or very low values called outliers.
To detect outliers, the Z-Score method was used. Values with very high or very low Z-score were treated as outliers and removed. This helps improve data quality and model performance.

5. Data Resampling

The original dataset contains readings recorded every few seconds. This makes the dataset very large and noisy.
So, the data was resampled into:
Hourly average energy consumption
Daily average energy consumption
Weekly average energy consumption
Monthly average energy consumption
Resampling helps in reducing noise and understanding the overall trend.

6. Feature Engineering

To understand how energy usage changes with time, new features were created from the timestamp:
Hour of the day
Day of the week
Month

These features help analyze energy usage patterns at different times.

7. Exploratory Data Analysis (EDA)

EDA was performed to understand the dataset and energy usage behavior.

The following analysis was performed:
Statistical summary of the dataset
Distribution of energy consumption
Appliance-wise energy consumption
Relationship between appliances and total energy consumption

EDA helped in understanding patterns and variations in energy usage.

8. Correlation Analysis

A correlation heatmap was created to understand the relationship between appliances and total house energy consumption.
Correlation values range from -1 to +1:
+1 means strong positive relationship
0 means no relationship
-1 means negative relationship

This helped identify which appliances consume more energy.

9. Trend Analysis

Trend analysis was performed using time-series plots.
The following plots were created:
Hourly energy consumption trend
Daily energy consumption trend
Monthly energy consumption trend

These plots helped understand how energy consumption changes over time.

10. Hourly Energy Consumption Pattern

Hourly analysis was done to understand energy usage at different hours of the day.
This helped identify:
Peak energy usage hours
Low energy usage hours
It was observed that energy usage is higher during morning and evening and lower during late night.

11. Polynomial Trend Modeling

Polynomial Regression was used to understand non-linear trends in energy consumption.
Different polynomial degrees were used:
Degree 1 (Linear)
Degree 2
Degree 3
Degree 4

This helped understand whether the energy trend is straight or curved.

12. Linear Regression Modeling

Linear Regression was used to predict energy consumption.
The steps performed were:
Selected time-based features as input
Selected overall house energy as output
Split data into training and testing data
Trained Linear Regression model
Predicted energy consumption

Linear Regression helps in predicting future energy usage.

13. Actual vs Predicted Analysis

A graph was plotted to compare actual energy values and predicted energy values.
This helps understand how well the model is performing.

14. Model Evaluation

To evaluate the model, the following error metrics were calculated:
Mean Absolute Error (MAE)
Mean Squared Error (MSE)
Root Mean Squared Error (RMSE)

Lower error means better model performance.

15. Data Visualization

The following graphs were created:
Energy distribution plots
Boxplots for outlier detection
Correlation heatmap
Hourly energy consumption graph
Daily energy consumption graph
Monthly energy consumption graph
Polynomial trend graph
Actual vs Predicted graph

These graphs helped in understanding energy consumption patterns.

16. Tools Used

The following tools and libraries were used:
Python
Pandas
NumPy
Matplotlib
Seaborn
Scikit-Learn
Jupyter Notebook
VS Code

17. Conclusion

In this milestone, the smart home energy dataset was cleaned and analyzed. Missing values and outliers were handled, and the timestamp was converted into datetime format.
The dataset was resampled into hourly, daily, weekly, and monthly data to understand trends. Correlation analysis helped identify which appliances use more energy. Polynomial regression helped understand the trend shape, and Linear Regression was used to predict energy consumption.

This milestone helped in understanding energy usage patterns and building a basic prediction model.

18. Files Generated in This Milestone

The following outputs were generated:
Cleaned dataset
Resampled datasets (hourly, daily, weekly, monthly)
Correlation heatmap
Hourly energy consumption graph
Daily energy consumption graph
Monthly energy consumption graph
Polynomial trend graph
Actual vs Predicted graph
Error metrics results