function mainFunction() {
  var userData = fetchUserTitlesFromBambooHR(); // Fetches title data from BambooHR
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
<br>
<table cellpadding="0" cellspacing="0" style="font-family:sans-serif;line-height:1.5;box-sizing:initial;max-width:580px;color:#363636;border-collapse:collapse">
       <tbody><tr>
           <td valign="top">
               <table width="414" cellpadding="0" cellspacing="0" style="font-family:sans-serif;line-height:13px;width:414px;border-collapse:collapse;color:#333">
                   <tbody><tr>

                       <td valign="middle" width="80" style="padding-right:10px">
                           <p style="margin:0.75pt;line-height:0px">
                               <a href="http://FormAssembly.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://FormAssembly.com&amp;source=gmail&amp;ust=1708376772716000&amp;usg=AOvVaw00PyKYjeYCZWDQacQvJKGX">
                                   <img width="80" height="80" src="https://smart.formassembly.com/v2/imagebucket/formassembly.com/default.png" alt="" style="border:0;display:block;border-radius:0px" class="CToWUd" data-bit="iit"> </a>
                           </p>
                       </td>
                       <td valign="middle" width="322">
                           <table cellpadding="0" cellspacing="0" width="322" style="font-family:sans-serif;line-height:13px;width:322px;border-collapse:collapse;color:#333">
                               <tbody><tr>
                                   <td valign="top">
                                       <p style="margin:0.75pt;color:#043b57;font-size:16px;line-height:18px;font-family:Arial,sans-serif">
                                       {{name}} </p>
                                   </td>
                               </tr>
                               <tr>
                                   <td valign="top" style="white-space:nowrap">
                                       <p style="margin:0.75pt;font-size:11px;font-family:Arial,sans-serif;color:#0073e6;font-weight:700;text-transform:uppercase">
                                           <span>{{title}}, FORMASSEMBLY</span>
                                       </p>
                                   </td>
                               </tr>
                               <tr>
                                   <td valign="top">
                                       <p style="margin:0.75pt;font-size:11px;font-family:Arial,sans-serif">

                                           <a href="http://FormAssembly.com" style="text-decoration:underline;color:#999" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://FormAssembly.com&amp;source=gmail&amp;ust=1708376772716000&amp;usg=AOvVaw00PyKYjeYCZWDQacQvJKGX">FormAssembly.com</a>
                                       </p>
                                   </td>
                               </tr>
                               <!-- Additional HTML removed for brevity -->
                           </tbody></table>
                       </td>
                   </tr>
               </tbody></table>
           </td>
       </tr>
   </tbody></table>
<br>
</div>`;
  return htmlTemplate.replace('{{name}}', userName).replace('{{title}}', userTitle);
}
