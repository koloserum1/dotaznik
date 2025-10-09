// Survey questions data
const questions = [
    {
        number: 0,
        title: "Nový branding Lýcea",
        description: "",
        type: "intro",
        content: `Milí študenti, učitelia, rodičia, absolventi a priatelia Lýcea,

pracujeme na novej vizuálnej identite a webovej prezentácii školy.
Chceme, aby Lýceum navonok vyzeralo tak, ako ho všetci reálne vnímame – ako moderné, otvorené a inšpiratívne miesto.

Pomôžte nám lepšie pochopiť, čo pre vás Lýceum znamená. Dotazník je anonymný a zaberie len pár minút. Ďakujeme, že ste súčasťou tejto zmeny. 💜`
    },
    {
        number: 1,
        title: "Aká je Vaša rola vo vzťahu k Lýceu?",
        description: "",
        type: "choice",
        choices: [
            "študent",
            "učiteľ",
            "rodič",
            "sponzor/iný podporovateľ",
            "absolvent",
            "iné – uveďte"
        ]
    },
    {
        number: 2,
        title: "Predstavte si, že hovoríte s niekým, kto Lýceum nepozná. Ako by ste v pár vetách opísali túto školu?",
        description: "",
        type: "textarea"
    },
    {
        number: 3,
        title: "Ako veľmi sa stotožňujete s výrokom:",
        description: "\"Vizuálna identita a komunikácia Lýcea dnes vystihuje, akou školou v skutočnosti sme.\"",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ["Vôbec nesúhlasím", "Úplne súhlasím"]
    },
    {
        number: 4,
        title: "Ktoré tri slová alebo vlastnosti podľa Vás najlepšie vystihujú Lýceum?",
        description: "(Môžete uviesť 1–3 prívlastky alebo krátke slovné spojenia)",
        type: "multiple_text",
        textFields: [
            { label: "Slovo 1", required: true },
            { label: "Slovo 2", required: false },
            { label: "Slovo 3", required: false }
        ]
    },
    {
        number: 5,
        title: "Čím je podľa Vás Lýceum výnimočné?",
        description: "Prečo by si študenti alebo rodičia mali vybrať práve túto školu oproti iným?",
        type: "textarea"
    },
    {
        number: 6,
        title: "V čom vidíte najväčšie slabiny Lýcea alebo oblasti, ktoré by sa mali zlepšiť?",
        description: "",
        type: "textarea"
    },
    {
        number: 7,
        title: "Predstavte si, že o 5–10 rokov má Lýceum výbornú povesť presne takú, akú by ste si priali. Aký imidž alebo reputáciu by v ideálnom prípade mala škola mať?",
        description: "(Inými slovami: čím by ste chceli, aby bolo Lýceum známe?)",
        type: "textarea"
    },
    {
        number: 8,
        title: "Ako často a na aké účely navštevujete oficiálnu webovú stránku Lýcea?",
        description: "",
        type: "choice",
        choices: [
            "Denne – potrebujem aktuálne info (rozvrh, aktuality, ...)",
            "Niekoľkokrát do týždňa",
            "Občas, len keď niečo konkrétne hľadám",
            "Zriedka alebo vôbec",
            "Nenavštevujem web, informácie získavam inde"
        ]
    },
    {
        number: 9,
        title: "Čo na súčasnej webovej stránke považujete za vydarené alebo užitočné?",
        description: "(Je niečo, čo sa Vám na webe páči, dobre sa Vám používa alebo Vám to uľahčuje získavať informácie?)",
        type: "textarea"
    },
    {
        number: 10,
        title: "Ako by ste chceli, aby pôsobila nová vizuálna identita Lýcea?",
        description: "Aký dojem alebo emóciu by mala vyvolávať?",
        type: "textarea"
    },
    {
        number: 11,
        title: "Máte predstavu alebo nápad, ako by mohlo vyzerať nové logo Lýcea?",
        description: "(Čo by malo symbolizovať, aké prvky alebo farby by mohlo obsahovať?)",
        type: "textarea"
    },
    {
        number: 12,
        title: "Máte nejaký obrázok, logo alebo dizajn, ktorý vás inšpiruje a mohol by byť pre Lýceum príkladom?",
        description: "(Môžete vložiť link na Google Drive, Dropbox alebo akúkoľvek URL obrázka)",
        type: "textarea"
    },
    {
        number: 13,
        title: "Máte ešte nejaké ďalšie postrehy alebo nápady ohľadom značky, vizuálnej identity či komunikácie Lýcea, ktoré by ste nám chceli povedať?",
        description: "",
        type: "textarea"
    }
];

