import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


# Load data
user_list_df = pd.read_csv('path_to_user_list.csv')
user_groups_df = pd.read_csv('path_to_user_groups.csv')
user_apps_df = pd.read_csv('path_to_user_apps.csv')

# Step 1: User Status - Identify inactive or suspicious accounts
inactive_accounts = user_list_df[user_list_df['state'] == 'INACTIVE']
suspended_accounts = user_list_df[user_list_df['state'] == 'SUSPENDED']
print(f"Number of Inactive Accounts: {len(inactive_accounts)}")
print(f"Number of Suspended Accounts: {len(suspended_accounts)}")

# Step 2: Group Membership
group_counts = user_groups_df['user_group_name'].value_counts()
print("Top 5 Groups with Most Members:")
print(group_counts.head())

# Step 3: Application Access
app_access_counts = user_apps_df['application_name'].value_counts()
print("Top 5 Most Accessed Applications:")
print(app_access_counts.head())

# Step 4: Data Quality
missing_values = user_list_df.isnull().sum()
print("Missing Values in User List:")
print(missing_values)

# Step 5: High-Risk Combinations
admin_groups = user_groups_df[user_groups_df['user_group_name'].str.contains('Admin')]
sensitive_apps = user_apps_df['application_name'].value_counts().index[:5]  # Top 5 as example
high_risk_combinations = pd.merge(admin_groups, user_apps_df, on=['username', 'email'])
high_risk_combinations = high_risk_combinations[high_risk_combinations['application_name'].isin(sensitive_apps)]
print("High-Risk Combinations:")
print(high_risk_combinations.head())

# Generate a bar plot for User Status
sns.set(style="whitegrid")
plt.figure(figsize=(10, 6))
sns.barplot(x=['Inactive', 'Suspended'], y=[len(inactive_accounts), len(suspended_accounts)])
plt.title('User Status Summary')
plt.xlabel('Account Status')
plt.ylabel('Number of Accounts')
plt.savefig('user_status_summary.png')
