function fetchUserTitlesFromTriNet() {
  var accessToken;
  try {
    accessToken = getTriNetAccessToken(); // Obtain the access token
    Logger.log('Successfully obtained TriNet access token.');
  } catch (e) {
    Logger.log('Error obtaining TriNet access token: ' + e.toString());
    return {}; // Exit the function if the access token cannot be obtained
  }

  var version = 'v1'; // API version
  var companyId = 'YOUR_COMPANY_ID';
  var apiURL = `https://api.trinet.com/${version}/company/${companyId}/employees`;

  var options = {
    "method": "get",
    "headers": {
      "Authorization": "Bearer " + accessToken,
      "grant_type": "client_credentials"
    }
  };

  try {
    var response = UrlFetchApp.fetch(apiURL, options);
    Logger.log('Successfully called TriNet API.');
  } catch (e) {
    Logger.log('Error calling TriNet API: ' + e.toString());
    return {}; // Exit the function if the API call fails
  }

  try {
    var employees = JSON.parse(response.getContentText()).employees;
    if (employees.length === 0) {
      Logger.log('No employees found in the response.');
      return {}; // Return an empty object if no employees are found
    }
    var titles = {};
    for (var i = 0; i < employees.length; i++) {
      var email = employees[i].workEmail; // Adjust based on TriNet's response structure
      var title = employees[i].jobTitle; // Adjust based on TriNet's response structure
      titles[email] = title;
    }
    Logger.log('Successfully processed ' + employees.length + ' employees.');
    return titles;
  } catch (e) {
    Logger.log('Error processing TriNet response: ' + e.toString());
    return {}; // Return an empty object if processing fails
  }
}
