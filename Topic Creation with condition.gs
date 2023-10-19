function getServiceAccountCredentials() {
  var serviceAccountEmail = "chat-room@eminent-card-400106.iam.gserviceaccount.com";
  var privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDqIHARmN+dqf9l\n1qal/EM5/n1M9mY76qiExK/jTJck5jmaFHrmKTkP7N/LVq4+sMlAnqQQztpAe3jl\n+I0V3Fnz78YCkxWb2uAXMBTzsDBDSnRZTr0lftIw8hzyQMFd5HUfbDSEyt02etwg\n9r8GDjJVFg6S55GRDRnITksQ9bNyMPRz4AsHEbfh/hDbeq8f30cJMunFljMV00iV\nVukEiNYROqnshc8cSzkw4OZS8efOAFje84ZKq03vGVFTRxZ1ps+vJ9bcgOGnItPr\nRVCnrtJVvomZNGOPK7so8cmc8tUFksiRNIi/LMsUHJ3nZEnBWW2+2SGFohksGloP\nU+DnOvINAgMBAAECggEAAv9HJrwz+ojonWGHegnrIks3Va/4CH9u7bzREFjga9PZ\nTo7Vqls05iRe97A84oqeq+FW+LYcxfDrVr2zHEAIV4BjASUrdv1V+b9Hl310USK8\n1+Gg7ZDSZknZfXz1GWI206AS9namr9fHKr4Fe773kbiYK4k4Deq1QROkxa6tbwQC\nyOASs0CsjOWcyTI3JwmKh1wxK3nBGVrKmaeh2TszVddMGFbrWDBSmoFXAob0tMcR\nBXmKnZsKIKav25G+NIzt2d19vnZouQAgv/g0Q9E9Kjbf4LHmYXMIG0FzHngNM76g\nEPEUKdLWTqOc1+7BAVCi/Lu6Gt3ckmrnXK5kz/l2uwKBgQD1N1cVw4T1rlezC8CI\n5zlVEBDZR6WudtuvQXpibFUq/DbfkeCbHhQpYUZ0q6R9SlfIKSIa51r7x+BCJdDc\njDvA8ZRpd5hkNohXVbsJKII3sriOEkJDVDctvyyPuxuWNiRXTZ9rjAHp0XmdlQd/\nmRozTr4H817TpYOMeMnNNDKPhwKBgQD0bEBu9BGJR8+0YCLAlyxBsQ/aAaDY2mOz\n4fecBQw0joOrX5AwYwLXvBeJW6vrqufQRzAB+7abPTFndcGNBQYk7PGqIU5li+cD\n36VM7SqFjn67SHoi/5fazj0snAyl3xonjbO5VIX8qlnMXupgB5QRYXlthu9QZK2o\nuJqxU1hOywKBgQCW6HPDhQvyVlTKb1UR65qw6q4zyZABCkywUk+K+rh/N7Bdbl0X\nmS83OBIwAuG76WCUYhwHCpJHmP4+Nx+OWw768rEvJta19Yl6ldwBCtj4hhhl9n6p\nCM7cbGZ0HeYgTzmWMMMHYKZcyvlZLTnsIMCrCq6QHgohnh6S+FLY4mKrSQKBgEed\nWBuqQ2EXu1G8QTJwmLT+rghQJdKj2kagVK5QBE153DZgH50txW10XOkQBQVd4+Hw\nma5bFBvUCB+qLvWknTJAgmY4sAGsxhkqdAJgEu9i2tsA11hdzx57Aw2JA2OuRLmG\nGTyZ+VAYkYsB3GYaklWtW6itunyxovgmbpy6MMuVAoGAJr1BLL0LpQN1dE/5fU6S\nGJrMv99FoLcUAZ+kWTWalOE6sq/xFDwnrimAZlfws6f4tmf1AdEnD0o0Ud/RXKgr\nDo1gF+4WkjbTiGVXZnrVz9yj6ZW6OCk4F09BGTzs/pA+wpYbnQUS2TU48vZFb0O6\ndcwCF/Xy/igBYg3USm1TYB8=\n-----END PRIVATE KEY-----\n";
  
  return {
    "private_key": privateKey,
    "client_email": serviceAccountEmail,
    "token_uri": "https://accounts.google.com/o/oauth2/token"
  };
}

