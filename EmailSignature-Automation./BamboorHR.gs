// BambooHR Functions Script
function fetchUserTitlesFromBambooHR() {
  var apiKey = 'YOUR_BAMBOOHR_API_KEY';
  var domain = 'YOUR_BAMBOOHR_DOMAIN';
  var apiURL = "https://api.bamboohr.com/api/gateway.php/" + domain + "/v1/employees/directory?status=active";
  var options = {
    "method" : "get",
    "headers" : {
      "Authorization": "Basic " + Utilities.base64Encode(apiKey + ":x"),
      "Accept": "application/json"
    }
  };

  var response = UrlFetchApp.fetch(apiURL, options);
  var employees = JSON.parse(response.getContentText()).employees;
  var titles = {};
  for (var i = 0; i < employees.length; i++) {
    var email = employees[i].workEmail;
    var title = employees[i].jobTitle;
    titles[email] = title;
  }
  return titles;
}
