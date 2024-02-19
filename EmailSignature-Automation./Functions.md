# Functions

## TriNetHR.gs

- **fetchUserTitlesFromTriNet**
    - **Purpose**: Fetches titles for employees from TriNet.
    - **Operations**:
        - **Access Token Retrieval**:
            - Tries to obtain an access token by calling `getTriNetAccessToken()`.
            - Logs success or error in obtaining the token.
            - Exits the function with an empty object if the access token cannot be obtained.
        - **API Call Setup**:
            - Sets API version and company ID for the URL.
            - Constructs the API URL using the company ID and version.
            - Prepares the HTTP request options, including the method and authorization headers.
        - **TriNet API Call**:
            - Makes an HTTP GET request to the TriNet API using `UrlFetchApp.fetch`.
            - Logs success or error in making the API call.
            - Exits the function with an empty object if the API call fails.
        - **Response Processing**:
            - Parses the JSON response to extract employee details.
            - Checks if any employees were found and exits with an empty object if none are found.
            - Iterates over each employee, extracting their work email and job title.
            - Stores each email-title pair in a `titles` object.
            - Logs the number of employees processed or errors if processing fails.
        - **Return Value**:
            - Returns an object mapping employee emails to their titles if successful.
            - Returns an empty object if any step fails (e.g., API call, response processing).


## EmailSignature.gs

- **mainFunction()**
    - Tries to fetch user titles from TriNet using `fetchUserTitlesFromTriNet`.
    - Checks if any user data was fetched. Logs a message if no data was fetched.
    - Calls `updateAllSignatures` with the fetched data to update Gmail signatures for all users.
    - Catches and logs any errors that occur during its execution.

- **updateAllSignatures(userData)**
    - Iterates over each entry in the `userData` object.
    - For each user, fetches the user name by email using `getUserNameByEmail`.
    - Checks if a valid user name was retrieved. If not, logs a message and skips updating the signature for that email.
    - Calls `updateUserSignature` to update the Gmail signature for each user with a valid name and title.
    - Catches and logs any errors that occur during the update process for each user.

- **getUserNameByEmail(email)**
    - Tries to fetch a user object from the Admin Directory using the provided email.
    - Returns the full name of the user as specified in the directory.
    - Catches and logs any errors that occur during the fetch operation.
    - Returns a default "User Name Not Found" string if an error occurs, indicating an issue fetching the user's name.

- **updateUserSignature(userEmail, userName, userTitle)**
    - Generates the HTML for the email signature by calling `generateSignatureHtml` with the provided user name and title.
    - Attempts to update the Gmail signature for the specified user email with the generated HTML signature.
    - Logs the outcome of the signature update attempt, indicating either success or the nature of any error encountered.

- **generateSignatureHtml(userName, userTitle)**
    - Contains an HTML template for email signatures, with placeholders for the user's name, title, phone, and email.
    - Replaces the placeholders with the actual `userName` and `userTitle` provided to the function.
    - Returns the resulting HTML string, ready to be used as an email signature.

