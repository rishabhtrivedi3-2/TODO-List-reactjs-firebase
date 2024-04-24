import pandas as pd
cars_data = pd.read_csv('Toyota.csv', index_col=0, na_values=["??", "????"])
cars_data.dropna(axis=0, inplace=True)
print(cars_data)
