function mainFunction() {
  try {
    var userData = fetchUserTitlesFromTriNet(); // Fetches title data from Trinet
    if (Object.keys(userData).length === 0) {
      Logger.log('No user data fetched from TriNet.');
    } else {
      updateAllSignatures(userData); // Updates Gmail signatures based on fetched data
      Logger.log('Successfully updated signatures for all users.');
    }
  } catch (e) {
    Logger.log('Error in mainFunction: ' + e.toString());
  }
}

function updateAllSignatures(userData) {
  for (var email in userData) {
    try {
      var userName = getUserNameByEmail(email); // Fetches user name by email
      var userTitle = userData[email];
      if (userName !== "User Name Not Found") {
        updateUserSignature(email, userName, userTitle);
        Logger.log(`Successfully updated signature for ${email}.`);
      } else {
        Logger.log(`Skipping signature update for ${email} due to missing user name.`);
      }
    } catch (e) {
      Logger.log(`Error updating signature for ${email}: ${e.toString()}`);
    }
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
  try {
    var signatureHtml = generateSignatureHtml(userName, userTitle);
    Gmail.Users.Settings.sendAs.update({
      signature: signatureHtml
    }, userEmail, 'me');
    Logger.log(`Signature updated for ${userEmail}.`);
  } catch (e) {
    Logger.log(`Error updating signature for ${userEmail}: ${e.toString()}`);
  }
}

function generateSignatureHtml(userName, userTitle) {
  var htmlTemplate = `
<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4;">
<div style="font-size: 20px;"><font color="#89D2DC">CirrusMD</font></div>
    <div>
      <b><font color="#17479D">{{name}}</b> <font color="#f7a072">&#124;</font> {{pronouns}}</font>
        <div>
            <font color="#17479D">{{title}}</font><br>
            <b><font color="#89D2DC">p:</font></b><font color="#17479D"> {{phone}}</font><br>
            <b><font color="#89D2DC">e:</font></b><font color="#17479D"> <a href="mailto:{{email}}" target="_blank" style="text-decoration: none; color: #0b5394;">{{email}}</a></font><br>
            <b><font color="#89D2DC">w:</font></b><font color="#17479D"> <a href="http://cirrusmd.com" target="_blank" style="text-decoration: none; color: #0b5394;">cirrusmd.com</a></font><br>&nbsp;
        </div>
    </div>
</div>`;
  return htmlTemplate.replace('{{name}}', userName).replace('{{title}}', userTitle);
}
