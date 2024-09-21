import pandas as pd
import sqlite3
import os

# Define the CSV file path
csv_file_path = 'pitchers.csv'

# Check if the file exists
if not os.path.exists(csv_file_path):
    print(f"The file '{csv_file_path}' does not exist.")
else:
    # Try to read the CSV file
    try:
        df = pd.read_csv(csv_file_path)
        
        # Print the first few rows of the DataFrame
        print("First few rows of the CSV file:")
        print(df.head())
        
        # Create a new SQLite database connection
        conn = sqlite3.connect('pitchers.db')

        # Convert the DataFrame to a SQL table
        df.to_sql('pitcher', conn, if_exists='fail', index=False)

        # Close the connection
        conn.close()

        print("CSV file successfully converted to SQLite table.")
    
    except pd.errors.EmptyDataError:
        print(f"The file '{csv_file_path}' is empty or contains no data.")
        # Print the contents of the file
        with open(csv_file_path, 'r') as f:
            print("File contents:")
            print(f.read())
    
    except pd.errors.ParserError as e:
        print(f"An error occurred while parsing the CSV file: {str(e)}")
    
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")


print("Script execution completed.")
