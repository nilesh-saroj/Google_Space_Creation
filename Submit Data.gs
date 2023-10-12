function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Submit')
      .addItem('Submit Data', 'saveData')
      .addToUi();
}

function saveData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet1 = ss.getSheetByName("Data_Entry");
  
  
  // Get the values in column D (D5 and below)
  var columnFValues = sheet1.getRange("D5:D" + sheet1.getLastRow()).getValues();
  
  // Count the filled cells in column D
  var filledCount = columnFValues.reduce(function(count, row) {
    if (row[0] !== "") {
      return count + 1;
    }
    return count;
  }, 0);
  
  // Get the range of entire sheet from A5 to last filld row of G column.
  var dataRange = sheet1.getRange(`A5:H${filledCount+4}`);


  var dataValues = dataRange.getValues();
  
  // Check if all cells in the data range are filled before submitting
  if (dataValues.every(row => row.every(cell => cell !== ""))) {
    
    var destinationSpreadsheet = SpreadsheetApp.openById('1iZ5m7xRSfdp8fpKwEuGRk6kjznnBLRHbQnT9oiueUdE');
    
    // Get the destination sheet by name (replace 'DestinationSheetName' with the actual name)
    var destinationSheet = destinationSpreadsheet.getSheetByName('Main Data');
    
    // Append the data to the destination sheet
    destinationSheet.getRange(destinationSheet.getLastRow() + 1, 1, dataValues.length, dataValues[0].length).setValues(dataValues);
    
  
    // sheet1.getRange("A2:C" + sheet1.getLastRow()).clearContent();
    sheet1.getRange(5,4,sheet1.getLastRow(),1).clearContent();  // It will clear the content starting from row A5, column D4, upto the last row data of D, because condition 1 is given.
    sheet1.getRange(5,6,sheet1.getLastRow(),1).clearContent();  // It will clear the content starting from row A5, column E4, upto the last row data of E, because condition 1 is given.
    sheet1.getRange(5,8,sheet1.getLastRow(),1).clearContent();  // It will clear the content starting from row A5, column E4, upto the last row data of E, because condition 1 is given.
    SpreadsheetApp.getUi().alert("Data Submitted Successfully   ✅ 👍");
  } else {
    SpreadsheetApp.getUi().alert(`Please fill out all fields before submitting ${filledCount} ❗❗ 🤦‍♂️`);
  }


  // To limit the maximum number of rows in data_entry sheet
  var sheetName = "Data_Entry"; // Replace "YourSheetName" with the name of your specific sheet
  var maxRows = 100; // Set the maximum number of rows you want (in this case, 100)

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (sheet.getLastRow() > maxRows) {
    sheet.deleteRows(maxRows + 1, sheet.getLastRow() - maxRows);
    //SpreadsheetApp.getActiveSpreadsheet().toast("Maximum row limit reached (" + maxRows + " rows).");
}
}
