# Implementačné poznámky - Lýceum Dotazník

## 📋 Prehľad implementovaných funkcií

### 1. **Personalizovaný Flow podľa Role** ✅
- Dotazník sa dynamicky prispôsobuje podľa zvolenej role (študent, učiteľ, rodič)
- Každá rola má vlastnú sadu otázok
- Po výbere role sa automaticky načíta príslušný set otázok

**Role a počet otázok:**
- **Študent**: 10 otázok (vrátane intro + role)
- **Učiteľ**: 9 otázok (vrátane intro + role)
- **Rodič**: 9 otázok (vrátane intro + role)

### 2. **WOW Efekt - Budovanie školy** 🏫 ✅
Implementovaná progresívna vizualizácia budovy, ktorá sa stavia s každou odpoveďou:

**Komponenty budovy:**
1. Obloha a zem (úvodná scéna)
2. Základy
3. Prvé poschodie + okná
4. Dvere
5. Druhé poschodie + okná
6. Tretie poschodie + okná
7. Strecha
8. Cedula "LÝCEUM"
9. Stromy (dekorácia)
10. Vlajka na streche
11. Oslava (konfety/hviezdičky) pri dokončení

**Animácie:**
- Plynulé fade-in efekty pre každú časť
- Scale + translateY animácie pre "stavebný" efekt
- Vlajka sa vlní (wave animation)
- Sparkle efekty pri dokončení
- Motivačné správy počas stavby

**Správy počas budovania:**
- "Začíname stavať budúcnosť Lýcea..."
- "Pripravujeme základy..."
- "Stavíme prvé poschodie..."
- "Lýceum je postavené! 🎉"

### 3. **Nové typy otázok** ✅

#### a) **image_choice** - Výber z obrázkov
- Podpora pre single alebo multiple selection
- Hover efekty a animácie
- Checkmark indikátor pri výbere
- Responzívny grid layout
- Použité pre študentov a rodičov (vizualizácie školy)

#### b) **choice_with_textarea** - Výber + textová odpoveď
- Kombinácia radio button výberu s textarea
- Použité pre otázku o návštevnosti webu u študentov
- Samostatná sekcia pre textovú odpoveď pod výberom

### 4. **Otázky pre jednotlivé role**

#### **Študenti** (10 otázok):
1. Intro - Nový branding
2. Rola (všeobecná)
3. Ročník (1-4)
4. Opis školy
5. Stotožnenie s vizuálom (škála 1-5)
6. Vizualizácie - najviac evokujú (image_choice)
7. Vizualizácie - najmenej evokujú (image_choice)
8. Inšpiratívny dizajn (link)
9. Imidž za 5-10 rokov
10. Návštevnosť webu + užitočnosť (choice_with_textarea)
11. Zapojenie do diskusie

#### **Učitelia** (9 otázok):
1. Intro - Nový branding
2. Rola (všeobecná)
3. Ako dlho pôsobíte na Lýceu
4. Opis školy (osobná definícia)
5. Hodnoty Lýcea
6. Typický lýceista (správanie študentov)
7. Odlišnosti od iných škôl
8. Lýceum ako značka
9. Komunikácia so svetom (tón)
10. Zapojenie do diskusie

#### **Rodičia** (9 otázok):
1. Intro - Nový branding
2. Rola (všeobecná)
3. Počet detí a ročníky
4. Opis školy
5. Ako deti hovoria o Lýceu
6. Ako vy vnímate Lýceum
7. Vizualizácie - najlepšie vystihuje (image_choice)
8. Vizualizácie - nezodpovedá (image_choice)
9. Čo by ľudia mali vedieť o Lýceu
10. Zapojenie do diskusie

### 5. **Google Sheets integrácia** ✅

#### Dynamické hlavičky:
- Hlavičky sa automaticky prispôsobujú podľa role respondenta
- Každá rola má vlastné stĺpce v spreadsheet
- Správne formátovanie rôznych typov odpovedí:
  - Text / Textarea → priamy text
  - Choice → text voľby
  - Choice s "iné" → text voľby + doplnený text
  - Image choice (multiple) → indexy oddelené " | "
  - Choice with textarea → kombinácia oboch

#### Štruktúra riadku:
```
Timestamp | Session ID | Rola | Je kompletné? | Q2 | Q3 | Q4 | ...
```

