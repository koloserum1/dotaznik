function doPost(e) {
  try {
    Logger.log('doPost called');
    Logger.log('e parameter: ' + JSON.stringify(e));
    
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);
    
    // Parse the incoming data
    let data;
    try {
      if (!e) {
        throw new Error('No event parameter received');
      }
      
      if (e.postData && e.postData.contents) {
        Logger.log('Using e.postData.contents');
        data = JSON.parse(e.postData.contents);
      } else if (e.parameter && e.parameter.data) {
        Logger.log('Using e.parameter.data');
        data = JSON.parse(e.parameter.data);
      } else if (e.parameter) {
        Logger.log('Using e.parameter');
        data = e.parameter;
      } else if (e.queryString) {
        Logger.log('Using e.queryString');
        data = JSON.parse(decodeURIComponent(e.queryString));
      } else {
        Logger.log('Available keys: ' + Object.keys(e).join(', '));
        throw new Error('No data received in expected format');
      }
      Logger.log('Data received: ' + JSON.stringify(data));
    } catch (parseError) {
      Logger.log('Parse error: ' + parseError.toString());
      throw parseError;
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Odpovede');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      Logger.log('Creating new sheet: Odpovede');
      sheet = ss.insertSheet('Odpovede');
    }
    
    // Updated headers based on new question structure
    const headers = [
      'Timestamp',
      'Session ID',
      'Je kompletné?',
      'Jazyk',
      'Q0: Intro (N/A)',
      'Q1: Rola',
      'Q2: Študent - Ročník / Učiteľ - Doba pôsobenia / Rodič - Deti',
      'Q3: Stotožnenie s vizuálom (1-5)',
      'Q4: Najlepší vizuál (obrázok)',
      'Q5: Najhorší vizuál (obrázok)',
      'Q6: Inšpiratívny dizajn (link)',
      'Q7: Imidž za 5-10 rokov',
      'Q8: Opis školy pre neznámeho',
      'Q9: Návštevnosť webu',
      'Q10: Čo je vydarené na webe',
      'Q11: Lýceum ako človek/zviera/známka',
      'Q12: Kontakt (meno/email)',
      'Q13: Komunikácia školy (iba učiteľ)',
      'Q14: Rodič - Ako deti hovoria o Lýceu',
      'Q15: Rodič - Osobné vnímanie Lýcea',
      'Q16: Rodič - Najlepší obrázok atmosféry',
      'Q17: Rodič - Najhorší obrázok atmosféry'
    ];
    
    let lastRow = sheet.getLastRow();
    
    // Check if we need to reset/update headers
    if (lastRow === 0 || sheet.getRange(1, 1).getValue() !== 'Timestamp' || sheet.getRange(1, 4).getValue() !== headers[3]) {
      Logger.log('Creating/Recreating headers');
      
      // Clear first row and recreate
      if (lastRow > 0) {
        sheet.getRange(1, 1, 1, headers.length).clearContent();
      }
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
      sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
      sheet.getRange(1, 1, 1, headers.length).setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
      
      // Auto-resize columns for better readability
      for (let i = 1; i <= headers.length; i++) {
        sheet.autoResizeColumn(i);
        sheet.setColumnWidth(i, Math.max(sheet.getColumnWidth(i), 150));
      }
      
      Logger.log('Headers created/updated');
    }
    
    // Check if session already exists - refresh lastRow after potential header creation
    lastRow = sheet.getLastRow();
    let rowToUpdate = -1;
    
    if (lastRow > 1) {
      const sessionIds = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (let i = 0; i < sessionIds.length; i++) {
        if (sessionIds[i][0] === data.sessionId) {
          rowToUpdate = i + 2; // +2 because: array is 0-indexed, and row 1 is header
          Logger.log('Found existing session at row: ' + rowToUpdate);
          break;
        }
      }
    }
    
    // Prepare row data with new structure
    const rowData = [
      data.timestamp,
      data.sessionId,
      data.isComplete ? 'Áno' : 'Nie',
      data.language || 'sk', // Add language field
      ...data.answers
    ];
    
    Logger.log('Row data prepared: ' + rowData.length + ' columns');
    
    if (rowToUpdate > 0) {
      // Update existing row
      Logger.log('Updating row: ' + rowToUpdate);
      sheet.getRange(rowToUpdate, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // Append new row
      Logger.log('Appending new row');
      sheet.appendRow(rowData);
    }
    
    lock.releaseLock();
    Logger.log('Success!');
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success',
        'message': 'Data saved successfully',
        'row': rowToUpdate > 0 ? rowToUpdate : (lastRow + 1)
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': error.toString(),
        'stack': error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script is running. Use POST method to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}