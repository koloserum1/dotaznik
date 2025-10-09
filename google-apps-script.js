/**
 * Google Apps Script pre Lýceum Dotazník
 * 
 * INŠTRUKCIE:
 * 1. Otvorte Google Sheets
 * 2. Vytvorte nový hárok s názvom "Odpovede"
 * 3. Extensions → Apps Script
 * 4. Skopírujte tento kód
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Skopírujte Web app URL a nahraďte GOOGLE_SHEETS_URL v script.js
 */

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
      
      // Add headers
      const headers = [
        'Timestamp',
        'Session ID',
        'Je kompletné?',
        'Q1: Rola',
        'Q2: Opis školy',
        'Q3: Tri slová',
        'Q4: Hodnoty a princípy',
        'Q5: Výnimočnosť',
        'Q6: Slabiny',
        'Q7: Odporúčanie',
        'Q8: Logo a farby',
        'Q9: Tradície',
        'Q10: Imidž za 5-10 rokov',
        'Q11: Návštevnosť webu',
        'Q12: Čo je vydarené',
        'Q13: Čo chýba',
        'Q14: Nové funkcionality',
        'Q15: Ďalšie postrehy'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
      sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
      sheet.setFrozenRows(1);
      Logger.log('Headers created');
    }
    
    // Check if session already exists
    const lastRow = sheet.getLastRow();
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
    
    // Prepare row data
    const rowData = [
      data.timestamp,
      data.sessionId,
      data.isComplete ? 'Áno' : 'Nie',
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

