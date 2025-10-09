# Lýceum Dotazník

Moderná webová aplikácia v štýle Typeform pre zber spätnej väzby o Lýceu.

## ✨ Funkcie

### Otázky a dizajn
- ✅ 15 otázok o škole Lýceum
- ✅ Moderný, minimalistický dizajn
- ✅ Multiple choice a open-ended otázky
- ✅ Responzívny layout (desktop, tablet, mobile)
- ✅ Plynulé animácie pri prechode medzi otázkami

### Navigácia a UX
- ✅ Tlačidlá "Späť" a "Pokračovať" / "Odoslať"
- ✅ Progress bar ukazujúci počet zodpovedaných otázok
- ✅ Počítadlo otázok (Otázka X z 15 | Zodpovedané: Y)
- ✅ Fixed navigation na mobile
- ✅ Keyboard navigation (Enter pre pokračovanie)

### Ukladanie odpovedí
- ✅ **Automatické ukladanie** do localStorage každých 10 sekúnd
- ✅ **Google Sheets integrácia** - odpovede sa odosielajú do tabuľky
- ✅ **Ukladanie čiastočných odpovedí** - aj keď používateľ nedokončí dotazník
- ✅ **Session tracking** - každá relácia má unikátne ID
- ✅ **Offline podpora** - odpovede sa uložia lokálne ak zlyhá internet
- ✅ **Auto-save pri odchode** - odpovede sa uložia pri zatvorení stránky

## 🚀 Spustenie

### Lokálne testovanie

```bash
python3 -m http.server 8000
```

Potom otvorte: `http://localhost:8000`

### Nastavenie Google Sheets

Pre ukladanie odpovedí do Google Sheets postupujte podľa návodu v súbore:
📖 **[GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)**

Stručne:
1. Vytvorte Google Sheets
2. Nastavte Apps Script (použite `google-apps-script.js`)
3. Deploy ako Web app
4. Skopírujte URL do `script.js`

## 📊 Technológie

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Ukladanie:** Google Sheets (cez Google Apps Script)
- **Záloha:** localStorage
- **Hosting:** Static hosting (GitHub Pages, Netlify, Vercel, atď.)

## 📁 Štruktúra projektu

```
typeform copy/
├── index.html              # Hlavná HTML stránka
├── styles.css              # CSS štýly
├── script.js               # JavaScript logika
├── google-apps-script.js   # Google Apps Script kód
├── GOOGLE_SHEETS_SETUP.md  # Návod na nastavenie
├── BRAND_MANUAL.md         # Brand manual s dizajnovými špecifikáciami
└── README.md               # Tento súbor
```

## 🎨 Brand Manual

Kompletné dizajnové špecifikácie nájdete v súbore:
📖 **[BRAND_MANUAL.md](BRAND_MANUAL.md)**

## 🔒 Bezpečnosť a súkromie

- Odpovede sú uložené v Google Sheets pod vaším účtom
- Session ID zabezpečuje unikátnosť odpovedí
- LocalStorage ako záloha pre offline režim
- Žiadne osobné údaje nie sú zbierané bez súhlasu

## 📱 Responzívny dizajn

- **Desktop:** Optimalizované pre 1920x1080 a vyššie
- **Tablet:** Optimalizované pre 768px - 1024px
- **Mobile:** Fixed navigation, optimalizované pre 320px+
- **Nízke obrazovky:** Špecifické media queries pre laptopy

## 🆘 Riešenie problémov

### Odpovede sa neukladajú do Google Sheets
- Skontrolujte URL v `script.js` (riadok 108)
- Skontrolujte Apps Script deployment nastavenia
- Pozrite Console v prehliadači (F12) pre chyby

### Progress bar nefunguje
- Obnovte stránku (F5)
- Vyčistite cache prehliadača

### Mobile navigácia sa nezobrazuje
- Skontrolujte šírku obrazovky (< 768px)
- Obnovte stránku

## 📞 GitHub

**Repozitár:** https://github.com/koloserum1/dotaznik

## 📄 Licencia

MIT License - používajte a modifikujte podľa potreby.

