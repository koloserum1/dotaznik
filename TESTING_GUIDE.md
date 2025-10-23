# 🧪 Testovací Návod - Lýceum Dotazník

## Ako testovať dotazník

### 1. Otvorenie dotazníka
```bash
# Otvorte index.html v prehliadači
open index.html
```
Alebo jednoducho double-click na `index.html`

---

## ✅ Test Checklist

### **A. Test Flow pre Študenta**

1. **Intro obrazovka**
   - [ ] Zobrazuje sa úvodný text
   - [ ] Tlačidlo "Začať dotazník →" funguje
   - [ ] V pozadí sa zobrazuje obloha a zem

2. **Q1: Výber role**
   - [ ] Vyberte "študent"
   - [ ] Pozrite či sa pridala časť budovy (foundation)

3. **Q2: Ročník**
   - [ ] 4 možnosti (1-4 ročník)
   - [ ] Povinná otázka (*)
   - [ ] Po výbere sa pridá ďalšia časť budovy

4. **Q3: Opis školy**
   - [ ] Textarea funguje
   - [ ] Môžete písať viac riadkov

5. **Q4: Stotožnenie s vizuálom (škála)**
   - [ ] 5 možností (1-5)
   - [ ] Hover efekt
   - [ ] Selected state

6. **Q5: Vizualizácie - najviac evokujú**
   - [ ] 6 obrázkov v grid layoute
   - [ ] Multiple selection
   - [ ] Checkmark sa zobrazuje pri výbere
   - [ ] Hover efekt (border modrá)

7. **Q6: Vizualizácie - najmenej evokujú**
   - [ ] Rovnaké obrázky
   - [ ] Multiple selection funguje

8. **Q7: Inšpiratívny dizajn**
   - [ ] Textarea pre link

9. **Q8: Imidž za 5-10 rokov**
   - [ ] Textarea funguje

10. **Q9: Návštevnosť webu + užitočnosť**
    - [ ] 5 možností + "iné"
    - [ ] Textarea pod výberom
    - [ ] Obe časti sa uložia

11. **Q10: Zapojenie do diskusie**
    - [ ] Textarea funguje

12. **Dokončenie**
    - [ ] Zobrazí sa "Odoslať ✓" tlačidlo
    - [ ] Budova je kompletná
    - [ ] Konfety/sparkles sa animujú
    - [ ] Success message

---

### **B. Test Flow pre Učiteľa**

1. **Q1: Výber role**
   - [ ] Vyberte "učiteľ"
   - [ ] Flow sa prepne na učiteľské otázky

2. **Q2: Ako dlho pôsobíte**
   - [ ] 4 možnosti (< 1 rok, 1-2, 3, 4+)
   - [ ] Povinná otázka

3. **Q3-9: Textové otázky**
   - [ ] Všetky textareas fungujú
   - [ ] Auto-save (každých 2s po písaní)

4. **Budova**
   - [ ] Postupne sa stavia s každou odpoveďou
   - [ ] Správy sa menia

---

### **C. Test Flow pre Rodiča**

1. **Q1: Výber role**
   - [ ] Vyberte "rodič"
   - [ ] Flow sa prepne na rodičovské otázky

2. **Q2: Počet detí**
   - [ ] Textarea funguje

3. **Q6-7: Image choices**
   - [ ] Multiple selection funguje
   - [ ] Vizuálne indikátory

4. **Ostatné otázky**
   - [ ] Textareas fungujú

---

## 🎨 Vizuálne Testy

### **Building Visualization**
- [ ] Budova je viditeľná v pozadí (opacity 0.15-0.2)
- [ ] Každá odpoveď pridá novú časť
- [ ] Animácie sú plynulé (0.8s)
- [ ] Vlajka sa vlní na streche
- [ ] Konfety blikajú pri dokončení

### **Správy počas stavby**
- [ ] Zobrazujú sa pri pridaní časti budovy
- [ ] Miznú po 3 sekundách
- [ ] Správny text podľa progresu

### **Progress Bar**
- [ ] Ukazuje správny progress
- [ ] Počítadlo "Otázka X z Y"
- [ ] "Zodpovedané: N"

---

## ⌨️ Keyboard Navigation

