function doPost(e) {
  try {
    Logger.log('doPost called');
    Logger.log('e parameter: ' + JSON.stringify(e));

    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    // Parse the incoming data
    let data;
    try {
      if (!e) throw new Error('No event parameter received');
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
        throw new Error('No data received in expected format');
      }
      Logger.log('Data received: ' + JSON.stringify(data));
    } catch (parseError) {
      Logger.log('Parse error: ' + parseError.toString());
      throw parseError;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // === 1. ZISTIME ROLU ===
    // Predpoklad: rola je vzdy na indexe 1 v data.answers
    // A naviac ju vsetci posielate lowercase, ("študent", "učiteľ", "rodič")
    let role = '';
    if (data.answers && Array.isArray(data.answers) && data.answers.length > 1) {
      const roleCandidate = (typeof data.answers[1] === 'string')
        ? data.answers[1].toLowerCase()
        : (typeof data.answers[1] === 'object' && data.answers[1].choiceIndex !== undefined ? ["študent","učiteľ","rodič"][data.answers[1].choiceIndex].toLowerCase() : '');
      if (roleCandidate.includes('študent')) role = 'student';
      else if (roleCandidate.includes('učiteľ')) role = 'ucitel';
      else if (roleCandidate.includes('rodič')) role = 'rodic';
    }
    if (!role) {
      Logger.log('Unknown or missing role. Answer[1] value: ' + JSON.stringify(data.answers[1]));
      role = 'student'; // fallback (nech to nestratíme)
    }

    // === 2. KONFIGURÁCIA ZÁHLAVÍ PRE KAŽDÝ SHEET ===
    const SHEET_CONFIG = {
      student: {
        title: 'student',
        headers: [
          'Timestamp', 'Session ID', 'Je kompletné?', 'Jazyk',
          'Intro (N/A)', 'Rola',
          'Študent - Ročník',
          'Stotožnenie s vizuálom (1-5)', 'Najlepší vizuál', 'Najhorší vizuál', 'Inšpiratívny dizajn (link)',
          'Imidž za 5-10 rokov', 'Opis školy pre neznámeho', 'Návštevnosť webu', 'Čo je vydarené na webe',
          'Lýceum ako človek/zviera/známka', 'Kontakt (meno/email)'
        ]
      },
      ucitel: {
        title: 'ucitel',
        headers: [
          'Timestamp', 'Session ID', 'Je kompletné?', 'Jazyk',
          'Intro (N/A)', 'Rola',
          'Učiteľ - doba pôsobenia',
          'Stotožnenie s vizuálom (1-5)', 'Najlepší vizuál', 'Najhorší vizuál', 'Inšpiratívny dizajn (link)', 'Imidž za 5-10 rokov',
          'Opis školy pre neznámeho', 'Lýceum ako človek/zviera/známka',
          'Komunikácia školy', 'Kontakt (meno/email)'
        ]
      },
      rodic: {
        title: 'rodic',
        headers: [
          'Timestamp', 'Session ID', 'Je kompletné?', 'Jazyk',
          'Intro (N/A)', 'Rola',
          'Rodič - Deti', 'Opis školy pre neznámeho', 'Rodič - Ako deti hovoria o Lýceu', 'Rodič - Osobné vnímanie Lýcea',
          'Najlepší obrázok atmosféry', 'Najhorší obrázok atmosféry',
          'Komunikácia školy (škály)', 'Kontakt (meno/email)'
        ]
      }
    };

    // 3. ZÍSKAJME/CHEJME SPRÁVNY SHEET
    let config = SHEET_CONFIG[role];
    let sheet = ss.getSheetByName(config.title);
    if (!sheet) {
      sheet = ss.insertSheet(config.title);
      sheet.getRange(1, 1, 1, config.headers.length).setValues([config.headers]);
      sheet.getRange(1, 1, 1, config.headers.length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, config.headers.length).setBackground('#4285f4');
      sheet.getRange(1, 1, 1, config.headers.length).setFontColor('#ffffff');
      sheet.getRange(1, 1, 1, config.headers.length).setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
      for (let i = 1; i <= config.headers.length; i++) {
        sheet.autoResizeColumn(i);
        sheet.setColumnWidth(i, Math.max(sheet.getColumnWidth(i), 150));
      }
    }

    // 4. PRIPRAVME DÁTA PRE ZÁPIS
    let rowData = [
      data.timestamp, data.sessionId, data.isComplete ? 'Áno' : 'Nie', data.language || 'sk'
    ];

    // Teraz si vezmeme answers podľa počtu kolónok
    for (let i = 0; i < config.headers.length - 4; i++) {
      rowData.push(data.answers[i] !== undefined ? data.answers[i] : '');
    }

    // 5. KONTROLA - AK UŽ EXISTUJE RIADOK S TÝMTO SESSION ID, AKTUALIZUJEME HO
    let lastRow = sheet.getLastRow();
    let rowToUpdate = -1;
    
    if (lastRow > 1) {
      // Session ID je v stĺpci 2 (index 1)
      const sessionIds = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (let i = 0; i < sessionIds.length; i++) {
        if (sessionIds[i][0] === data.sessionId) {
          rowToUpdate = i + 2; // +2 pretože: array je 0-indexed a riadok 1 je header
          Logger.log('Found existing session at row: ' + rowToUpdate);
          break;
        }
      }
    }

    // 6. ZÁPIS - AKTUALIZÁCIA ALEBO VYTVORENIE NOVÉHO RIADKU
    if (rowToUpdate > 0) {
      // Aktualizovať existujúci riadok
      Logger.log('Updating row: ' + rowToUpdate);
      sheet.getRange(rowToUpdate, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // Vytvoriť nový riadok
      Logger.log('Appending new row');
      sheet.appendRow(rowData);
    }
    
    lock.releaseLock();
    Logger.log('Success!');

    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Data saved successfully',
        'role': role
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

/**
 * Vymaže všetky sheety zadané v poli sheetNames (napr. ['student', 'ucitel', 'rodic'])
 * Ak niektorý z nich neexistuje, skript pokračuje bez chyby.
 */
function manuallyResetSheets(sheetNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  sheetNames.forEach(function(name) {
    let sheet = ss.getSheetByName(name);
    if (sheet) {
      ss.deleteSheet(sheet);
      Logger.log('Sheet deleted: ' + name);
    } else {
      Logger.log('Sheet not found, cannot delete: ' + name);
    }
  });
}
/**
 * Wrapper funkcia na rýchle vymazanie všetkých odpovedí.
 * Spustíš cez Apps Script menu → "runResetAllSheets"
 */
function runResetAllSheets() {
  manuallyResetSheets(['student', 'ucitel', 'rodic']);
}