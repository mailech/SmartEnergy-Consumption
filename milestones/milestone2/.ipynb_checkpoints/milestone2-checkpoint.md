

# Milestone 02 – Data Cleaning and Preprocessing

## 1. Objective

The objective of this milestone is to prepare the smart home energy consumption dataset for analysis and machine learning tasks. Raw datasets often contain missing values, inconsistent formats, and abnormal data points that can affect analysis results.

In this milestone, the dataset was cleaned, transformed, and analyzed using several preprocessing techniques.

---

## 2. Dataset Description

The dataset used in this project is **HomeC.csv**, which contains smart home energy consumption data.

The dataset includes information such as:

* Timestamp values
* Appliance level energy consumption
* Total household electricity usage
* Solar energy generation
* Weather related variables like temperature, humidity, pressure, and wind speed

This dataset allows analysis of how electricity consumption changes across time and environmental conditions.

---

## 3. Data Loading and Exploration

The dataset was loaded using the **Pandas library** in Python.

Initial exploration included:

* Displaying the first few rows of the dataset
* Checking column names
* Understanding dataset dimensions
* Identifying data types of each column

This step helps understand the structure of the dataset before applying preprocessing methods.

---

## 4. Data Cleaning

Before analysis, the dataset was cleaned using several preprocessing steps:

* Removing extra spaces from column names
* Checking and handling missing values
* Ensuring proper data types for each column
* Selecting numeric columns for statistical operations

These steps help ensure the dataset is organized and ready for further processing.

---

## 5. Timestamp Conversion

The dataset contains a **time column** that represents the timestamp of each energy reading.

To enable time-series analysis:

* The time column was converted to **datetime format**
* The time column was set as the **index of the dataset**

This allows efficient time-based operations such as resampling and trend analysis.

---

## 6. Outlier Detection using Z-Score

Energy datasets may contain abnormal spikes caused by device errors or recording issues.

To detect these abnormal values, the **Z-Score method** was applied.

The Z-score measures how far a value deviates from the mean of the dataset.

Values with extreme Z-score values were considered outliers and were removed to improve the quality of the dataset.

---

## 7. Time-Series Resampling

The dataset contains very frequent energy measurements.

To simplify analysis, the dataset was resampled into different time intervals:

* Hourly average energy consumption
* Daily energy consumption patterns
* Weekly energy usage trends

Resampling helps reduce noise and makes it easier to observe long-term patterns.

---

## 8. Data Visualization

Several visualizations were created to understand energy consumption patterns, including:

* Hourly energy consumption plots
* Daily energy consumption trends
* Weekly energy consumption graphs
* Histogram showing distribution of energy usage
* Boxplots to detect outliers
* Scatter plots comparing solar generation and household consumption
* Correlation heatmaps between energy features

These visualizations provide insights into how energy consumption changes over time.

---

## 9. Train-Test Preparation

To prepare the dataset for machine learning models, the dataset was divided into:

* Training dataset (80%)
* Testing dataset (20%)

This ensures that models trained in later milestones can be evaluated properly.

---

## 10. Tools and Technologies Used

The following tools and libraries were used in this milestone:

* Python
* Pandas
* NumPy
* Matplotlib
* Seaborn
* Scikit-Learn
* Jupyter Notebook

These tools helped perform data cleaning, visualization, and dataset preparation.

---

## 11. Conclusion

In this milestone, the smart home energy dataset was successfully cleaned and prepared for further analysis.

The preprocessing process included:

* data loading and exploration
* data cleaning
* timestamp conversion
* outlier detection using Z-Score
* time-series resampling
* data visualization
* dataset preparation for machine learning


