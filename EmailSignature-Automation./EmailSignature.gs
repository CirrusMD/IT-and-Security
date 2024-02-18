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
<div dir="ltr" style="font-family: Arial, sans-serif; font-size: 14px;">
    <div dir="ltr">
        <b><font color="#0b5394">{{name}}</font></b>
        <div>
            <font color="#0b5394">{{title}}</font><br>
            <b><font color="#3d85c6">p:</font></b><font color="#0b5394"> {{phone}}</font><br>
            <b><font color="#3d85c6">e:</font></b><font color="#0b5394"> <a href="mailto:{{email}}" target="_blank" style="text-decoration: none; color: #0b5394;">{{email}}</a></font><br>
            <b><font color="#3d85c6">w:</font></b><font color="#0b5394"> <a href="http://cirrusmd.com" target="_blank" style="text-decoration: none; color: #0b5394;">cirrusmd.com</a></font><br>&nbsp;
        </div>
    </div>
</div>`;
  return htmlTemplate.replace('{{name}}', userName).replace('{{title}}', userTitle);
}
