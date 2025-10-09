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
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Odpovede');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Odpovede');
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
      newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      newSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      newSheet.setFrozenRows(1);
    }
    
    const data = JSON.parse(e.postData.contents);
    
    // Check if session already exists
    const existingData = sheet.getDataRange().getValues();
    let rowToUpdate = -1;
    
    for (let i = 1; i < existingData.length; i++) {
      if (existingData[i][1] === data.sessionId) {
        rowToUpdate = i + 1; // +1 because rows are 1-indexed
        break;
      }
    }
    
    // Prepare row data
    const rowData = [
      data.timestamp,
      data.sessionId,
      data.isComplete ? 'Áno' : 'Nie',
      ...data.answers
    ];
    
    if (rowToUpdate > 0) {
      // Update existing row
      sheet.getRange(rowToUpdate, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // Append new row
      sheet.appendRow(rowData);
    }
    
    lock.releaseLock();
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script is running. Use POST method to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

