# Milestone 01 – Smart Home Energy Consumption Analysis

## 1. Objective

In this milestone, I worked on understanding the smart home energy consumption dataset.  
The main objective was to analyze how electricity usage varies over time and how different appliances contribute to total power consumption.

I focused on:
- Performing Exploratory Data Analysis (EDA)
- Extracting time-based features
- Aggregating data (hourly, daily, weekly, monthly)
- Performing time series decomposition
- Modeling trend using polynomial fitting

## 2. Dataset Used

### HomeC.csv (Real Dataset)
This is a real smart home dataset containing appliance-level power consumption data.  
Since the file size is greater than 100MB, it is stored locally and not pushed to GitHub.

### energy_data.csv (Synthetic Dataset)
This dataset contains:
- Timestamp
- Fridge consumption
- AC consumption
- Lights consumption
- Microwave consumption
- Total power consumption

This dataset was mainly used for time-series analysis and visualization.

## 3. Data Preprocessing

Before performing analysis, I carried out the following steps:

- Checked for missing values
- Checked for duplicate records
- Converted the timestamp column into datetime format
- Set timestamp as the index
- Verified data types using `df.info()`
- Generated statistical summary using `df.describe()`

After preprocessing, the dataset was ready for time-series analysis.

## 4. Feature Engineering

To analyze time-based behavior, I extracted:

- Hour
- Day
- Day name
- Week number
- Month
- Month name

This helped in analyzing:
- Hourly trends
- Weekday vs weekend behavior
- Monthly variation
- Seasonal patterns

## 5. Aggregation Analysis

Using Pandas resampling, I performed:

- Hourly average analysis
- Daily average analysis
- Weekly average analysis
- Monthly average analysis
- Bi-monthly comparison

Aggregation helped reduce noise and reveal larger consumption trends.

For example:
- Weekly data showed smoother patterns than hourly data.
- Monthly data showed increased AC usage during warmer months.

## 6. Exploratory Data Analysis (EDA)

I created multiple visualizations to understand energy patterns:

- Line plots for total power over time
- Bar charts for mean and standard deviation of appliances
- Correlation heatmap
- Load Duration Curve
- Hourly consumption chart
- Weekday comparison chart
- Monthly trend visualization

### Observations

- AC consumption increases significantly in later months.
- Evening hours show peak load.
- Strong correlation between AC usage and total power.
- Clear daily seasonality pattern is visible.

## 7. Time Series Decomposition

Time series decomposition i've performed using `seasonal_decompose` from the Statsmodels library.
Additive model was used:
Y(t) = Trend + Seasonality + Residual

I used:
- `period = 24`  
Because the dataset is hourly and I wanted to capture daily seasonal patterns.
The decomposition produced:
- Observed component
- Trend component
- Seasonal component
- Residual component

This helped in understanding long-term trends and daily repeating patterns.

## 8. Trend Modeling

To understand smooth long-term behavior:
- Weekly aggregated data was used
- Polynomial regression was applied
- NumPy polynomial fitting was implemented
- Fitted curve was plotted over weekly energy data

This showed a gradual upward trend in later months.

## 9. Peak and Off-Peak Analysis

Using hourly aggregation, I identified:
- Peak hours (evening time)
- Off-peak hours (late night / early morning)

This analysis is useful for energy optimization and demand-side management.

## 10. Key Insights

- Energy consumption increases from April onwards.
- AC is the major contributor in later months.
- Strong daily seasonality exists.
- Evening hours show highest demand.
- Aggregated data provides better clarity than raw hourly data.

## 11. Tools Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Statsmodels
- Jupyter Notebook
- VS Code

## 12. Conclusion

In this milestone, I performed detailed exploratory and time-series analysis on smart home energy consumption data.
The dataset has been cleaned, structured, and analyzed properly.  
This milestone builds a strong foundation for future forecasting and advanced time-series modeling.