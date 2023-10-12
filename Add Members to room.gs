function addMembersToRoom(spaceId) {
  var members = ["zulfikar.pirani@rawalwasia.in"]; // List of user email addresses to add

  for (var i = 0; i < members.length; i++) {
    var memberName = "users/" + members[i];
    var memberUrl = `https://chat.googleapis.com/v1/${spaceId}/members`;

    var memberHeaders = {
      "Authorization": "Bearer " + ScriptApp.getOAuthToken(),
      "Content-Type": "application/json"
    };

    var memberPayload = {
        "role": "ROLE_MEMBER",
        "member": {
          "name": memberName,
          "type": "HUMAN"
      }}
    };

    var memberOptions = {
      "method": "post",
      "headers": memberHeaders,
      "payload": JSON.stringify(memberPayload),
      "muteHttpExceptions": true
    };

    // Make API request to add member to the space
    var memberResponse = UrlFetchApp.fetch(memberUrl, memberOptions);
    Logger.log("Member API Response: " + memberResponse.getContentText());
    
    if (memberResponse.getResponseCode() === 200) {
      Logger.log("Member added successfully");
    } else {
      Logger.log("Error adding member. Status code: " + memberResponse.getResponseCode());
      Logger.log("Error response: " + memberResponse.getContentText());
      //Logger.log(memberUrl)
    }
  }
