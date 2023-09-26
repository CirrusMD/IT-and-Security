import pandas as pd

# Load the CSV files into DataFrames
user_list_df = pd.read_csv('/jcuserlist_20230925.csv')
user_groups_df = pd.read_csv('/users-to-user-groups-6511da5f8d205ef0d9bcdbe7-20230925Z.csv')
user_apps_df = pd.read_csv('/users-to-sso-applications-6511daca2624fcca7fea9f4c-20230925Z.csv')

# Show the first few rows of each DataFrame to get an idea of the structure
user_list_preview = user_list_df.head()
user_groups_preview = user_groups_df.head()
user_apps_preview = user_apps_df.head()

user_list_preview, user_groups_preview, user_apps_preview
