function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('QR Code')
      .addItem('Generate QR Code', 'generateQRCode')
      .addToUi();
}

function generateQRCode() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("QR Code");

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

  var dataRange = sheet.getRange(2, 1, lastRowWithData - 1, lastDataColumn - 1  );
  var data = dataRange.getValues();
  var statuses = sheet.getRange(2, lastDataColumn, lastRowWithData - 1, 1).getValues(); // Column H is the lastDataColumn (index is 1-based)


  // Get the values in column D (D5 and below)
  var columnFValues = sheet.getRange("A2:F" + lastRowWithData).getValues();
  
  // Count the filled cells in column D
  var filledCount = columnFValues.reduce(function(count, row) {
    if (row[0] !== "") {
      return count + 1;
    }
    return count;
  }, 0);
  
  // Get the range of entire sheet from A5 to last filld row of F column.
  var dataRange = sheet.getRange(`A2:F${lastRowWithData}`);

  var dataValues = dataRange.getValues();
  
  // Check if all cells in the data range are filled before submitting
  if (dataValues.every(row => row.every(cell => cell !== ""))) {

      for (var i = 0; i < data.length; i++) {
        var status = statuses[i][0];
        if (status !== "QR Code Generated") {
          try {
            var row = data[i];

            var firstName = row[1];
            var lastName = row[2];
            var email = row[3];
            var companyName = row[4];
            var phone = row[5];

            var vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${firstName} ${lastName}\nEMAIL:${email}\nTEL:${phone}\nORG:${companyName}\nEND:VCARD`;
            var qrCodeUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(vCardData)}`;

            var response = UrlFetchApp.fetch(qrCodeUrl);
            var blob = response.getBlob();

            // Save the QR code image to Google Drive
            var folder = DriveApp.getFolderById("12UT3-MNR89FqQqgIzi0rETWkfD3_slVe"); // Google Drive folder ID
            var filename = `${firstName}_${lastName}_vCard_QRCode.png`; //  Filename
            var file = folder.createFile(blob.setName(filename));

            // Get the URL of the saved file
            var fileUrl = file.getUrl();

            // Update the URL and status in the current row of the Google Sheet
            sheet.getRange(i + 2, 7).setValue(fileUrl); // The URL column is the 7th column (column G)
            sheet.getRange(i + 2, 8).setValue("QR Code Generated");
          } catch (error) {
            sheet.getRange(i + 2, 8).setValue("Error: " + error.message);
            continue; // Skip to the next iteration if there's an error
          }
        }
      }

  SpreadsheetApp.getUi().alert("QR Code(s) generated successfully ✅ or with errors.");
}
    else {
        SpreadsheetApp.getUi().alert(`Please fill out all fields before submitting ${filledCount} ❗❗ 🤦‍♂️`);
        Logger.log(lastRowWithData);
      }
}
