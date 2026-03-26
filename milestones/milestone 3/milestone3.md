# Milestone 3 – Data Cleaning and Preparation

## 1. Objective

The objective of this milestone is to clean, preprocess, and prepare the dataset for further analysis and machine learning. Proper data preparation ensures that the dataset is accurate, consistent, and suitable for time-series modeling.

---

## 2. Dataset Description

The dataset contains smart home energy consumption data with the following attributes:

* Timestamp of energy measurement
* Power consumption of individual devices such as:

  * Refrigerator (fridge)
  * Air Conditioner (AC)
  * Lights
  * Microwave
* Total power consumption

Each record represents energy usage at a specific time interval.

---

## 3. Data Cleaning

### Handling Missing Values

Missing values were identified and handled to ensure data consistency.
They were replaced with appropriate values to avoid errors during analysis and model training.

### Removing Duplicates

Duplicate rows were removed to prevent redundancy and ensure accurate analysis.

---

## 4. Data Type Correction

The dataset was checked for correct data types.
Numeric columns were ensured to be in proper numerical format for analysis and modeling.

---

## 5. Timestamp Conversion

The timestamp column was converted into datetime format.
This is an essential step for time-series analysis as it allows:

* Chronological ordering of data
* Extraction of time-based features
* Resampling and aggregation

---

## 6. Time Indexing and Sorting

The timestamp was set as the index of the dataset to enable efficient time-based operations.
The data was then sorted chronologically to maintain the correct sequence of events.

---

## 7. Feature Engineering

Time-based features were extracted from the timestamp to capture patterns in energy consumption:

* Hour → to analyze hourly variations
* Day → to observe daily trends
* Month → to identify seasonal patterns
* Weekday → to compare weekday and weekend usage

These features enhance the dataset and improve the performance of machine learning models.

---

## 8. Final Prepared Dataset

After completing all preprocessing steps, the dataset is:

* Clean (no missing or duplicate values)
* Properly formatted (correct data types)
* Time-indexed and sorted
* Enriched with additional features

---

## 9. Conclusion

Milestone 3 focused on transforming raw data into a structured and meaningful dataset.
The prepared data is now ready for:

* Exploratory Data Analysis (EDA)
* Visualization
* Machine Learning model development

Proper data preparation is a critical step that directly impacts the accuracy and reliability of the final results.
