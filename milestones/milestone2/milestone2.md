# Milestone 2 – Feature Engineering and Baseline Model Development

## 1. Objective

The objective of this milestone is to prepare meaningful features from the dataset and build a baseline machine learning model to predict energy consumption.

Feature engineering helps improve model performance by extracting useful information from existing data.

---

## 2. Feature Engineering

Several new features were created from the dataset to capture energy usage patterns.

### Time-Based Features

Time related features were extracted from the timestamp to identify daily and monthly energy trends.

Extracted features include:

* **hour** – hour of the day
* **day** – day of the month
* **weekday** – day of the week
* **month** – month of the year

Example code:

```python
df['hour'] = df.index.hour
df['day'] = df.index.day
df['weekday'] = df.index.dayofweek
df['month'] = df.index.month
```

---

## 3. Lag Features

Lag features represent previous energy consumption values.
They help the model understand how past values influence future energy usage.

Two lag features were created:

* **lag_1** → energy consumption in the previous hour
* **lag_24** → energy consumption 24 hours earlier

Example:

```python
df['lag_1'] = df['total_power'].shift(1)
df['lag_24'] = df['total_power'].shift(24)
```

---

## 4. Rolling Mean Features

Rolling averages help smooth fluctuations and capture longer trends.

Created features:

* **rolling_mean_6** → average energy usage over the last 6 hours
* **rolling_mean_24** → average energy usage over the last 24 hours

Example:

```python
df['rolling_mean_6'] = df['total_power'].rolling(window=6).mean()
df['rolling_mean_24'] = df['total_power'].rolling(window=24).mean()
```

Missing values produced during these operations were removed using:

```python
df = df.dropna()
```

---

## 5. Feature Selection

The following features were used as input for the machine learning model:

* fridge
* ac
* lights
* microwave
* hour
* day
* month
* lag_1
* lag_24
* rolling_mean_6
* rolling_mean_24

Target variable:

* **total_power**

---

## 6. Dataset Splitting

The dataset was divided into training and testing sets.

* **80% training data**
* **20% testing data**

Example:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    shuffle=False
)
```

Shuffle was disabled because this is time-series data.

---

## 7. Baseline Model Development

A **Linear Regression model** was implemented as the baseline forecasting model.

Example:

```python
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
```

---

## 8. Model Evaluation

The model performance was evaluated using:

* **MAE (Mean Absolute Error)**
* **RMSE (Root Mean Squared Error)**

Example:

```python
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
```

These metrics help measure how close the predicted energy values are to the actual values.

---

## 9. Visualization

A comparison plot was created to visualize the difference between **actual energy consumption** and **predicted energy consumption**.

This helps understand how well the model captures energy patterns.

---

## 10. Summary

In Milestone 2 the following tasks were completed:

* Time-based feature extraction
* Lag feature creation
* Rolling mean feature generation
* Feature selection
* Train-test split
* Linear Regression model implementation
* Model evaluation using MAE and RMSE
* Visualization of actual vs predicted energy consumption

The baseline model provides a foundation for developing more advanced forecasting models in future milestones.
