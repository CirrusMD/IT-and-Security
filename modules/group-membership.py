import pandas as pd

# Group the data by 'user_group_name' and count the number of users in each group
group_membership_counts = user_groups_df.groupby('user_group_name').size().reset_index(name='num_users')

# Filter out groups with only one member (not overly permissive)
overly_permissive_groups = group_membership_counts[group_membership_counts['num_users'] > 1]

# Identify groups with users in different states
group_by_states = user_groups_df.groupby(['user_group_name', 'user_state']).size().reset_index(name='state_count')
groups_with_mixed_states = group_by_states.pivot(index='user_group_name', columns='user_state', values='state_count').fillna(0).reset_index()

# Show summary and preview of the results
overly_permissive_count = len(overly_permissive_groups)
groups_with_mixed_states_count = len(groups_with_mixed_states)

overly_permissive_preview = overly_permissive_groups.head()
groups_with_mixed_states_preview = groups_with_mixed_states.head()

overly_permissive_count, groups_with_mixed_states_count, overly_permissive_preview, groups_with_mixed_states_preview

