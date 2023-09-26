# Data Quality - Check for inconsistencies or missing data

# Check for missing values in key columns across all dataframes
missing_values_user_list = user_list_df[['username', 'email', 'state']].isnull().sum()
missing_values_user_groups = user_groups_df[['username', 'email', 'user_group_name']].isnull().sum()
missing_values_user_apps = user_apps_df[['username', 'email', 'application_name']].isnull().sum()

# Check for inconsistencies like users being both 'ACTIVATED' and 'SUSPENDED' in the user list
inconsistent_states = user_list_df.groupby('username')['state'].nunique().reset_index()
inconsistent_states = inconsistent_states[inconsistent_states['state'] > 1]

# Show summary and preview of the results
missing_values_summary = {
    'user_list': missing_values_user_list.to_dict(),
    'user_groups': missing_values_user_groups.to_dict(),
    'user_apps': missing_values_user_apps.to_dict()
}

inconsistent_states_count = len(inconsistent_states)

inconsistent_states_preview = inconsistent_states.head()

missing_values_summary, inconsistent_states_count, inconsistent_states_preview