### 6. **Technické vylepšenia** ✅

#### Auto-save:
- LocalStorage backup každých 10 sekúnd
- Okamžité uloženie pri výbere odpovede (choice, scale, image)
- Debounced save (2s) pre textové odpovede

#### Progres tracking:
- Progress bar ukazuje % dokončenia
- Počítadlo zodpovedaných otázok
- Vizuálne indikátory pre povinné otázky

#### UX vylepšenia:
- Smooth transitions medzi otázkami
- Keyboard navigation (šípky, Enter)
- Responzívny dizajn
- Loading states
- Error handling

## 🎨 Vizuálny dizajn

### Farby:
- **Primárna**: `#1967d2` (modrá)
- **Lýceum fialová**: `#6A1B9A`
- **Pozadie budovy**: Béžová (`#E8DCC4`)
- **Obloha gradient**: `#87CEEB` → `#E0F6FF`
- **Tráva**: `#90C468`

### Animácie:
- `buildPart`: 0.8s ease - stavba častí budovy
- `wave`: 2s infinite - vlnenie vlajky
- `sparkleFloat`: 3s infinite - blikanie konfiet
- `celebrationBurst`: 2s - finálna oslava

## 📁 Súborová štruktúra

```
/typeform copy/
├── index.html              # HTML s SVG budovou
├── script.js               # Hlavná logika, questions, flow
├── styles.css              # Všetky štýly + animácie
├── google-apps-script.js   # Backend pre Google Sheets
├── BRAND_MANUAL.md         # Brand guidelines
├── GOOGLE_SHEETS_SETUP.md  # Návod na setup
└── README.md               # Hlavný readme
```

## 🚀 Ako to funguje

### Flow:
1. **Intro** → Uvítacia obrazovka
2. **Role Selection** → Výber role
3. **Questions Rebuild** → Dynamicky sa načítajú otázky pre danú rolu
4. **Progressive Building** → S každou odpoveďou sa pridá kus budovy
5. **Completion** → Finálna budova + oslava + odoslanie do Google Sheets

### Kľúčové funkcie:

```javascript
// Budovanie vizualizácie
addBuildingPart()           // Pridá ďalší blok budovy
updateBuildingMessage()     // Zobrazí motivačnú správu

// Personalizácia
buildQuestionsForRole(role) // Načíta otázky pre rolu
selectImageChoice()         // Handling pre image výber
saveChoiceTextarea()        // Handling pre choice + textarea

// Navigation
nextQuestion()              // Posun + stavba budovy
previousQuestion()          // Návrat späť
```

## 🐛 Known Issues / TODOs

### Aktuálne dokončené:
- ✅ Personalizovaný flow
- ✅ Building visualization
- ✅ Image choice type
- ✅ Choice with textarea type
- ✅ Dynamic Google Sheets headers
- ✅ Všetky animácie
- ✅ CSS pre nové komponenty

### Ďalšie možné vylepšenia:
- [ ] Pridať skutočné obrázky namiesto placeholder (via.placeholder.com)
- [ ] A/B testing rôznych budov podľa role
- [ ] Export vizualizácie ako obrázok na konci
- [ ] Možnosť zdieľania na social media
- [ ] Pridať zvukové efekty pri stavbe (optional)

## 📝 Poznámky pre deployment

1. **Obrázky pre image_choice:**
   - Aktuálne sú použité placeholder obrázky
   - Potrebné nahradiť reálnymi vizualizáciami
   - Odporúčaná veľkosť: 300x200px
   - Format: JPG/PNG/WebP

2. **Google Sheets URL:**
   - V `script.js` riadok 270
   - Aktualizovať po deploy Google Apps Script

3. **Testing:**
   - Testovať všetky tri role
   - Overiť responzívnosť na mobile
   - Kontrola ukladania do Sheets

## 🎉 Výsledok

Dotazník teraz ponúka:
- **Personalizovaný zážitok** pre každú rolu
- **Interaktívnu vizualizáciu** s WOW efektom
- **Moderný dizajn** s plynulými animáciami
- **Robustnú funkcionalitu** s auto-save a error handling
- **Responzívny layout** pre všetky zariadenia

**Celkový čas vývoja:** ~2-3 hodiny  
**Počet riadkov kódu:** ~1500+ lines

