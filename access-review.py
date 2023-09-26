import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from docx import Document
from docx.shared import Inches

def main():
    # Initialize a Document
    doc = Document()
    doc.add_heading('Access Review Report', 0)

    # Add a date
    doc.add_paragraph('Date: Some Date Here')

    # Load data
    user_list_df = pd.read_csv('/mnt/data/jcuserlist_20230925.csv')
    user_groups_df = pd.read_csv('/mnt/data/users-to-user-groups-6511da5f8d205ef0d9bcdbe7-20230925Z.csv')
    user_apps_df = pd.read_csv('/mnt/data/users-to-sso-applications-6511daca2624fcca7fea9f4c-20230925Z.csv')

    # Step 1: User Status - Identify inactive or suspicious accounts
    inactive_accounts = user_list_df[user_list_df['state'] == 'INACTIVE']
    suspended_accounts = user_list_df[user_list_df['state'] == 'SUSPENDED']
    doc.add_heading('1. User Status: Inactive or Suspicious Accounts', level=1)
    doc.add_paragraph(f'Number of Inactive Accounts: {len(inactive_accounts)}')
    doc.add_paragraph(f'Number of Suspended Accounts: {len(suspended_accounts)}')

    # Generate a bar plot for User Status
    sns.set(style="whitegrid")
    plt.figure(figsize=(10, 6))
    sns.barplot(x=['Inactive', 'Suspended'], y=[len(inactive_accounts), len(suspended_accounts)])
    plt.title('User Status Summary')
    plt.xlabel('Account Status')
    plt.ylabel('Number of Accounts')
    plt.savefig('user_status_summary.png')
    doc.add_picture('user_status_summary.png', width=Inches(4.0))

    # Step 2: Group Membership
    group_counts = user_groups_df['user_group_name'].value_counts()
    doc.add_heading('2. Group Membership', level=1)
    doc.add_paragraph(f'Top 5 Groups with Most Members:')
    doc.add_paragraph(f'{group_counts.head()}')

    # Step 3: Application Access
    app_access_counts = user_apps_df['application_name'].value_counts()
    doc.add_heading('3. Application Access', level=1)
    doc.add_paragraph(f'Top 5 Most Accessed Applications:')
    doc.add_paragraph(f'{app_access_counts.head()}')

    # Step 4: Data Quality
    missing_values = user_list_df.isnull().sum()
    doc.add_heading('4. Data Quality', level=1)
    doc.add_paragraph(f'Missing Values in User List:')
    doc.add_paragraph(f'{missing_values}')

    # Step 5: High-Risk Combinations
    admin_groups = user_groups_df[user_groups_df['user_group_name'].str.contains('Admin')]
    sensitive_apps = user_apps_df['application_name'].value_counts().index[:5]  # Top 5 as example
    high_risk_combinations = pd.merge(admin_groups, user_apps_df, on=['username', 'email'])
    high_risk_combinations = high_risk_combinations[high_risk_combinations['application_name'].isin(sensitive_apps)]
    doc.add_heading('5. High-Risk Combinations', level=1)
    doc.add_paragraph(f'High-Risk Combinations:')
    doc.add_paragraph(f'{high_risk_combinations.head()}')

    # Save the document
    doc.save('Access_Review_Report.docx')

if __name__ == '__main__':
    main()
