import pandas as pd
# Import sqlalchemy
from sqlalchemy import create_engine


df = pd.read_csv("scrapped_data.csv")
df = df[["Name", "Price", "Country", "Date"]]

# dropping null value columns to avoid errors
df.dropna(inplace=True)

# new data frame with split value columns
new = df["Name"].str.split("-", n=1, expand=True)

# making separate first name column from new data frame
df["Product"] = new[0]

# making separate last name column from new data frame
df["Qty"] = new[1]

# Dropping old Name columns
df.drop(columns=["Name"], inplace=True)

# df display
df.head(20)


# Cleaning the data

# delete all rows with column 'Qty' with a length > 40
df['Qty'] = df['Qty'].astype('str')
mask = (df['Qty'].str.len() <= 5)
df = df.loc[mask]
df.head()


# Drop columns containing None in Quantity

mask = (df['Qty'] != "None")
df = df.loc[mask]
df.head()


# Rename Product to Name

df.rename(columns={'Product': 'Name'}, inplace=True)
# Convert datetype to string
df['Date'] = df['Date'].astype(str)

# Using to_datetime() & astype()
df['Date'] = pd.to_datetime(df['Date'].astype(str), format='%Y/%m/%d')

# Convert DataTime to Different Format
df['Date'] = df['Date'].dt.strftime('%d/%m/%Y')

# Sql alchemy engine instance
engine = create_engine("postgresql://root:root@localhost:5432/postgres")

# Test connection
engine.connect()
print("Pipeline connection to postgres successful...")


# Write the data to postgres
# Batch writes will not be immplemented since the dataset is small
print("Writing to database ...")
df.to_sql(name="product", con=engine, if_exists="append")
print("Write to postgres completed ....")
