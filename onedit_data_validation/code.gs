function onEdit(e)
{
  /*
   * Adds dependent drop down based on first option selected.
   *
   * Assumes you have a spreadsheet with at least two sheets:
   * - tabLists: The sheet with the options available. The first row will be the headers that are for the first column.
   * - tabValidation: The sheet where the actual data columns are.
   * 
   * Based on https://www.youtube.com/watch?v=8aOn0VMgG1w
   */
  // Specify the name of the sheet that has the 
  var tabLists = "Rules";
  var tabValidation = "Main";
  
  // Where are the headers
  var validationHeaders = 'A1:1';
  var dataToValidate = 'A2:A';
  
  // Location of the dependent cell
  // Positive values go to the right, negative to the left.
  // e.g. 1 = cell directly to the right of the current cell.
  var dependentCellOffset = 1;
  
  // Early check to short circuit if we aren't on the sheet we want to validate
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(ss.getSheetName() != tabValidation) {
    return; 
  }  
  
  var datass = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabLists);
  var activeCell = ss.getCurrentCell();
  
  var activeRow = activeCell.getRow();
  var activeCol = activeCell.getColumn();
  
  // Ensure we are in the correct range.
  var data_range = ss.getRange(dataToValidate);
  var rangeRowStart = data_range.getRow();
  var rangeRowEnd = rangeRowStart + data_range.getHeight() - 1;
  var rangeColStart = data_range.getColumn();
  var rangeColEnd = rangeColStart + data_range.getWidth() - 1;
  
  
  if(activeRow >= rangeRowStart && activeRow <= rangeRowEnd && activeCol >= rangeColStart && activeCol <= rangeColEnd)
  {
    // We are selecting the cell directly to the right of the current cell.
    var dependentCell = activeCell.offset(0, dependentCellOffset);
    
    dependentCell.clearContent().clearDataValidations();
    
    var headers = datass.getRange(validationHeaders).getValues();
    var headerIndex = headers[0].indexOf(activeCell.getValue()) + 1;
    
    // Is it a valid header option?
    if(headerIndex != 0)
    { 
      // Where the list of options are hard coded to be from row just under the header.
      var validationRange = datass.getRange(2, headerIndex, datass.getLastRow());
      var validationRule = SpreadsheetApp.newDataValidation().requireValueInRange(validationRange).build();
      dependentCell.setDataValidation(validationRule);
    }
  }
}
