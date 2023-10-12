  function populateFormOptions() {
  // Open the Google Sheet by its ID
  var sheet = SpreadsheetApp.openById("1l-Y0JcmsQynre0zDkbgFQw33OFjDQVlNjA_vRsi9Gn8");
  
  // Access your form by its ID
  var form = FormApp.openById('1jkuTsJZJ-kg5RagCppXIiwaHUHTx9B8vobVEmGFWB1A');
  
  // Define an array of question data, each containing the question title and its corresponding column
  var questionData = [
    { questionTitle: 'Category', column: 'A' }, // Example: Options for Question 1 in column A
    { questionTitle: 'Sub-Category', column: 'B' }, // Example: Options for Question 2 in column B
    { questionTitle: 'Item Name', column: 'C' }, // Example: Options for Question 3 in column C.
    { questionTitle: 'Units', column: 'D' } // Example: Options for Question 4 in column D
  ];
  
  // Loop through the question data and set options for each question
  for (var i = 0; i < questionData.length; i++) {
    var questionInfo = questionData[i];
    var question = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).filter(function(item) {
      return item.getTitle() === questionInfo.questionTitle;
    })[0];
    
    if (question) {
      // Get the last row with data in the specified column
      var lastRow = sheet.getSheetByName("Item_Data").getRange(questionInfo.column + "2:" + questionInfo.column + sheet.getLastRow()).getValues().filter(function(row) {
        return row[0] !== "";
      });
      
      // Extract options from the last rows of the column
      var options = lastRow.map(function(row) {
        return row[0];
      });
      
      // Set the choices for the question
      question.asMultipleChoiceItem().setChoiceValues(options);
    }
  }
}
