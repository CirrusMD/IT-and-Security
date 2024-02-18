# Playing Around Project: Email Signature Automation

This repository contains two Google Apps Script files designed to automate the process of updating Gmail signatures based on employee titles fetched from TriNet's HR platform. The integration enables seamless synchronization between your organization's employee directory in TriNet and their corresponding Gmail signatures.

## Scripts Description

### TriNetHR.gs
- Purpose: To fetch employee titles and email addresses from TriNet's API.
- Functionality: Utilizes the OAuth 2.0 client credentials flow to authenticate with TriNet's API and retrieves a list of all employees, including their job titles and work email addresses. This data is then used to update Gmail signatures via the `EmailSignature.g` script.

### EmailSignature.gs
- Purpose: To update Gmail signatures for all users within an organization based on the data fetched from TriNet.
- Functionality: Iterates over the list of employees provided by `TriNetHR.gs`, generating and applying a custom email signature for each user. The signature format can be customized within the script.

## Setup and Configuration
- TriNet API Credentials: Obtain your TriNet API client credentials (client ID and client secret) by following TriNet's process for provisioning client credentials.

### Script Configuration:
- Update `TriNetHR.gs` with your TriNet API client ID, client secret, and company ID.
- Ensure that `EmailSignature.gs` is configured to use the correct signature template and is linked to the TriNetHR.gs script for fetching employee data.

### Deployment:
> Scripts Deployed to Google Apps Script environment.

- Schedule to run `TriNetHR.gs` to fetch the latest employee data from TriNet once a day at 12:00 AM.
- The trigger is set to `EmailSignature.gs` to update signatures.

## Usage
- Running the Scripts: Initially, run `TriNetHR.gs` to fetch and store employee data. Subsequently, run `EmailSignature.gs` to apply or update signatures based on the fetched data.
- Scheduling: It's recommended to schedule regular updates to ensure that Gmail signatures are always in sync with the latest employee information from TriNet.

## Customization
- Signature Template: Modify the HTML template within EmailSignature.gs to match your organization's branding and signature standards.
- Data Mapping: Adjust field mappings in TriNetHR.gs if your TriNet configuration uses custom fields for employee job titles or email addresses.