- [ ] **Šípka vpravo** → Ďalšia otázka
- [ ] **Šípka vľavo** → Predchádzajúca otázka
- [ ] **Enter** → Ďalšia otázka (okrem textarea)
- [ ] **Shift + Enter** v textarea → nový riadok

---

## 💾 Persistence & Storage

### **LocalStorage**
1. Odpovedzte na pár otázok
2. Zavrite prehliadač/tab
3. Otvorte znova
4. [ ] Odpovede sú zachované
5. [ ] Progress budovy je zachovaný

### **Auto-save**
- [ ] Text sa uloží 2s po prestání písania
- [ ] Choices sa uložia okamžite
- [ ] Console.log ukazuje "Odpovede uložené lokálne"

---

## 📊 Google Sheets Integration

⚠️ **Poznámka:** Potrebné mať nastavené Google Sheets URL

1. Dokončite dotazník
2. Skontrolujte Google Sheet:
   - [ ] Timestamp
   - [ ] Session ID
   - [ ] Rola (správny text)
   - [ ] Je kompletné? (Áno)
   - [ ] Všetky odpovede sú v správnych stĺpcoch
   - [ ] Image choices sú formatované ako "0 | 2 | 4"
   - [ ] Choice with textarea obsahuje obe časti

---

## 📱 Responzívne Testovanie

### **Desktop (> 768px)**
- [ ] Budova je viditeľná v pozadí
- [ ] Image grid je 3 stĺpce
- [ ] Všetko sa zmestí na obrazovku

### **Mobile (< 768px)**
- [ ] Image grid je 2 stĺpce
- [ ] Obrázky sú menšie (100px výška)
- [ ] Text je čitateľný
- [ ] Tlačidlá sú dostatočne veľké

### Test na rôznych zariadeniach:
- [ ] Chrome Desktop
- [ ] Safari Desktop
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Firefox

---

## 🐛 Error Handling

### **Povinné otázky**
1. Nechajte povinnú otázku prázdnu
2. Stlačte "Pokračovať"
3. [ ] Zobrazí sa červená error správa
4. [ ] Správa zmizne po 3s
5. [ ] Neprejde na ďalšiu otázku

### **Network errors**
1. Vypnite internet
2. Dokončite dotazník
3. [ ] Zobrazí sa správa o lokálnom uložení
4. [ ] Data sú v localStorage

---

## ✨ WOW Efekty

### **Animations**
- [ ] Smooth transitions medzi otázkami
- [ ] Building parts majú bounce efekt
- [ ] Hover states sú responsive
- [ ] Konfety blikajú smooth

### **User Feedback**
- [ ] Progress sa updatuje po každej odpovedi
- [ ] Building messages sú motivačné
- [ ] Final celebration je výrazná

---

## 🔧 Debug Tools

### Browser Console:
```javascript
// Skontrolujte answers object
console.log(answers);

// Skontrolujte building progress
console.log(buildingProgress);

// Skontrolujte active questions
console.log(questions);

// Skontrolujte user role
console.log(userRole);
```

### LocalStorage:
```javascript
// Pozrieť uložené data
localStorage.getItem('lyceum_survey_' + sessionId);

// Vymazať data (reset)
localStorage.clear();
```

---

## ✅ Final Checklist

Po dokončení všetkých testov:

- [ ] Všetky tri role fungujú správne
- [ ] Building visualization sa stavia postupne
- [ ] Všetky typy otázok fungujú
- [ ] Odpovede sa ukladajú lokálne
- [ ] Odpovede sa posielajú do Sheets
- [ ] Responzívny dizajn funguje
- [ ] Keyboard navigation funguje
- [ ] Error handling funguje
- [ ] Animácie sú plynulé
- [ ] Žiadne chyby v konzole

---

## 🎉 Success Criteria

Dotazník je hotový na produkciu, ak:
1. ✅ Všetky tri role majú vlastné otázky
2. ✅ Budova sa stavia progresívne s WOW efektom
3. ✅ Všetky odpovede sa správne ukladajú
4. ✅ UI/UX je plynulé a intuitívne
5. ✅ Funguje na desktop aj mobile
6. ✅ Žiadne console errors

---

**Happy Testing! 🚀**

