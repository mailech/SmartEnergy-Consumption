import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df=pd.read_csv('HomeC.csv')
#print(df)
pd.DataFrame(df)

df.shape
#df.describe()
df.head() #top 5 rows of data 
df.tail() #last 5 rows
#df.isnull()

df["time"] = pd.to_numeric(df["time"],errors="coerce")
print(df[df["time"]>1451624595])

x=df['time'].mean() #gives mean of time
print(x)
df['time'].median()
df['time'].sum()
df['time'].std()
df['time'].var()

df['timestamp'] = pd.to_datetime(df["time"],unit='s')
df = df.set_index('timestamp')

kitchen_cols = ['Dishwasher','Microwave','Fridge','Kitchen 12[kW]','Kitchen 14[kW]','Kitchen 38[kW]']
available_cols = [c for c in kitchen_cols if c in df.columns]
df_kitchen=df[available_cols]
df.kitchen.head()