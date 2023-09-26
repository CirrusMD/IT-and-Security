import pandas as pd

# Filter out inactive or suspicious accounts based on the 'activated', 'suspended', and 'account_locked' columns
inactive_accounts = user_list_df[user_list_df['activated'] == False]
suspended_accounts = user_list_df[user_list_df['suspended'] == True]
locked_accounts = user_list_df[user_list_df['account_locked'] == True]

# Show summary counts for each category
inactive_count = len(inactive_accounts)
suspended_count = len(suspended_accounts)
locked_count = len(locked_accounts)

# Preview a few rows from each filtered DataFrame
inactive_preview = inactive_accounts[['username', 'email', 'state', 'account_locked']].head()
suspended_preview = suspended_accounts[['username', 'email', 'state', 'account_locked']].head()
locked_preview = locked_accounts[['username', 'email', 'state', 'account_locked']].head()

inactive_count, suspended_count, locked_count, inactive_preview, suspended_preview, locked_preview
