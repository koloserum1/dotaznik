# Google Sheets Setup - Návod

## Krok 1: Vytvorenie Google Sheets

1. Otvorte [Google Sheets](https://sheets.google.com)
2. Vytvorte nový hárok
3. Pomenujte ho napríklad **"Lýceum Dotazník - Odpovede"**

## Krok 2: Nastavenie Apps Script

1. V Google Sheets kliknite na **Extensions → Apps Script**
2. Otvorí sa nové okno s Code.gs súborom
3. Vymažte predvolený kód
4. Skopírujte celý obsah súboru `google-apps-script.js` a vložte ho
5. Kliknite na **Uložiť** (ikona diskety)

## Krok 3: Deployment Web App

1. Kliknite na **Deploy → New deployment**
2. Kliknite na ikonu ozubeného kolieska → **Web app**
3. Vyplňte nastavenia:
   - **Description:** "Lýceum Dotazník API"
   - **Execute as:** Me (vaše meno)
   - **Who has access:** Anyone
4. Kliknite na **Deploy**
5. Budete musieť autorizovať prístup:
   - Kliknite **Authorize access**
   - Vyberte svoj Google účet
   - Kliknite **Advanced** → **Go to [názov projektu] (unsafe)**
   - Kliknite **Allow**

## Krok 4: Skopírovanie URL

1. Po úspešnom deployment sa zobrazí **Web app URL**
2. Skopírujte túto URL (bude vyzerať takto):
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
3. Otvorte súbor `script.js` v projekte
4. Na riadku 108 nahraďte:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```
   Vašou skutočnou URL:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
   ```

## Krok 5: Testovanie

1. Obnovte stránku dotazníka (`http://localhost:8000`)
2. Vyplňte niekoľko otázok
3. Skontrolujte Google Sheets - mala by sa vytvoriť záložka **"Odpovede"** s dátami

## Štruktúra dát v Google Sheets

Tabuľka bude obsahovať tieto stĺpce:

| Stĺpec | Popis |
|--------|-------|
| Timestamp | Čas odoslania |
| Session ID | Unikátne ID relácie |
| Je kompletné? | Či bol dotazník dokončený |
| Q1-Q15 | Odpovede na jednotlivé otázky |

## Funkcie

### Automatické ukladanie
- ✅ Odpovede sa ukladajú **lokálne** (localStorage) každých 10 sekúnd
- ✅ Odpovede sa odosielajú do **Google Sheets** pri každej zmene
- ✅ Ak používateľ nevyplní celý dotazník, čiastočné odpovede sú stále uložené
- ✅ Pri opätovnom otvorení stránky môže pokračovať tam, kde skončil

### Duplikáty
- Ak niekto vyplní dotazník viackrát s rovnakým Session ID, **aktualizuje** sa existujúci riadok
- Každá nová relácia má unikátne Session ID

## Riešenie problémov

### Problém: Dáta sa neukladajú do Google Sheets
**Riešenie:**
1. Skontrolujte, či ste správne skopírovali Web app URL
2. Skontrolujte, či ste nastavili "Who has access: Anyone"
3. Skontrolujte Console v prehliadači (F12) pre chybové hlásenia

### Problém: "Authorization required"
**Riešenie:**
1. Prejdite cez autorizačný proces znova
2. Kliknite Advanced → Go to [project] (unsafe) → Allow

### Problém: Hárok "Odpovede" sa nevytvoril
**Riešenie:**
- Hárok sa vytvorí automaticky pri prvom odoslaní dát
- Alebo ho vytvorte manuálne s názvom presne **"Odpovede"**

## Alternatívne riešenia (ak nechcete Google Sheets)

### 1. Firebase Firestore
- Bezplatné až do určitého limitu
- Real-time databáza
- Potrebujete vytvoriť Firebase projekt

### 2. Airtable
- Podobné Google Sheets, ale s lepším API
- Bezplatný plán: 1,200 záznamov

### 3. Supabase
- Open-source alternatíva Firebase
- PostgreSQL databáza
- Bezplatný plán dostupný

### 4. Len LocalStorage
- Ak nepotrebujete centrálne ukladanie
- Dáta zostanú len v prehliadači používateľa
- Jednoduché na export cez Console

## Export dát z localStorage

Ak chcete exportovať dáta z localStorage (pre zálohu):

1. Otvorte Console (F12)
2. Zadajte:
```javascript
console.log(localStorage);
```
3. Alebo exportujte všetky odpovede:
```javascript
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith('lyceum_survey_')) {
    console.log(key, localStorage.getItem(key));
  }
}
```

## Bezpečnosť

- Web app je verejne prístupný (ktokoľvek s URL môže odosielať dáta)
- Session ID bráni duplicitám
- Pre produkčné nasadenie zvážte pridanie autentifikácie
- CORS je nastavený na "no-cors" pre jednoduchosť

## Podpora

Ak potrebujete pomoc, skontrolujte:
- Console v prehliadači (F12 → Console)
- Apps Script Execution log (View → Logs v Apps Script)
- Google Sheets - či sa dáta objavujú

