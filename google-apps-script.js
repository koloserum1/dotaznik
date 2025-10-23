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
    }
    
    // Detect user role from data
    const roleAnswer = data.answers[1] || '';
    let userRole = 'other';
    
    if (typeof roleAnswer === 'object' && roleAnswer.choiceIndex !== undefined) {
      const roleChoices = ['študent', 'učiteľ', 'rodič', 'sponzor/iný podporovateľ', 'absolvent', 'iné'];
      const roleText = roleChoices[roleAnswer.choiceIndex] || '';
      if (roleText.includes('študent')) userRole = 'student';
      else if (roleText.includes('učiteľ')) userRole = 'teacher';
      else if (roleText.includes('rodič')) userRole = 'parent';
    } else if (typeof roleAnswer === 'string') {
      if (roleAnswer.includes('študent')) userRole = 'student';
      else if (roleAnswer.includes('učiteľ')) userRole = 'teacher';
      else if (roleAnswer.includes('rodič')) userRole = 'parent';
    }
    
    // Create dynamic headers based on role
    let headers = [
      'Timestamp',
      'Session ID',
      'Rola',
      'Je kompletné?'
    ];
    
    // Add role-specific headers
    if (userRole === 'student') {
      headers = headers.concat([
        'Q2: Ročník',
        'Q3: Opis školy',
        'Q4: Stotožnenie s vizuálom (1-5)',
        'Q5: Vizualizácie - najviac evokujú',
        'Q6: Vizualizácie - najmenej evokujú',
        'Q7: Inšpiratívny dizajn (link)',
        'Q8: Imidž za 5-10 rokov',
        'Q9: Návštevnosť webu + užitočnosť',
        'Q10: Zapojenie do diskusie'
      ]);
    } else if (userRole === 'teacher') {
      headers = headers.concat([
        'Q2: Ako dlho pôsobíte',
        'Q3: Opis školy',
        'Q4: Hodnoty Lýcea',
        'Q5: Typický lýceista',
        'Q6: Odlišnosti od iných škôl',
        'Q7: Lýceum ako značka',
        'Q8: Komunikácia so svetom',
        'Q9: Zapojenie do diskusie'
      ]);
    } else if (userRole === 'parent') {
      headers = headers.concat([
        'Q2: Počet detí a ročníky',
        'Q3: Opis školy',
        'Q4: Ako deti hovoria o Lýceu',
        'Q5: Ako vy vnímate Lýceum',
        'Q6: Vizualizácie - najlepšie vystihuje',
        'Q7: Vizualizácie - nezodpovedá',
        'Q8: Čo by ľudia mali vedieť',
        'Q9: Zapojenie do diskusie'
      ]);
    } else {
      // Default headers for other roles
      headers = headers.concat([
        'Q2+: Odpovede',
        'Q3+: Odpovede',
        'Q4+: Odpovede',
        'Q5+: Odpovede',
        'Q6+: Odpovede',
        'Q7+: Odpovede',
        'Q8+: Odpovede',
        'Q9+: Odpovede',
        'Q10+: Odpovede'
      ]);
    }
    
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
    
    // Prepare row data - format answers properly
    const formattedAnswers = data.answers.map((answer, index) => {
      if (answer === undefined || answer === null || answer === '') {
        return '';
      }
      
      // Handle different answer types
      if (typeof answer === 'object') {
        // Handle choice with "other" text
        if (answer.choiceIndex !== undefined) {
          return answer.otherText || answer.choiceIndex.toString();
        }
        // Handle choice with textarea
        if (answer.textareaText !== undefined) {
          return `${answer.choiceIndex}: ${answer.textareaText}`;
        }
      }
      
      // Handle array answers (image choices, multiple selections)
      if (Array.isArray(answer)) {
        return answer.filter(a => a !== undefined && a !== null && a !== '').join(' | ');
      }
      
      return answer.toString();
    });
    
    // Extract role answer for the separate role column
    let roleText = '';
    const roleAnswer = data.answers[1];
    if (typeof roleAnswer === 'object' && roleAnswer.choiceIndex !== undefined) {
      const roleChoices = ['študent', 'učiteľ', 'rodič', 'sponzor/iný podporovateľ', 'absolvent', 'iné'];
      roleText = roleChoices[roleAnswer.choiceIndex] || '';
      if (roleAnswer.otherText) {
        roleText += ': ' + roleAnswer.otherText;
      }
    } else if (typeof roleAnswer === 'string') {
      roleText = roleAnswer;
    }
    
    // Skip intro (index 0) and role (index 1) from formatted answers
    const answersWithoutIntroAndRole = formattedAnswers.slice(2);
    
    const rowData = [
      data.timestamp,
      data.sessionId,
      roleText,
      data.isComplete ? 'Áno' : 'Nie',
      ...answersWithoutIntroAndRole
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

