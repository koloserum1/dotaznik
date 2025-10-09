# Lýceum Dotazník - Brand Manual

## Prehľad projektu
Moderná webová aplikácia v štýle Typeform pre zber spätnej väzby o škole Lýceum. Aplikácia obsahuje 15 otázok a je plne responzívna.

## Technické špecifikácie

### Základné nastavenia
- **Jazyk:** Slovenský
- **Font:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- **Pozadie:** #ffffff (čistá biela)
- **Výška:** 100vh (celá obrazovka)
- **Šírka:** max-width: 700px, centrovane

### Farbová paleta

#### Primárne farby
- **Hlavná modrá:** #1967d2
- **Svetlá modrá:** #e8f0fe
- **Hover modrá:** #d2e3fc
- **Čierna:** #000000
- **Sivá text:** #5f6368
- **Sivá border:** #dadce0
- **Sivá placeholder:** #c4c7cc
- **Temná sivá:** #5f6368

#### Použitie farieb
- **Text otázok:** #000000
- **Popis otázok:** #5f6368
- **Vybrané choice:** #e8f0fe s border #1967d2
- **Choice text:** #1967d2
- **Input border:** #dadce0
- **Input focus:** #1967d2

## Typografia

### Veľkosti fontov

#### Desktop
- **Číslo otázky:** 24px, font-weight: 400
- **Názov otázky:** 24px, font-weight: 400, line-height: 1.3
- **Popis otázky:** 14px, font-weight: 400, italic
- **Choice text:** 16px, font-weight: 400
- **Input text:** 20px, font-weight: 400
- **Hint text:** 13px, font-weight: 400

#### Mobile (max-width: 768px)
- **Číslo otázky:** 20px
- **Názov otázky:** 20px
- **Popis otázky:** 13px
- **Choice text:** 15px
- **Input text:** 18px
- **Hint text:** 12px

#### Nízke obrazovky (max-height: 700px)
- **Číslo otázky:** 20px
- **Názov otázky:** 20px
- **Popis otázky:** 13px
- **Choice text:** 14px

## Layout a spacing

### Základný layout
```css
body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow: hidden;
}
```

### Spacing
- **Margin bottom čísla otázky:** 12px (desktop), 10px (mobile)
- **Margin bottom názvu otázky:** 10px
- **Margin bottom popisu:** 30px (desktop), 24px (mobile)
- **Gap medzi choices:** 10px (desktop), 8px (mobile)
- **Padding choices:** 14px 18px (desktop), 12px 14px (mobile)

## Komponenty

### 1. Číslo otázky
```css
.question-number {
    font-size: 24px;
    color: #000000;
    font-weight: 400;
    margin-bottom: 12px;
}

.question-number::after {
    content: ' →';
}
```

### 2. Názov otázky
```css
.question-title {
    font-size: 24px;
    color: #000000;
    margin-bottom: 10px;
    line-height: 1.3;
    font-weight: 400;
    display: inline;
}
```

### 3. Popis otázky
```css
.question-description {
    font-size: 14px;
    color: #5f6368;
    margin-bottom: 30px;
    font-style: italic;
    display: block;
    margin-top: 6px;
}
```

### 4. Choice komponenty
```css
.choices {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 640px;
    overflow-y: auto;
    max-height: 50vh;
    padding-right: 5px;
}

.choice {
    background: #e8f0fe;
    border: 2px solid #e8f0fe;
    border-radius: 8px;
    padding: 14px 18px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #1967d2;
    position: relative;
    flex-shrink: 0;
}

.choice:hover {
    background: #d2e3fc;
    border-color: #d2e3fc;
}

.choice.selected {
    background: #e8f0fe;
    border-color: #1967d2;
    border-width: 2px;
}
```

### 5. Choice písmená
```css
.choice-letter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background: transparent;
    border: 2px solid #1967d2;
    border-radius: 4px;
    margin-right: 12px;
    font-weight: 600;
    color: #1967d2;
    font-size: 13px;
    flex-shrink: 0;
}
```

### 6. Choice close button
```css
.choice-close {
    display: none;
    width: 28px;
    height: 28px;
    background: #5f6368;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    flex-shrink: 0;
    margin-left: 12px;
}

.choice.selected .choice-close {
    display: flex;
}
```

### 7. Text input
```css
.text-input,
.textarea-input {
    width: 100%;
    max-width: 640px;
    border: none;
    border-bottom: 1px solid #dadce0;
    padding: 12px 0;
    font-size: 20px;
    color: #3c4043;
    font-family: inherit;
    outline: none;
    transition: border-color 0.3s ease;
    background: transparent;
}

.text-input:focus,
.textarea-input:focus {
    border-bottom-color: #1967d2;
    border-bottom-width: 2px;
}

.text-input::placeholder,
.textarea-input::placeholder {
    color: #c4c7cc;
}
```

### 8. Textarea špecifické
```css
.textarea-input {
    resize: none;
    min-height: 50px;
    max-height: 35vh;
}
```

### 9. Input hint
```css
.input-hint {
    margin-top: 12px;
    font-size: 13px;
    color: #1967d2;
}
```

## Responzívne breakpointy

### Mobile (max-width: 768px)
- Padding body: 15px
- Container max-width: 100%
- Choices max-height: 55vh
- Textarea max-height: 40vh

### Nízke obrazovky (max-height: 700px)
- Choices max-height: 45vh
- Textarea max-height: 30vh

