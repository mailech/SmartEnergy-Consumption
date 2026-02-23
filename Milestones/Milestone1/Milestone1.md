# Milestone 1 – Smart Energy Data Analysis

## Purpose of This Milestone
The primary goal of this phase was to understand smart home energy consumption data at a detailed level.  
This includes preparing raw data, analyzing appliance-level usage, and making the dataset ready for future predictive modeling.

---

##  Data Sources
The analysis was performed using:

- **HomeC.csv** – Real-world smart home energy dataset  
- **Generated Synthetic Dataset** 

Both datasets contain timestamp-based energy readings of multiple household appliances.

---

##  Data Preprocessing Steps

To ensure accuracy and consistency, the following preprocessing steps were completed:

- Inspected dataset for null and duplicate records  
- Applied forward-fill technique to handle missing values  
- Converted timestamp column into proper datetime format  
- Set datetime column as index for time-series operations  
- Aggregated data into:
  - Hourly summaries  
  - Daily summaries  
  - Monthly summaries  



## Analytical Techniques Applied

Several analytical approaches were used to explore consumption behavior:

- Trend analysis across different time intervals  
- Appliance-level energy usage comparison  
- Rolling mean calculations to smooth fluctuations  
- Weekend vs weekday usage pattern comparison  
- Polynomial curve fitting for pattern approximation  
- Frequency domain analysis using FFT  

These techniques helped identify recurring patterns and seasonal behaviors.

---

## Statistical Evaluation

To understand distribution and variability, the following measures were calculated:

- Average (Mean)  
- Median  
- Standard Deviation  
- Skewness  
- Kurtosis  
- Correlation between appliances  
- Polynomial regression modeling  

---

##  Technologies and Tools

The implementation was carried out using:

- Python  
- Pandas & NumPy for data handling  
- Matplotlib & Seaborn for visualization  
- SciPy for frequency analysis  
- Jupyter Notebook for experimentation  
- VS Code for project management  

---

##  Key Achievements

- Structured and validated raw time-series data  
- Completed comprehensive exploratory analysis  
- Identified energy consumption trends and device behavior  
- Prepared a clean dataset suitable for machine learning models  
- Organized project files into a professional structure  

---
