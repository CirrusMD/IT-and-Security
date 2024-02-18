function fetchUserTitlesFromTriNet() {
  var accessToken = getTriNetAccessToken(); // Obtain the access token
  var version = 'v1'; // API version
  var companyId = 'YOUR_COMPANY_ID'; 
  var apiURL = `https://api.trinet.com/${version}/company/${companyId}/employees`;

  var options = {
    "method": "get",
    "headers": {
      "Authorization": "Bearer " + accessToken,
      "grant_type": "client_credentials" // 
    }
  };

  var response = UrlFetchApp.fetch(apiURL, options);
  var employees = JSON.parse(response.getContentText()).employees;
  var titles = {};
  for (var i = 0; i < employees.length; i++) {
    var email = employees[i].workEmail; // Adjust based on TriNet's response structure
    var title = employees[i].jobTitle; // Adjust based on TriNet's response structure
    titles[email] = title;
  }
  return titles;
}
