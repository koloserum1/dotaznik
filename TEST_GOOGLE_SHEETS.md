# Test Google Sheets - Návod na riešenie problémov

## Krok 1: Aktualizujte Apps Script

**DÔLEŽITÉ:** Musíte aktualizovať kód v Google Apps Script!

1. Otvorte Apps Script editor (Extensions → Apps Script)
2. Vymažte starý kód
3. Skopírujte **nový kód** zo súboru `google-apps-script.js`
4. Kliknite **Uložiť** (Ctrl+S alebo ikona diskety)

## Krok 2: Vytvorte NOVÝ deployment

Potrebujete vytvoriť nový deployment, pretože sa zmenil kód:

1. V Apps Script kliknite **Deploy → New deployment**
2. Vyplňte:
   - Type: Web app
   - Description: "Lýceum v2"
   - Execute as: **Me**
   - Who has access: **Anyone**
3. Kliknite **Deploy**
4. **Skopírujte novú URL** (bude iná ako predošlá!)

## Krok 3: Aktualizujte URL v script.js

1. Otvorte `script.js`
2. Na riadku 108 nahraďte URL novou
3. Uložte súbor

## Krok 4: Otestujte v prehliadači

1. Obnovte stránku: `http://localhost:8000` (Cmd+Shift+R)
2. Otvorte Console (F12 → Console tab)
3. Vyplňte prvú otázku
4. V Console by ste mali vidieť:
   ```
   Odosielam do Google Sheets: {sessionId: "...", ...}
   Google Sheets response status: 200
   ✓ Odpovede odoslané do Google Sheets
   ```

## Krok 5: Skontrolujte Google Sheets

1. Otvorte Váš Google Sheets
2. Mala by sa vytvoriť záložka **"Odpovede"** s modrým headerom
3. Mali by tam byť Vaše odpovede

## Čo hľadať v Console:

### ✅ Úspešné odoslanie:
```
Odosielam do Google Sheets: {...}
Google Sheets response status: 200
✓ Odpovede odoslané do Google Sheets
```

### ❌ Chyba - nesprávna URL:
```
✗ Error sending to Google Sheets: TypeError: Failed to fetch
```
→ Skontrolujte URL v script.js

### ❌ Chyba - CORS:
```
Access to fetch has been blocked by CORS policy
```
→ Skontrolujte "Who has access: Anyone" v deployment

### ❌ Chyba 403:
```
Google Sheets response status: 403
```
→ Skontrolujte autorizáciu v Apps Script

## Alternatívny test - Použite Test Deployment

V Apps Script:

1. Kliknite **Test deployments** (vedľa Deploy)
2. Kliknite **Copy** URL
3. Použite túto URL na testovanie

## Debug Apps Script

Pre zobrazenie logov v Apps Script:

1. V Apps Script editore kliknite **Executions** (ikona hodín vľavo)
2. Uvidíte všetky volania a chyby
3. Kliknite na konkrétne volanie pre detail

## Ručný test cez curl (Terminal)

```bash
curl -X POST \
  -H "Content-Type: text/plain" \
  -d '{"sessionId":"test123","timestamp":"2025-10-09T23:00:00.000Z","isComplete":false,"answers":["študent","","","","","","","","","","","","","",""]}' \
  https://script.google.com/macros/s/AKfycbzNFLwSvkF2CBBGzdvuLqtixygDHmuNFwetbmXxKTwHUVGnookjOuBV1hlClJbQE_Up/exec
```

Ak funguje, uvidíte:
```json
{"result":"success","message":"Data saved successfully","row":2}
```

## Časté problémy

### 1. "Apps Script not authorized"
**Riešenie:**
- Znova prejdite autorizačným procesom
- Advanced → Go to [project] (unsafe) → Allow

### 2. Hárok sa nevytvorí
**Riešenie:**
- Skontrolujte Apps Script Executions pre chyby
- Vytvorte hárok manuálne s názvom "Odpovede"

### 3. Dáta sa neukladajú
**Riešenie:**
- Skontrolujte Console v prehliadači
- Skontrolujte Apps Script Executions
- Overte že URL je správna

### 4. Status 302 (redirect)
**Riešenie:**
- To je normálne - Google Apps Script redirectuje
- Pridali sme `redirect: 'follow'` v fetch

## Kontaktujte ma ak:

- Stále nefunguje po všetkých krokoch
- Vidíte chybu v Apps Script Executions
- Response status nie je 200

## Alternatíva: Použite Webhook.site na test

1. Otvorte https://webhook.site
2. Skopírujte Unique URL
3. Nahraďte GOOGLE_SHEETS_URL v script.js
4. Testujte dotazník
5. Uvidíte všetky prijaté dáta na webhook.site
6. Potom vráťte späť Google Sheets URL

