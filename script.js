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

// Initialize the survey
function initSurvey() {
    renderQuestions();
    showQuestion(0);
    updateProgress();
    updateNavigation();
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

    // Auto-advance after a short delay
    setTimeout(() => {
        nextQuestion();
    }, 300);
}

// Save text/textarea answer
function saveTextAnswer(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    answers[questionIndex] = input.value;
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
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('questionCounter').textContent = `${currentQuestion + 1} / ${questions.length}`;
}

// Update navigation buttons
function updateNavigation() {
    // Navigation is hidden in this design
}

// Complete survey
function completeSurvey() {
    console.log('Survey answers:', answers);
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('completionScreen').classList.add('active');
}

// Restart survey
function restartSurvey() {
    currentQuestion = 0;
    answers = {};
    document.getElementById('questionContainer').style.display = 'block';
    document.getElementById('completionScreen').classList.remove('active');
    initSurvey();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        nextQuestion();
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', initSurvey);

