# Group the data by 'application_name' and count the number of users with access to each application
app_access_counts = user_apps_df.groupby('application_name').size().reset_index(name='num_users')

# Identify applications with users in different states
app_by_states = user_apps_df.groupby(['application_name', 'user_state']).size().reset_index(name='state_count')
apps_with_mixed_states = app_by_states.pivot(index='application_name', columns='user_state', values='state_count').fillna(0).reset_index()

# Show summary and preview of the results
apps_with_many_users_count = len(app_access_counts[app_access_counts['num_users'] > 1])
apps_with_mixed_states_count = len(apps_with_mixed_states)

app_access_preview = app_access_counts.head()
apps_with_mixed_states_preview = apps_with_mixed_states.head()

apps_with_many_users_count, apps_with_mixed_states_count, app_access_preview, apps_with_mixed_states_preview

