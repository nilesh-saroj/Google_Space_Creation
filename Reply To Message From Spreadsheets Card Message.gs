function getServiceAccountCredentials() {
  var serviceAccountEmail = "chat-room@eminent-card-400106.iam.gserviceaccount.com";
  var privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDqIHARmN+dqf9l\n1qal/EM5/n1M9mY76qiExK/
jTJck5jmaFHrmKTkP7N/LVq4+sMlAnqQQztpAe3jl\n+I0V3Fnz78YCkxWb2uAXMBTzsDBDSnRZTr0lftIw8hzyQMFd5HUfbDSEyt02etwg\n9r8GDjJVFg6S55GRDRnITksQ9bNyMPRz4AsHEbfh/hDbeq8f30cJMunFljMV00iV\
nVukEiNYROqnshc8cSzkw4OZS8efOAFje84ZKq03vGVFTRxZ1ps+vJ9bcgOGnItPr\nRVCnrtJVvomZNGOPK7so8cmc8tUFksiRNIi/LMsUHJ3nZEnBWW2+2SGFohksGloP\nU+DnOvINAgMBAAECggEAAv9HJrwz+ojonWGHegnrIks3Va/4CH9u7bzREFjga9PZ\
nTo7Vqls05iRe97A84oqeq+FW+LYcxfDrVr2zHEAIV4BjASUrdv1V+b9Hl310USK8\n1+Gg7ZDSZknZfXz1GWI206AS9namr9fHKr4Fe773kbiYK4k4Deq1QROkxa6tbwQC\nyOASs0CsjOWcyTI3JwmKh1wxK3nBGVrKmaeh2TszVddMGFbrWDBSmoFXAob0tMcR\
nBXmKnZsKIKav25G+NIzt2d19vnZouQAgv/g0Q9E9Kjbf4LHmYXMIG0FzHngNM76g\nEPEUKdLWTqOc1+7BAVCi/Lu6Gt3ckmrnXK5kz/l2uwKBgQD1N1cVw4T1rlezC8CI\n5zlVEBDZR6WudtuvQXpibFUq/DbfkeCbHhQpYUZ0q6R9SlfIKSIa51r7x+BCJdDc\
njDvA8ZRpd5hkNohXVbsJKII3sriOEkJDVDctvyyPuxuWNiRXTZ9rjAHp0XmdlQd/\nmRozTr4H817TpYOMeMnNNDKPhwKBgQD0bEBu9BGJR8+0YCLAlyxBsQ/aAaDY2mOz\n4fecBQw0joOrX5AwYwLXvBeJW6vrqufQRzAB+7abPTFndcGNBQYk7PGqIU5li+cD\
n36VM7SqFjn67SHoi/5fazj0snAyl3xonjbO5VIX8qlnMXupgB5QRYXlthu9QZK2o\nuJqxU1hOywKBgQCW6HPDhQvyVlTKb1UR65qw6q4zyZABCkywUk+K+rh/N7Bdbl0X\nmS83OBIwAuG76WCUYhwHCpJHmP4+Nx+OWw768rEvJta19Yl6ldwBCtj4hhhl9n6p\
nCM7cbGZ0HeYgTzmWMMMHYKZcyvlZLTnsIMCrCq6QHgohnh6S+FLY4mKrSQKBgEed\nWBuqQ2EXu1G8QTJwmLT+rghQJdKj2kagVK5QBE153DZgH50txW10XOkQBQVd4+Hw\nma5bFBvUCB+qLvWknTJAgmY4sAGsxhkqdAJgEu9i2tsA11hdzx57Aw2JA2OuRLmG\
nGTyZ+VAYkYsB3GYaklWtW6itunyxovgmbpy6MMuVAoGAJr1BLL0LpQN1dE/5fU6S\nGJrMv99FoLcUAZ+kWTWalOE6sq/xFDwnrimAZlfws6f4tmf1AdEnD0o0Ud/RXKgr\nDo1gF+4WkjbTiGVXZnrVz9yj6ZW6OCk4F09BGTzs/pA+wpYbnQUS2TU48vZFb0O6\
ndcwCF/Xy/igBYg3USm1TYB8=\n-----END PRIVATE KEY-----\n";
  
  return {
    "private_key": privateKey,
    "client_email": serviceAccountEmail,
    "token_uri": "https://accounts.google.com/o/oauth2/token"
  };
}


function replyToMessageFromSpreadsheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Counter Offer");

  // Get the last processed row number from Script Properties
  var lastProcessedRow = PropertiesService.getScriptProperties().getProperty("lastProcessedRow");
  lastProcessedRow = lastProcessedRow ? parseInt(lastProcessedRow) : 0;

  // Get all rows added after the last processed row
  var rows = sheet.getRange(lastProcessedRow + 1, 1, sheet.getLastRow() - lastProcessedRow, sheet.getLastColumn()).getValues();

  rows.forEach(function(row, index) {
    // Extract data from the row and construct the message,  row 0 means first column (A column), index 1 means frst column (A column)
    var quoteno = row [1];
    var companyName = row[6];
    var category = row[4];
    var email = row[3];
    var itemName = row[7];
    var rate = row[9];
    var messageId = row[13];
    var subcategory = row[5];
    var spaceId = row[12];
    var counterOffer = row[10];
    var remarks = row[11];
    var name = row[14];

    // Logger.log(rows + row[4] + row[5] + row[9] + spaceId + messageId + row[8]);
  
  var serviceAccountCredentials = getServiceAccountCredentials();
  var accessToken = getAccessToken(serviceAccountCredentials);
  
var replyText = {
     "cardsV2": [
    {
      "cardId": "unique-card-id",
      "card": {
        "sections": [
          {
            "widgets": [
              {
                "decoratedText": {
                  "text" : `<font color=\"#4914db\"><b>Quote No.</b></font> : ${quoteno}\n<font color=\"#4914db\"><b>Company Name</b></font> : ${companyName}\n<font color=\"#4616c9\"><b>Category</b></font> : ${category}\n<font color=\"#4519bd\"><b>Sub-category</b></font> : ${subcategory}\n<font color=\"#421bab\"><b>Item name</b></font> : ${itemName}\n<font color=\"#4523a1\"><b>Name</b></font> : ${name}\n<font color=\"#462899\"><b>Rate</b></font> : ₹ <b>${rate}</b>\n<font color=\"#462899\"><b>Counter Offer</b></font> : ₹ <b>${counterOffer}</b>\n<font color=\"#462899\"><b>Remarks</b></font> : ${remarks}`
                }
              },
            ],
          },
        ],
      },
    }
  ]
};
  var messageUrl = `https://chat.googleapis.com/v1/${spaceId}/messages?threadKey=${messageId}&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`;


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
    sheet.getRange(lastProcessedRow + index + 1, 16).setValue('Sent');
  } else {
    sheet.getRange(lastProcessedRow + index + 1, 16).setValue("Message not sent : " + messageResponse.getContentText());
    Logger.log("Error sending card message. Status code: " + messageResponse.getResponseCode());
    Logger.log("Error response: " + messageResponse.getContentText());
    Logger.log("Constructed Message URL: " + messageUrl);
  }
});
PropertiesService.getScriptProperties().setProperty("lastProcessedRow", sheet.getLastRow());
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
