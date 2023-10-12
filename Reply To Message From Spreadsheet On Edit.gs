function onEditTrigger(e) {
  // Get the edited range
  var editedRange = e.range;
  // Get the sheet where the edit occurred
  var sheet = editedRange.getSheet();
  
  // Check if the edit occurred in the "DATA" sheet
  if (sheet.getName() === "DATA") {
    // Get the edited row number
    var editedRow = editedRange.getRow();
    
    // Call the function to process the edited row and post the message
    replyToMessageFromSpreadsheet(editedRow);
  }
}


function replyToMessageFromSpreadsheet(editedRow) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("DATA");
  
  // Get the edited row data
  var row = sheet.getRange(editedRow, 1, 1, sheet.getLastColumn()).getValues()[0];
  var editedTimestamp = new Date();

  // Extract data from the row and construct the message
  var companyName = row[4];
  var category = row[2];
  var itemName = row[5];
  var rate = row[7];
  var messageId = "000003";
  var subcategory = row[3];
  var quoteno = "QN1";  
  var spaceId = "AAAAJTjt2sM";

  // Construct the message text
 var replyText = {
  "text" : `*Quote No.* : ${quoteno}\n*Company Name* : ${companyName}\n*Category* : ${category}\n*Sub-category* : ${subcategory}\n*Item name* : ${itemName}\n*Rate*: ₹ ${rate}`
};
  var serviceAccountCredentials = getServiceAccountCredentials();
  var accessToken = getAccessToken(serviceAccountCredentials);
  

  var messageUrl = `https://chat.googleapis.com/v1/spaces/${spaceId}/messages?threadKey=${messageId}&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`;


  var messageHeaders = {
    "Authorization": "Bearer " + accessToken,
    "Content-Type": "application/json"
  };

  // Options for the API request
  var messageOptions = {
    "method": "post",
    "headers": messageHeaders,
    "payload": JSON.stringify(replyText),
    "muteHttpExceptions": true
  };

  var messageResponse = UrlFetchApp.fetch(messageUrl, messageOptions);
  Logger.log("Card Message API Response: " + messageResponse.getContentText() + messageId + spaceId);

  if (messageResponse.getResponseCode() === 200) {
    Logger.log("Card Message sent successfully");
    Logger.log("Edited Row : " + editedRow)
    sheet.getRange(editedRow, 10).setValue("Edited at: " + editedTimestamp);
  } else {
    Logger.log("Error sending card message. Status code: " + messageResponse.getResponseCode());
    Logger.log("Error response: " + messageResponse.getContentText());
    Logger.log("Constructed Message URL: " + messageUrl);
    Logger.log("Edited Row : " + editedRow)
    
  }


}