let currentQuestion = 0;
let answers = {};
let sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// Google Sheets Web App URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwlp_LoD1yVhP3oO6wa8RGnope0oOWptWYsLnDPJJlZjpkGv36TgGxlb0miBCWVWFI/exec';

// Initialize the survey
function initSurvey() {
    // Load saved answers from localStorage
    loadSavedAnswers();
    
    renderQuestions();
    showQuestion(0);
    updateProgress();
    updateNavigation();
    
    // Auto-save every 10 seconds
    setInterval(saveToLocalStorage, 10000);
}

// Load saved answers from localStorage
function loadSavedAnswers() {
    try {
        const saved = localStorage.getItem('lyceum_survey_' + sessionId);
        if (saved) {
            answers = JSON.parse(saved);
            console.log('Načítané uložené odpovede:', answers);
        }
    } catch (e) {
        console.error('Error loading saved answers:', e);
    }
}

// Save to localStorage
function saveToLocalStorage() {
    try {
        const data = {
            sessionId: sessionId,
            answers: answers,
            currentQuestion: currentQuestion,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('lyceum_survey_' + sessionId, JSON.stringify(data));
        console.log('Odpovede uložené lokálne');
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

// Send to Google Sheets
async function sendToGoogleSheets(isComplete = false) {
    // Skip if URL not configured
    if (GOOGLE_SHEETS_URL.includes('YOUR_DEPLOYMENT_ID')) {
        console.log('Google Sheets URL nie je nastavená');
        return true; // Return true to show success message
    }
    
    try {
        const answersArray = [];
        const timestamp = new Date().toISOString();
        
        // Prepare data for Google Sheets
        questions.forEach((q, index) => {
            let answer = '';
            if (answers[index] !== undefined && answers[index] !== null) {
                if (q.type === 'intro') {
                    answer = 'N/A'; // Intro doesn't have answer
                } else if (q.type === 'choice') {
                    answer = q.choices[answers[index]];
                } else if (q.type === 'scale') {
                    answer = answers[index].toString();
                } else if (q.type === 'multiple_text') {
                    // Join array answers with " | "
                    answer = Array.isArray(answers[index]) 
                        ? answers[index].filter(a => a).join(' | ') 
                        : '';
                } else {
                    answer = answers[index];
                }
            }
            answersArray.push(answer);
        });
        
        const data = {
            sessionId: sessionId,
            timestamp: timestamp,
            isComplete: isComplete,
            answers: answersArray
        };
        
        console.log('Odosielam do Google Sheets:', data);
        
        // Create URL with query parameters as backup method
        const params = new URLSearchParams();
        params.append('data', JSON.stringify(data));
        
        const response = await fetch(GOOGLE_SHEETS_URL + '?' + params.toString(), {
            redirect: 'follow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        });
        
        console.log('Google Sheets response status:', response.status);
        
        if (response.ok) {
            const result = await response.text();
            console.log('Google Sheets response:', result);
        }
        
        console.log('✓ Odpovede odoslané do Google Sheets');
        return true;
    } catch (e) {
        console.error('✗ Error sending to Google Sheets:', e);
        return false;
    }
}

// Render all questions
function renderQuestions() {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.id = `question-${index}`;

        let contentHTML = '';
        
        // Don't show number for intro
        if (q.type !== 'intro') {
            contentHTML += `<div class="question-number" data-number="${q.number}"></div>`;
        }
        
        contentHTML += `<h2 class="question-title ${q.type === 'intro' ? 'intro-title' : ''}">${q.title}</h2>`;

        if (q.description) {
            contentHTML += `<p class="question-description">${q.description}</p>`;
        }

        if (q.type === 'intro') {
            contentHTML += `<div class="intro-content">${q.content.replace(/\n/g, '<br>')}</div>`;
            contentHTML += `<button class="intro-button" onclick="nextQuestion()">Začať dotazník →</button>`;
        } else if (q.type === 'choice') {
            contentHTML += '<div class="choices">';
            q.choices.forEach((choice, choiceIndex) => {
                const letter = String.fromCharCode(65 + choiceIndex); // A, B, C, etc.
                contentHTML += `
                    <div class="choice" onclick="selectChoice(${index}, ${choiceIndex})">
                        <div class="choice-content">
                            <span class="choice-letter">${letter}</span>
                            <span>${choice}</span>
                        </div>
                        <div class="choice-close">✕</div>
                    </div>
                `;
            });
            contentHTML += '</div>';
        } else if (q.type === 'text') {
            contentHTML += `
                <input type="text" 
                       class="text-input" 
                       id="input-${index}" 
                       placeholder="Type your answer here..."
                       oninput="saveTextAnswer(${index})">
                <div class="input-hint">Shift ⇧ + Enter ↵ to make a line break</div>
            `;
        } else if (q.type === 'textarea') {
            contentHTML += `
                <textarea class="textarea-input" 
                          id="input-${index}" 
                          placeholder="Type your answer here..."
                          oninput="saveTextAnswer(${index})"></textarea>
                <div class="input-hint">Shift ⇧ + Enter ↵ to make a line break</div>
            `;
        } else if (q.type === 'scale') {
            contentHTML += '<div class="scale-container">';
            contentHTML += '<div class="scale-options">';
            for (let i = q.scaleMin; i <= q.scaleMax; i++) {
                contentHTML += `
                    <div class="scale-option" onclick="selectScale(${index}, ${i})">
                        <div class="scale-number">${i}</div>
                    </div>
                `;
            }
            contentHTML += '</div>';
            contentHTML += '<div class="scale-labels">';
            contentHTML += `<span class="scale-label-min">${q.scaleLabels[0]}</span>`;
            contentHTML += `<span class="scale-label-max">${q.scaleLabels[1]}</span>`;
            contentHTML += '</div>';
            contentHTML += '</div>';
        } else if (q.type === 'multiple_text') {
            contentHTML += '<div class="multiple-text-container">';
            q.textFields.forEach((field, fieldIndex) => {
                contentHTML += `
                    <div class="text-field-group">
                        <label class="text-field-label">${field.label}${field.required ? ' *' : ''}</label>
                        <input type="text" 
                               class="text-input" 
                               id="input-${index}-${fieldIndex}" 
                               placeholder="${field.label}"
                               oninput="saveMultipleTextAnswer(${index}, ${fieldIndex})"
                               ${field.required ? 'required' : ''}>
                    </div>
                `;
            });
            contentHTML += '</div>';
        }

        questionDiv.innerHTML = contentHTML;
        container.appendChild(questionDiv);
    });
}

// Show specific question
function showQuestion(index) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    const question = document.getElementById(`question-${index}`);
    if (question) {
        question.classList.add('active');
    }

    // Hide/Show navigation based on question type
    const navigation = document.getElementById('navigation');
    const progressBar = document.getElementById('progressBar');
    
    if (questions[index].type === 'intro') {
        navigation.style.display = 'none';
        progressBar.style.display = 'none';
    } else {
        navigation.style.display = 'flex';
        progressBar.style.display = 'block';
    }

    // Restore previous answer if exists
    if (answers[index] !== undefined && answers[index] !== null) {
        const question = questions[index];
        if (question.type === 'choice') {
            const choices = document.querySelectorAll(`#question-${index} .choice`);
            if (choices[answers[index]]) {
                choices[answers[index]].classList.add('selected');
            }
        } else if (question.type === 'scale') {
            const options = document.querySelectorAll(`#question-${index} .scale-option`);
            if (options[answers[index] - 1]) {
                options[answers[index] - 1].classList.add('selected');
            }
        } else if (question.type === 'multiple_text' && Array.isArray(answers[index])) {
            answers[index].forEach((value, fieldIndex) => {
                const input = document.getElementById(`input-${index}-${fieldIndex}`);
                if (input && value) {
                    input.value = value;
                }
            });
        } else if (question.type !== 'intro') {
            const input = document.getElementById(`input-${index}`);
            if (input) {
                input.value = answers[index];
            }
        }
    }

    currentQuestion = index;
    updateProgress();
    updateNavigation();
}

// Select a choice
function selectChoice(questionIndex, choiceIndex) {
    // Remove previous selection
    const choices = document.querySelectorAll(`#question-${questionIndex} .choice`);
    choices.forEach(c => c.classList.remove('selected'));

    // Add new selection
    choices[choiceIndex].classList.add('selected');

    // Save answer
    answers[questionIndex] = choiceIndex;
    
    // Save to localStorage immediately
    saveToLocalStorage();
    
    // Save to Google Sheets in background
    sendToGoogleSheets(false);

    // Auto-advance after a short delay (removed for better UX with buttons)
    // User will use "Pokračovať" button
}

// Save text/textarea answer
function saveTextAnswer(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    answers[questionIndex] = input.value;
    
    // Debounced save to avoid too many saves
    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => {
        saveToLocalStorage();
        sendToGoogleSheets(false);
    }, 2000);
}

// Select scale value
function selectScale(questionIndex, value) {
    // Remove previous selection
    const options = document.querySelectorAll(`#question-${questionIndex} .scale-option`);
    options.forEach(o => o.classList.remove('selected'));
    
    // Add new selection
    const selectedOption = options[value - 1]; // value is 1-5, index is 0-4
    selectedOption.classList.add('selected');
    
    // Save answer
    answers[questionIndex] = value;
    
    // Save to localStorage immediately
    saveToLocalStorage();
    
    // Save to Google Sheets in background
    sendToGoogleSheets(false);
}

// Save multiple text answer
function saveMultipleTextAnswer(questionIndex, fieldIndex) {
    const question = questions[questionIndex];
    const input = document.getElementById(`input-${questionIndex}-${fieldIndex}`);
    
    // Initialize answers as array if not exists
    if (!Array.isArray(answers[questionIndex])) {
        answers[questionIndex] = [];
    }
    
    answers[questionIndex][fieldIndex] = input.value;
    
    // Debounced save
    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => {
        saveToLocalStorage();
        sendToGoogleSheets(false);
    }, 2000);
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        // Survey completed
        completeSurvey();
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

// Update progress bar
function updateProgress() {
    // Calculate answered questions (exclude intro)
    const answeredCount = Object.keys(answers).filter(key => {
        const answer = answers[key];
        const questionIndex = parseInt(key);
        const question = questions[questionIndex];
        
        // Skip intro questions
        if (question && question.type === 'intro') {
            return false;
        }
        
        return answer !== undefined && answer !== null && answer !== '';
    }).length;
    
    // Total questions excluding intro
    const totalQuestions = questions.filter(q => q.type !== 'intro').length;
    const progress = (answeredCount / totalQuestions) * 100;
    
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    // Adjust question counter to not include intro
    const currentQuestionNum = questions[currentQuestion].type === 'intro' ? 0 : currentQuestion;
    document.getElementById('questionCounter').textContent = `Otázka ${currentQuestionNum} z ${totalQuestions} | Zodpovedané: ${answeredCount}`;
}

// Update navigation buttons
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Disable previous button on first question
    prevBtn.disabled = currentQuestion === 0;

    // Change next button text on last question
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = 'Odoslať ✓';
    } else {
        nextBtn.textContent = 'Pokračovať →';
    }
}

