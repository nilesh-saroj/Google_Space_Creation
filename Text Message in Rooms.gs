function sendMessageToRoom() {

  var spaceId = "AAAAJTjt2sM"; // Replace with the actual space ID
   var message = "Hello, this is a test message!"
  var messageUrl = `https://chat.googleapis.com/v1/spaces/${spaceId}/messages`;

  var messageHeaders = {
    "Authorization": "Bearer " + ScriptApp.getOAuthToken(),
    "Content-Type": "application/json"
  };

  var messagePayload = {
    "text": message
  };

  var messageOptions = {
    "method": "post",
    "headers": messageHeaders,
    "payload": JSON.stringify(messagePayload),
    "muteHttpExceptions": true
  };

  // Make API request to send message to the space
  var messageResponse = UrlFetchApp.fetch(messageUrl, messageOptions);
  Logger.log("Message API Response: " + messageResponse.getContentText());

  if (messageResponse.getResponseCode() === 200) {
    Logger.log("Message sent successfully");
  } else {
    Logger.log("Error sending message. Status code: " + messageResponse.getResponseCode());
    Logger.log("Error response: " + messageResponse.getContentText());
  }
}