## Scrollbar styling
```css
.choices::-webkit-scrollbar {
    width: 4px;
}

.choices::-webkit-scrollbar-track {
    background: transparent;
}

.choices::-webkit-scrollbar-thumb {
    background: #dadce0;
    border-radius: 4px;
}
```

## Animácie

### Fade in
```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Slide in
```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

## Kompletný zoznam otázok

### 1. Základné informácie o respondentovi
**Otázka:** "Aká je Vaša rola vo vzťahu k Lýceu?"
**Typ:** Multiple choice
**Možnosti:**
- A: študent
- B: učiteľ
- C: rodič
- D: sponzor/iný podporovateľ
- E: absolvent
- F: iné – uveďte

### 2. Vnímanie značky a hodnoty školy
**Otázka:** "Predstavte si, že hovoríte s niekým, kto Lýceum nepozná. Ako by ste v pár vetách opísali túto školu?"
**Typ:** Textarea

**Otázka:** "Ktoré tri slová alebo vlastnosti podľa Vás najlepšie vystihujú Lýceum?"
**Popis:** "(Môžete uviesť 1–3 prívlastky alebo krátke slovné spojenia)"
**Typ:** Textarea

**Otázka:** "Aké hodnoty a princípy podľa Vás Lýceum reprezentuje?"
**Popis:** "Čo sú tie hlavné idey, za ktorými si škola stojí?"
**Typ:** Textarea

**Otázka:** "Čím je podľa Vás Lýceum výnimočné?"
**Popis:** "Prečo by si študenti alebo rodičia mali vybrať práve túto školu oproti iným?"
**Typ:** Textarea

**Otázka:** "V čom vidíte najväčšie slabiny Lýcea alebo oblasti, ktoré by sa mali zlepšiť?"
**Typ:** Textarea

**Otázka:** "Odporučili by ste Lýceum svojim známym alebo rodine?"
**Popis:** "Prečo áno alebo prečo nie?"
**Typ:** Textarea

### 3. Vizuálna identita a tradície školy
**Otázka:** "Čo si myslíte o súčasnom logu, farbách a celkovom vizuálnom štýle Lýcea?"
**Popis:** "Vystihuje podľa Vás vizuál školy jej ducha, alebo by to chcelo zmenu? (Čo sa Vám na aktuálnom vizuáli páči a čo naopak nie?)"
**Typ:** Textarea

**Otázka:** "Sú podľa Vás nejaké tradície, symboly alebo historické prvky spojené s Lýceom, ktoré by sme mali zachovať či zdôrazniť v novej identite?"
**Popis:** "(Napríklad významná história školy, motto, logo školy, školské farby, tradičné podujatia a pod.)"
**Typ:** Textarea

**Otázka:** "Predstavte si, že o 5–10 rokov má Lýceum výbornú povesť presne takú, akú by ste si priali. Aký imidž alebo reputáciu by v ideálnom prípade mala škola mať?"
**Popis:** "(Inými slovami: čím by ste chceli, aby bolo Lýceum známe?)"
**Typ:** Textarea

### 4. Webová stránka a online prezentácia
**Otázka:** "Ako často a na aké účely navštevujete oficiálnu webovú stránku Lýcea?"
**Popis:** "(Napr. denne/týždenne alebo iba občas; a čo tam hľadáte – informácie o štúdiu, aktuality, rozvrh, kontakty, …)"
**Typ:** Textarea

**Otázka:** "Čo na súčasnej webovej stránke považujete za vydarené alebo užitočné?"
**Popis:** "(Je niečo, čo sa Vám na webe páči, dobre sa Vám používa alebo Vám to uľahčuje získavať informácie?)"
**Typ:** Textarea

**Otázka:** "A naopak – čo Vám na súčasnej webovej stránke najviac prekáža alebo chýba?"
**Popis:** "Opíšte, aké problémy ste pri používaní webu zažili alebo čo na ňom neviete nájsť."
**Typ:** Textarea

**Otázka:** "Aké nové funkcionality alebo obsah by ste uvítali na novej webovej stránke Lýcea?"
**Popis:** "Čo Vám tam teraz chýba, hoci by to bolo užitočné?"
**Typ:** Textarea

### 5. Záverečná otázka
**Otázka:** "Máte ešte nejaké ďalšie postrehy alebo nápady ohľadom značky, vizuálnej identity či komunikácie Lýcea, ktoré by ste nám chceli povedať?"
**Typ:** Textarea

## Implementačné poznámky

### JavaScript funkcionalita
- Automatický prechod na ďalšiu otázku po výbere choice
- Enter pre pokračovanie, Shift+Enter pre nový riadok
- Ukladanie odpovedí do answers objektu
- Animácie pri prechode medzi otázkami

### Responzívne správanie
- Všetko sa zmestí na obrazovku bez scrollovania
- Choices môžu scrollovať ak je ich veľa
- Textarea má max výšku aby neprepĺňala obrazovku
- Optimalizované pre mobile a tablet

### Accessibility
- Keyboard navigation (Enter, Shift+Enter)
- Focus states pre inputy
- Proper contrast ratios
- Semantic HTML štruktúra

## GitHub repozitár
**URL:** https://github.com/koloserum1/dotaznik.git

## Spustenie
```bash
python3 -m http.server 8000
```
Potom otvorte: `http://localhost:8000`
