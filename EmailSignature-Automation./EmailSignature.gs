function mainFunction() {
  var userData = fetchUserTitlesFromTriNet(); // Fetches title data from Trinet
  updateAllSignatures(userData); // Updates Gmail signatures based on fetched data
}

function updateAllSignatures(userData) {
  for (var email in userData) {
    var userName = getUserNameByEmail(email); //
    var userTitle = userData[email];
    updateUserSignature(email, userName, userTitle);
  }
}

function getUserNameByEmail(email) {
  try {
    var user = AdminDirectory.Users.get(email);
    return user.name.fullName; // Adjust based on the property that contains the full name
  } catch (e) {
    Logger.log('Error fetching user name for email ' + email + ': ' + e.message);
    return "User Name Not Found"; // Default or error handling
  }
}

function updateUserSignature(userEmail, userName, userTitle) {
  var signatureHtml = generateSignatureHtml(userName, userTitle);
  Gmail.Users.Settings.sendAs.update({
    signature: signatureHtml
  }, userEmail, 'me');
}

function generateSignatureHtml(userName, userTitle) {
  var htmlTemplate = `
<div>
// ==============================
// ==============================
// EMAIL SIGNATURE HTML GOES HERE
// ==============================
// ==============================
</div>`;
  return htmlTemplate.replace('{{name}}', userName).replace('{{title}}', userTitle);
}
