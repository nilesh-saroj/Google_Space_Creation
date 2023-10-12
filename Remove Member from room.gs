function removeMemberFromRoom()
 {
  var spaceId = "AAAA74DOtW0";
  var memberEmail = "zulfikar.pirani@rawalwasia.in";

  var memberName = memberEmail;
  var memberUrl = `https://chat.googleapis.com/v1/spaces/${spaceId}/members/${memberName}`;

  var memberHeaders = {
    "Authorization": "Bearer " + ScriptApp.getOAuthToken(),
    "Content-Type": "application/json"
  };

  var memberOptions = {
    "method": "delete",
    "headers": memberHeaders,
    "muteHttpExceptions": true
  };

  // Make API request to remove member from the space
  var memberResponse = UrlFetchApp.fetch(memberUrl, memberOptions);
  Logger.log("Member Removal API Response: " + memberResponse.getContentText());

  if (memberResponse.getResponseCode() === 200) {
    Logger.log("Member removed successfully");
  } else {
    Logger.log("Error removing member. Status code: " + memberResponse.getResponseCode());
    Logger.log("Error response: " + memberResponse.getContentText());
  }
}