function getServiceAccountCredentials() {
  var serviceAccountEmail = "chat-room@eminent-card-400106.iam.gserviceaccount.com";
  var privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDqIHARmN+dqf9l\n1qal/EM5/n1M9mY76qiExK/jTJck5jmaFHrmKTkP7N/LVq4+sMlAnqQQztpAe3jl\
n+I0V3Fnz78YCkxWb2uAXMBTzsDBDSnRZTr0lftIw8hzyQMFd5HUfbDSEyt02etwg\n9r8GDjJVFg6S55GRDRnITksQ9bNyMPRz4AsHEbfh/hDbeq8f30cJMunFljMV00iV\nVukEiNYROqnshc8cSzkw4OZS8efOAFje84ZKq03vGVFTRxZ1ps+vJ9bcgOGnItPr\
nRVCnrtJVvomZNGOPK7so8cmc8tUFksiRNIi/LMsUHJ3nZEnBWW2+2SGFohksGloP\nU+DnOvINAgMBAAECggEAAv9HJrwz+ojonWGHegnrIks3Va/4CH9u7bzREFjga9PZ\nTo7Vqls05iRe97A84oqeq+FW+LYcxfDrVr2zHEAIV4BjASUrdv1V+b9Hl310USK8\
n1+Gg7ZDSZknZfXz1GWI206AS9namr9fHKr4Fe773kbiYK4k4Deq1QROkxa6tbwQC\nyOASs0CsjOWcyTI3JwmKh1wxK3nBGVrKmaeh2TszVddMGFbrWDBSmoFXAob0tMcR\nBXmKnZsKIKav25G+NIzt2d19vnZouQAgv/g0Q9E9Kjbf4LHmYXMIG0FzHngNM76g\
nEPEUKdLWTqOc1+7BAVCi/Lu6Gt3ckmrnXK5kz/l2uwKBgQD1N1cVw4T1rlezC8CI\n5zlVEBDZR6WudtuvQXpibFUq/DbfkeCbHhQpYUZ0q6R9SlfIKSIa51r7x+BCJdDc\njDvA8ZRpd5hkNohXVbsJKII3sriOEkJDVDctvyyPuxuWNiRXTZ9rjAHp0XmdlQd/\
nmRozTr4H817TpYOMeMnNNDKPhwKBgQD0bEBu9BGJR8+0YCLAlyxBsQ/aAaDY2mOz\n4fecBQw0joOrX5AwYwLXvBeJW6vrqufQRzAB+7abPTFndcGNBQYk7PGqIU5li+cD\n36VM7SqFjn67SHoi/5fazj0snAyl3xonjbO5VIX8qlnMXupgB5QRYXlthu9QZK2o\
nuJqxU1hOywKBgQCW6HPDhQvyVlTKb1UR65qw6q4zyZABCkywUk+K+rh/N7Bdbl0X\nmS83OBIwAuG76WCUYhwHCpJHmP4+Nx+OWw768rEvJta19Yl6ldwBCtj4hhhl9n6p\nCM7cbGZ0HeYgTzmWMMMHYKZcyvlZLTnsIMCrCq6QHgohnh6S+FLY4mKrSQKBgEed\
nWBuqQ2EXu1G8QTJwmLT+rghQJdKj2kagVK5QBE153DZgH50txW10XOkQBQVd4+Hw\nma5bFBvUCB+qLvWknTJAgmY4sAGsxhkqdAJgEu9i2tsA11hdzx57Aw2JA2OuRLmG\nGTyZ+VAYkYsB3GYaklWtW6itunyxovgmbpy6MMuVAoGAJr1BLL0LpQN1dE/5fU6S\
nGJrMv99FoLcUAZ+kWTWalOE6sq/xFDwnrimAZlfws6f4tmf1AdEnD0o0Ud/RXKgr\nDo1gF+4WkjbTiGVXZnrVz9yj6ZW6OCk4F09BGTzs/pA+wpYbnQUS2TU48vZFb0O6\ndcwCF/Xy/igBYg3USm1TYB8=\n-----END PRIVATE KEY-----\n";
  
  return {
    "private_key": privateKey,
    "client_email": serviceAccountEmail,
    "token_uri": "https://accounts.google.com/o/oauth2/token"
  };
}


function getAccessToken(serviceAccountCredentials) {
  var jwtHeader = {
    "alg": "RS256",
    "typ": "JWT"
  };

  var now = Math.floor(Date.now() / 1000);
  var jwtClaims = {
    "iss": serviceAccountCredentials.client_email,
    "scope": "https://www.googleapis.com/auth/chat.bot",
    "aud": serviceAccountCredentials.token_uri,
    "exp": now + 3600,
    "iat": now
  };

  var jwt = Utilities.base64EncodeWebSafe(JSON.stringify(jwtHeader)) + "." + Utilities.base64EncodeWebSafe(JSON.stringify(jwtClaims));
  var signature = Utilities.computeRsaSha256Signature(jwt, serviceAccountCredentials.private_key);
  var jwtAssertion = jwt + "." + Utilities.base64EncodeWebSafe(signature);

  var params = {
    "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "assertion": jwtAssertion
  };

  var response = UrlFetchApp.fetch(serviceAccountCredentials.token_uri, {
    method: "post",
    payload: params
  });

  var tokenResponse = JSON.parse(response.getContentText());
  return tokenResponse.access_token;
}
