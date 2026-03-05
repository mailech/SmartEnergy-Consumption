
# Milestone 02 – Data Cleaning and Preprocessing

## 1. Objective

In this milestone, the goal was to clean and preprocess the smart home energy consumption dataset so that it can be used for further analysis and modeling.

The main tasks performed were:

- Handling missing values  
- Detecting and removing outliers  
- Converting timestamps into proper datetime format  
- Resampling time-series data  
- Creating additional time-based features  
- Normalizing the dataset for future machine learning models  

---

## 2. Dataset Used

### HomeC.csv (Real Dataset)

This is the smart home energy dataset used in the project.

The dataset contains:

- Timestamp values  
- Appliance level energy consumption  
- Total household energy usage  
- Weather related variables such as temperature, humidity, pressure, and wind speed  

Since the dataset is large, it is stored locally and used directly for analysis.

---

## 3. Data Cleaning

Before performing analysis, the dataset was cleaned using the following steps:

- Loaded the dataset using Pandas  
- Checked column types and structure  
- Converted the Unix timestamp into datetime format  
- Set the timestamp column as the index for time-series operations  
- Handled missing values using forward fill and backward fill methods  

These steps ensured that the dataset was properly structured for analysis.

---

## 4. Outlier Detection

Energy consumption datasets may contain abnormal spikes in values.

To detect these values, the **Z-Score method** was used.

Values with very high Z-scores were considered outliers and removed from the dataset to improve data quality.

---

## 5. Data Resampling

The original dataset contains **second-level readings**, which are very detailed.

To make analysis easier, the data was resampled into:

- Hourly averages  
- Daily averages  

Resampling helps in identifying larger trends and reducing noise in the dataset.

---

## 6. Feature Engineering

To understand time-based patterns in energy consumption, additional features were created from the timestamp:

- Hour  
- Day of week  
- Month  

These features help analyze how electricity usage changes during different times.

---

## 7. Data Visualization

Several plots were created to analyze energy consumption patterns:

- Energy distribution plots  
- Boxplots for outlier detection  
- Hourly energy consumption patterns  
- Daily energy trends  
- Correlation heatmaps between appliances  

These visualizations helped in understanding how energy usage varies across appliances and time.

---

## 8. Data Normalization

Energy values were normalized using **Min-Max Scaling** so that the values fall between 0 and 1.

Normalization helps prepare the dataset for future machine learning models.

---

## 9. Train-Test Preparation

The processed dataset was divided into:

- Training data  
- Testing data  

This step prepares the dataset for predictive modeling in future milestones.

---

## 10. Tools Used

The following tools and libraries were used:

- Python  
- Pandas  
- NumPy  
- Matplotlib  
- Seaborn  
- Scikit-Learn  
- Jupyter Notebook  
- VS Code  

---

## 11. Conclusion

In this milestone, the smart home energy dataset was cleaned and prepared for further analysis.

The preprocessing steps included timestamp conversion, handling missing values, detecting outliers, resampling time-series data, creating additional features, and normalizing the dataset.

After these steps, the dataset is now properly structured and ready for deeper analysis and machine learning modeling in the next milestones.
