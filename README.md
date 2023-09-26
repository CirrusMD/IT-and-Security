# Access Review Analysis Python App

## Install

`pip install pandas matplotlib seaborn`

## How To Use the App:

1. **Download the App**: First, download the Python script you got from the link above.

2. **Place the CSV Files**: Make sure to place the CSV files (`jcuserlist_<Date>.csv`, `users-to-user-groups-################-<Date>Z.csv`, `users-to-sso-applications-################-<Date>Z.csv`) in the same directory as the Python script or update the paths in the script accordingly.

3. **Run the App**

   Open your terminal or command prompt and navigate to the folder where the Python script is located. Run the following command:

   ```
   python access-review.py
   ```

4. **Check the Output**: The application will print the access review analysis summaries directly in the terminal. It will also generate a bar plot named `user_status_summary.png` in the same directory.

### Example:

Here's how you might navigate to the folder and run the script on a typical Unix-based system (like macOS or Linux):

```
bash
cd path/to/folder/with/python_script/
python access-review.py
```


