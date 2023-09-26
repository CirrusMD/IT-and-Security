# Access Review Analysis Python App

**NOTE:** `modules` isn't in use, its just stuff I started with.

## Install

`pip install pandas matplotlib seaborn`

## How To Use the App:

1. **Place the CSV Files**: Make sure to place the CSV files (`jcuserlist_<Date>.csv`, `users-to-user-groups-################-<Date>Z.csv`, `users-to-sso-applications-################-<Date>Z.csv`) in the same directory as the Python script or update the paths in the script accordingly.

32. **Run the App**

   Open your terminal or command prompt and navigate to the folder where the Python script is located. Run the following command:

   ```
   python access-review.py
   ```

3. **Check the Output**: The application will print the access review analysis summaries directly in the terminal. It will also generate a bar plot named `user_status_summary.png` in the same directory.

### Example:

Here's how you might navigate to the folder and run the script on a typical Unix-based system (like macOS or Linux):

```
bash
cd path/to/folder/with/python_script/
python access-review.py
```



## Files

### `jcuserlist_<Date>.csv`

- **_id, username, email, etc.**: Various identifiers and metadata for each user.
- **account_locked, activated, suspended, state**: Columns that seem to indicate the status of the account.
- **addresses, company, department, jobTitle, etc.**: Additional user details.

### `users-to-user-groups-#########-<Date>Z.csv`

- **username, email**: Identifiers for each user.
- **user_group_name**: The name of the group the user belongs to.
- **user_created_at, user_state, account_locked, password_expired, etc.**: Various metadata including the status of the account.

### `users-to-sso-applications-#########-<Date>Z.csv`

- **username, email**: Identifiers for each user.
- **application_name**: The name of the application the user has access to.
- **user_state, association_type, association_timestamp, last_login_timestamp**: Various metadata including the status of the application access.









