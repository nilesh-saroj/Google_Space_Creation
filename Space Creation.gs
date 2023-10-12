function createChatSpacesFromSheet() {

   
    // Create space using Chat API
    var message = {
      "displayName": "My Chat Room 2",
      "spaceType": "SPACE"

    };

    var url = "https://chat.googleapis.com/v1/spaces";
    var headers = {
      "Authorization": "Bearer " + ScriptApp.getOAuthToken(),
      "Content-Type": "application/json"
    };
    // Logger.log(ScriptApp.getOAuthToken());
    var options = {
      "method": "post",
      "headers": headers,
      "payload": JSON.stringify(message),
      "muteHttpExceptions": true
    };

    // Make API request
    var response = UrlFetchApp.fetch(url, options);
     Logger.log(response.getContentText());
  }
