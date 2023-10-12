function createChatRoomsFromSheet() {
  var spreadsheetId = "15WxwB2kpYnEa0VD8_3ZIVCnwa6Pms5dOoE-Aa9ypq8Y"; // Replace with your Google Sheet ID
  var sheetName = "Person Name"; // Replace with the name of your sheet containing the room names

  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var data = sheet.getRange("C").getValues(); // Assumes room names are in columns C

  for (var i = 0; i < 1; i++) {
    var roomName = data[i][0]; 
    createChatRoom(roomName);
  }
} 

    
  function createChatRoom(roomName) {
  // Create space using Chat API
  var spaceMessage = {
    "displayName": roomName,
    "spaceType": "SPACE"
  };

  var spaceUrl = "https://chat.googleapis.com/v1/spaces";
  var spaceHeaders = {
    "Authorization": "Bearer " + ScriptApp.getOAuthToken(),
    "Content-Type": "application/json"
  };

  var spaceOptions = {
    "method": "post",
    "headers": spaceHeaders,
    "payload": JSON.stringify(spaceMessage),
    "muteHttpExceptions": true
  };

  // Make API request to create space
  var spaceResponse = UrlFetchApp.fetch(spaceUrl, spaceOptions);
  Logger.log("Space API Response: " + spaceResponse.getContentText());
}