// Complete survey
async function completeSurvey() {
    console.log('Survey answers:', answers);
    
    // Save final answers
    saveToLocalStorage();
    
    // Hide question container and navigation
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('navigation').style.display = 'none';
    document.getElementById('completionScreen').classList.add('active');
    
    // Show loading
    document.getElementById('loadingIndicator').style.display = 'block';
    
    // Send to Google Sheets
    const success = await sendToGoogleSheets(true);
    
    // Hide loading
    document.getElementById('loadingIndicator').style.display = 'none';
    
    if (success || GOOGLE_SHEETS_URL.includes('YOUR_DEPLOYMENT_ID')) {
        // Show success message
        document.getElementById('successMessage').style.display = 'block';
        
        // Clear localStorage after successful submission
        try {
            localStorage.removeItem('lyceum_survey_' + sessionId);
        } catch (e) {
            console.error('Error clearing localStorage:', e);
        }
    } else {
        // Show error message
        document.getElementById('errorMessage').style.display = 'block';
    }
}

// Restart survey
function restartSurvey() {
    currentQuestion = 0;
    answers = {};
    sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Hide completion screens
    document.getElementById('completionScreen').classList.remove('active');
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    
    // Show question container and navigation
    document.getElementById('questionContainer').style.display = 'block';
    document.getElementById('navigation').style.display = 'flex';
    
    initSurvey();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        // Only auto-advance if not in textarea
        if (activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            nextQuestion();
        }
    }
});

// Window beforeunload - save before leaving
window.addEventListener('beforeunload', (e) => {
    saveToLocalStorage();
    sendToGoogleSheets(false);
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', initSurvey);