var sentThreadKeys = {}; // Object to store sent thread keys

function replyToMessageFromSpreadsheet() {
  var spreadsheetId = "15WxwB2kpYnEa0VD8_3ZIVCnwa6Pms5dOoE-Aa9ypq8Y"; // Replace with your Spreadsheet ID
  var sheetName = "Item Name"; // Replace with the name of your sheet containing message IDs and texts

  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();
  var lastDataRow = sheet.getLastRow();
  var lastDataColumn = sheet.getLastColumn();

    // Find the last row with data in column B
  var columnBValues = sheet.getRange(2, 2, lastDataRow - 1, 1).getValues();
  var lastRowWithData = 1;
  for (var i = columnBValues.length - 1; i >= 0; i--) {
    if (columnBValues[i][0] !== "") {
      lastRowWithData = i + 2;
      break;
    }
  }

  for (var i = 1; i < lastRowWithData; i++) { // Assuming the first row contains headers, starting from row 2
    var replyText = data[i][0]; // Assuming reply texts are in the first column of the sheet
    var messageId = data[i][1]; // Assuming message IDs are in the second column of the sheet
    var subcategory = data[i][2]; // Sub category data
    var imageURL = data[i][3]; // image link
    var roomStatus = data[i][4]; // Room Status data (assuming it's in column E)
    var spaceId = "AAAAJTjt2sM"; // Replace with your space ID

    // Check if the Room Status is not "Room Created"
    if (roomStatus !== "Topic Created") {
      // Check if the thread key has already been sent
      if (!sentThreadKeys[messageId]) {
        replyToMessage(spaceId, messageId, replyText, subcategory, imageURL);
        sentThreadKeys[messageId] = true; // Mark the thread key as sent

        // Write "Room Created" in the Room Status column after sending the message
        sheet.getRange(i + 1, 5).setValue("Topic Created");
        
        Logger.log(`Message sent and Room Created status updated for ID: ${messageId}`);
      } else {
        Logger.log(`Skipping duplicate thread key: ${messageId}`);
      }
    } else {
      Logger.log(`Skipping message with Room Status 'Room Created': ${messageId}`);
    }
  }
}

function replyToMessage(spaceId, messageId, replyText, subcategory, imageURL) {
 
  var serviceAccountCredentials = getServiceAccountCredentials();
  var accessToken = getAccessToken(serviceAccountCredentials);
  
  var replyText = {
    
    'cardsV2': [{
        'cardId': 'createCardMessage',
        'card': {
          'header': {
            'title': replyText,
            'subtitle': subcategory,
            'imageUrl': imageURL,
            'imageType': 'CIRCLE'
          },     
        }
      }]
  };
   
  var messageUrl = `https://chat.googleapis.com/v1/spaces/${spaceId}/messages?threadKey=${messageId}&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`;

  // Headers for the API request
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

  // Make API request to send the card message
  var messageResponse = UrlFetchApp.fetch(messageUrl, messageOptions);
  Logger.log("Card Message API Response: " + messageResponse.getContentText());
  var responseData = JSON.parse(messageResponse.getContentText());


  if (messageResponse.getResponseCode() === 200) {
    Logger.log("Card Message sent successfully");
    Logger.log("Message sent successfully with ID: " + messageId);
  
  } else {
    Logger.log("Error sending card message. Status code: " + messageResponse.getResponseCode());
    Logger.log(messageUrl);
    Logger.log("Error response: " + messageResponse.getContentText());
  }
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







