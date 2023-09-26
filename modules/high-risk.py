# High-Risk Combinations - Users who are both admins and have access to sensitive apps

# Identify admin groups (for simplicity, assume any group with 'Admin' in its name is an admin group)
admin_groups = user_groups_df[user_groups_df['user_group_name'].str.contains('Admin', case=False)]

# Identify sensitive apps (for simplicity, assume any app with more than 50 users is a sensitive app)
sensitive_apps = app_access_counts[app_access_counts['num_users'] > 50]

# Find users who are in admin groups and have access to sensitive apps
high_risk_combinations = pd.merge(admin_groups[['username', 'email']], user_apps_df[['username', 'email', 'application_name']], on=['username', 'email'], how='inner')
high_risk_combinations = high_risk_combinations[high_risk_combinations['application_name'].isin(sensitive_apps['application_name'])]

# Show summary and preview of the results
high_risk_combinations_count = len(high_risk_combinations)
high_risk_combinations_preview = high_risk_combinations[['username', 'email', 'application_name']].head()

high_risk_combinations_count, high_risk_combinations_preview
