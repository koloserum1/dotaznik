// Survey questions data
const questions = [
    {
        number: 1,
        title: "Aká je Vaša rola vo vzťahu k Lýceu?",
        description: "(študent, učiteľ, rodič, sponzor/iný podporovateľ, absolvent, iné – uveďte)",
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
        title: "Ktoré tri slová alebo vlastnosti podľa Vás najlepšie vystihujú Lýceum?",
        description: "(Môžete uviesť 1–3 prívlastky alebo krátke slovné spojenia)",
        type: "textarea"
    },
    {
        number: 4,
        title: "Aké hodnoty a princípy podľa Vás Lýceum reprezentuje?",
        description: "Čo sú tie hlavné idey, za ktorými si škola stojí?",
        type: "textarea"
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
        title: "Odporučili by ste Lýceum svojim známym alebo rodine?",
        description: "Prečo áno alebo prečo nie?",
        type: "textarea"
    },
    {
        number: 8,
        title: "Čo si myslíte o súčasnom logu, farbách a celkovom vizuálnom štýle Lýcea?",
        description: "Vystihuje podľa Vás vizuál školy jej ducha, alebo by to chcelo zmenu? (Čo sa Vám na aktuálnom vizuáli páči a čo naopak nie?)",
        type: "textarea"
    },
    {
        number: 9,
        title: "Sú podľa Vás nejaké tradície, symboly alebo historické prvky spojené s Lýceom, ktoré by sme mali zachovať či zdôrazniť v novej identite?",
        description: "(Napríklad významná história školy, motto, logo školy, školské farby, tradičné podujatia a pod.)",
        type: "textarea"
    },
    {
        number: 10,
        title: "Predstavte si, že o 5–10 rokov má Lýceum výbornú povesť presne takú, akú by ste si priali. Aký imidž alebo reputáciu by v ideálnom prípade mala škola mať?",
        description: "(Inými slovami: čím by ste chceli, aby bolo Lýceum známe?)",
        type: "textarea"
    },
    {
        number: 11,
        title: "Ako často a na aké účely navštevujete oficiálnu webovú stránku Lýcea?",
        description: "(Napr. denne/týždenne alebo iba občas; a čo tam hľadáte – informácie o štúdiu, aktuality, rozvrh, kontakty, …)",
        type: "textarea"
    },
    {
        number: 12,
        title: "Čo na súčasnej webovej stránke považujete za vydarené alebo užitočné?",
        description: "(Je niečo, čo sa Vám na webe páči, dobre sa Vám používa alebo Vám to uľahčuje získavať informácie?)",
        type: "textarea"
    },
    {
        number: 13,
        title: "A naopak – čo Vám na súčasnej webovej stránke najviac prekáža alebo chýba?",
        description: "Opíšte, aké problémy ste pri používaní webu zažili alebo čo na ňom neviete nájsť.",
        type: "textarea"
    },
    {
        number: 14,
        title: "Aké nové funkcionality alebo obsah by ste uvítali na novej webovej stránke Lýcea?",
        description: "Čo Vám tam teraz chýba, hoci by to bolo užitočné?",
        type: "textarea"
    },
    {
        number: 15,
        title: "Máte ešte nejaké ďalšie postrehy alebo nápady ohľadom značky, vizuálnej identity či komunikácie Lýcea, ktoré by ste nám chceli povedať?",
        description: "",
        type: "textarea"
    }
];

let currentQuestion = 0;
let answers = {};
let sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// Google Sheets Web App URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyrjmjZa_YR4i1Y91CLusBINNlokTflh_nTtNArkDp_q_gpYixYUz4AT1h_IfXyjvEf/exec';

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
            if (answers[index] !== undefined) {
                if (q.type === 'choice') {
                    answer = q.choices[answers[index]];
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
        
        const response = await fetch(GOOGLE_SHEETS_URL, {
            redirect: 'follow',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
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

        let contentHTML = `
            <div class="question-number" data-number="${q.number}">
            </div>
            <h2 class="question-title">${q.title}</h2>
        `;

        if (q.description) {
            contentHTML += `<p class="question-description">${q.description}</p>`;
        }

        if (q.type === 'choice') {
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

    // Restore previous answer if exists
    if (answers[index] !== undefined) {
        const question = questions[index];
        if (question.type === 'choice') {
            const choices = document.querySelectorAll(`#question-${index} .choice`);
            choices[answers[index]].classList.add('selected');
        } else {
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
    // Calculate answered questions
    const answeredCount = Object.keys(answers).filter(key => {
        const answer = answers[key];
        return answer !== undefined && answer !== null && answer !== '';
    }).length;
    
    const progress = (answeredCount / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('questionCounter').textContent = `Otázka ${currentQuestion + 1} z ${questions.length} | Zodpovedané: ${answeredCount}`;
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

