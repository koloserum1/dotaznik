// Survey questions data - personalized flows based on role
const commonQuestions = {
    intro: {
        number: 0,
        title: "Nový branding Lýcea",
        title_en: "New Lýceum Branding",
        description: "",
        type: "intro",
        content: `Milí študenti, učitelia, rodičia a priatelia Lýcea,
pracujeme na novej vizuálnej identite a webovej prezentácii školy.
Chceme zistiť, ako Lýceum reálne vnímate – čo pre vás znamená, ako pôsobí navonok a čo by podľa vás malo vyjadrovať. 
Dotazník je anonymný a zaberie len pár minút. Ďakujeme, že ste súčasťou tejto zmeny. 💜`,
        content_en: `Dear students, teachers, parents and friends of Lýceum,
we are working on a new visual identity and website for the school.
We want to find out how you really perceive Lýceum – what it means to you, how it appears externally and what you think it should express.
The survey is anonymous and takes just a few minutes. Thank you for being part of this change. 💜`
    },
    role: {
        number: 1,
        title: "Aká je Vaša rola vo vzťahu k Lýceu?",
        title_en: "What is your role in relation to Lýceum?",
        description: "*povinné",
        description_en: "*required",
        type: "choice",
        required: true,
        choices: [
            "študent",
            "učiteľ",
            "rodič"
        ],
        choices_en: [
            "student",
            "teacher",
            "parent"
        ]
    }
};

// Questions for students
const studentQuestions = [
    {
        number: 2,
        title: "Aký si ročník?",
        title_en: "What year are you?",
        description: "*povinné",
        description_en: "*required",
        type: "choice",
        required: true,
        choices: [
            "1. ročník",
            "2. ročník",
            "3. ročník",
            "4. ročník"
        ],
        choices_en: [
            "1st year",
            "2nd year",
            "3rd year",
            "4th year"
        ]
    },
    {
        number: 3,
        title: "Máš pocit, že súčasná vizuálna identita Lýcea vystihuje, akí naozaj sme?",
        title_en: "Do you feel that Lýceum's current visual identity captures who we really are?",
        description: "*povinné",
        description_en: "*required",
        type: "scale",
        required: true,
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ["Vôbec nevystihuje", "Úplne vystihuje"],
        scaleLabels_en: ["Doesn't capture at all", "Completely captures"]
    },
    {
        number: 4,
        title: "Predstav si, že budúci rok má škola nový vizuál. Ktorý podľa teba najviac vystihuje Lýceum?",
        title_en: "Imagine that next year the school has a new visual. Which one do you think BEST represents Lýceum?",
        description: "*povinné - Vyber 1 z 4 obrázkov",
        description_en: "*required - Choose 1 from 4 images",
        type: "image_choice",
        required: true,
        multiple: false,
        images: [
            { id: "1obrázok", url: "images/1obrázok.jpg", label: "Obrázok 1", label_en: "Image 1" },
            { id: "2obrázok", url: "images/2obrázok.jpg", label: "Obrázok 2", label_en: "Image 2" },
            { id: "3obrázok", url: "images/3obrázok.jpg", label: "Obrázok 3", label_en: "Image 3" },
            { id: "4obrázok", url: "images/4obrázok.jpg", label: "Obrázok 4", label_en: "Image 4" }
        ]
    },
    {
        number: 5,
        title: "A opačne, ktorý podľa teba najmenej vystihuje Lýceum?",
        title_en: "And conversely, which one do you think LEAST represents Lýceum?",
        description: "*povinné - Vyber 1 z 4 obrázkov",
        description_en: "*required - Choose 1 from 4 images",
        type: "image_choice",
        required: true,
        multiple: false,
        images: [
            { id: "1obrázok", url: "images/1obrázok.jpg", label: "Obrázok 1", label_en: "Image 1" },
            { id: "2obrázok", url: "images/2obrázok.jpg", label: "Obrázok 2", label_en: "Image 2" },
            { id: "3obrázok", url: "images/3obrázok.jpg", label: "Obrázok 3", label_en: "Image 3" },
            { id: "4obrázok", url: "images/4obrázok.jpg", label: "Obrázok 4", label_en: "Image 4" }
        ]
    },
    {
        number: 6,
        title: "Poznáš vizuál, dizajn, značku alebo školu, ktorá ťa inšpiruje a mohla by byť príkladom pre Lýceum?",
        title_en: "Do you know any visual, design, brand or school that inspires you and could be an example for Lýceum?",
        description: "Môžeš pridať odkaz – napríklad z Pinterestu alebo webu",
        description_en: "You can add a link – for example from Pinterest or a website",
        type: "textarea",
        required: false
    },
    {
        number: 7,
        title: "Predstav si, že o 5–10 rokov má Lýceum vynikajúcu povesť – presne takú, akú by si si prial/a. Ako by sa o tejto škole hovorilo? Aký imidž by mala mať?",
        title_en: "Imagine that in 5–10 years Lýceum has an excellent reputation – exactly the one you would wish for. How would people talk about this school? What image should it have?",
        description: "",
        type: "textarea",
        required: false
    },
    {
        number: 8,
        title: "Rozprávaš sa s niekým, kto Lýceum nepozná. Ako by si v pár vetách opísal/a túto školu?",
        title_en: "You're talking to someone who doesn't know Lýceum. How would you describe this school in a few sentences?",
        description: "",
        type: "textarea",
        required: false
    },
    {
        number: 9,
        title: "Ako často navštevuješ webstránku Lýcea?",
        title_en: "How often do you visit Lýceum's website?",
        description: "*povinné",
        description_en: "*required",
        type: "choice",
        required: true,
        choices: [
            "Denne",
            "Týždenne",
            "Mesačne",
            "Zriedkavo",
            "Nikdy"
        ],
        choices_en: [
            "Daily",
            "Weekly",
            "Monthly",
            "Rarely",
            "Never"
        ]
    },
    {
        number: 10,
        title: "Čo na webstránke Lýcea považuješ za užitočné alebo vydarené?",
        title_en: "What do you find useful or well-done on Lýceum's website?",
        description: "",
        type: "textarea",
        required: false
    },
    {
        number: 11,
        title: "Keby bolo Lýceum človek, zviera alebo značka – aké by bolo?",
        title_en: "If Lýceum were a person, animal or brand – what would it be like?",
        description: "Skús ho opísať niekoľkými slovami – aký má charakter, štýl, energiu alebo správanie.",
        description_en: "Try to describe it in a few words – what character, style, energy or behavior it has.",
        type: "textarea",
        required: false
    },
    {
        number: 12,
        title: "Môžeme sa ti ozvať, keď budeme pokračovať v téme vizuálu Lýcea?",
        title_en: "Can we contact you when we continue with Lýceum's visual theme?",
        description: "Napíš meno alebo e-mail",
        description_en: "Write name or email",
        type: "textarea"
    }
];

// Questions for teachers
const teacherQuestions = [
    {
        number: 2,
        title: "Ako dlho pôsobíte na Lýceu?",
        title_en: "How long have you been working at Lýceum?",
        description: "*povinné",
        description_en: "*required",
        type: "choice",
        required: true,
        choices: [
            "Do 1 roka",
            "1–2 roky",
            "2–3 rokov",
            "Viac ako 3 roky"
        ],
        choices_en: [
            "Less than 1 year",
            "1–2 years",
            "2–3 years",
            "More than 3 years"
        ]
    },
    {
        number: 3,
        title: "Máte pocit, že súčasná vizuálna identita Lýcea vystihuje, akí naozaj sme?",
        title_en: "Do you feel that Lýceum's current visual identity captures who we really are?",
        description: "*povinné",
        description_en: "*required",
        type: "scale",
        required: true,
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ["Vôbec nevystihuje", "Úplne vystihuje"],
        scaleLabels_en: ["Doesn't capture at all", "Completely captures"]
    },
    {
        number: 4,
        title: "Predstavte si, že budúci rok má škola nový vizuál. Ktorý podľa vás najviac vystihuje Lýceum?",
        title_en: "Imagine that next year the school has a new visual. Which one do you think best represents Lýceum?",
        description: "*povinné - Vyber 1 z 4 obrázkov",
        description_en: "*required - Choose 1 from 4 images",
        type: "image_choice",
        required: true,
        multiple: false,
        images: [
            { id: "1obrázok", url: "images/1obrázok.jpg", label: "Obrázok 1", label_en: "Image 1" },
            { id: "2obrázok", url: "images/2obrázok.jpg", label: "Obrázok 2", label_en: "Image 2" },
            { id: "3obrázok", url: "images/3obrázok.jpg", label: "Obrázok 3", label_en: "Image 3" },
            { id: "4obrázok", url: "images/4obrázok.jpg", label: "Obrázok 4", label_en: "Image 4" }
        ]
    },
    {
        number: 5,
        title: "A opačne, ktorý podľa vás najmenej vystihuje Lýceum?",
        title_en: "And conversely, which one do you think least represents Lýceum?",
        description: "*povinné - Vyber 1 z 4 obrázkov",
        description_en: "*required - Choose 1 from 4 images",
        type: "image_choice",
        required: true,
        multiple: false,
        images: [
            { id: "1obrázok", url: "images/1obrázok.jpg", label: "Obrázok 1", label_en: "Image 1" },
            { id: "2obrázok", url: "images/2obrázok.jpg", label: "Obrázok 2", label_en: "Image 2" },
            { id: "3obrázok", url: "images/3obrázok.jpg", label: "Obrázok 3", label_en: "Image 3" },
            { id: "4obrázok", url: "images/4obrázok.jpg", label: "Obrázok 4", label_en: "Image 4" }
        ]
    },
    {
        number: 6,
        title: "Poznáte vizuál, dizajn, značku alebo školu, ktorá vás inšpiruje a mohla by byť príkladom pre Lýceum?",
        title_en: "Do you know any visual, design, brand or school that inspires you and could be an example for Lýceum?",
        description: "Môžete pridať odkaz – napríklad z Pinterestu alebo webu",
        description_en: "You can add a link – for example from Pinterest or a website",
        type: "textarea",
        required: false
    },
    {
        number: 7,
        title: "Predstavte si, že o 5–10 rokov má Lýceum vynikajúcu povesť – presne takú, akú by ste si priali. Ako by sa o tejto škole hovorilo? Aký imidž by mala mať?",
        title_en: "Imagine that in 5–10 years Lýceum has an excellent reputation – exactly the one you would wish for. How would people talk about this school? What image should it have?",
        description: "",
        type: "textarea",
        required: false
    },
    {
        number: 8,
        title: "Rozprávate sa s niekým, kto Lýceum nepozná. Ako by ste v pár vetách opísali túto školu?",
        title_en: "You're talking to someone who doesn't know Lýceum. How would you describe this school in a few sentences?",
        description: "",
        type: "textarea",
        required: false
    },
    {
        number: 9,
        title: "Keby bolo Lýceum človek, zviera alebo značka – aké by bolo?",
        title_en: "If Lýceum were a person, animal or brand – what would it be like?",
        description: "Skúste ho opísať niekoľkými slovami – aký má charakter, štýl, energiu alebo správanie.",
        description_en: "Try to describe it in a few words – what character, style, energy or behavior it has.",
        type: "textarea",
        required: false
    },
    {
        number: 10,
        title: "Ako by podľa vás mala škola komunikovať so svetom (so študentmi, rodičmi, verejnosťou)?",
        title_en: "How should the school communicate with the world (with students, parents, the public)?",
        description: "Aký tón je pre Lýceum prirodzený – otvorený, odborný, priamy, ľudský...",
        description_en: "What tone is natural for Lýceum – open, professional, direct, human...",
        type: "textarea",
        required: false
    },
    {
        number: 11,
        title: "Môžeme vás kontaktovať, keď budeme pokračovať v téme vizuálu a komunikácie Lýcea?",
        title_en: "Can we contact you when we continue with Lýceum's visual and communication theme?",
        description: "Napíšte meno alebo e-mail",
        description_en: "Write name or email",
        type: "textarea"
    }
];

// Questions for parents
const parentQuestions = [
    {
        number: 2,
        title: "Koľko detí máte na Lýceu?",
        title_en: "How many children do you have at Lýceum?",
        description: "*povinné",
        description_en: "*required",
        type: "choice",
        required: true,
        choices: [
            "1 dieťa",
            "2 deti"
        ],
        choices_en: [
            "1 child",
            "2 children"
        ]
    },
    {
        number: 3,
        title: "Predstavte si, že hovoríte s niekým, kto Lýceum nepozná. Ako by ste v pár vetách opísali túto školu?",
        title_en: "Imagine you're talking to someone who doesn't know Lýceum. How would you describe this school in a few sentences?",
        description: "",
        type: "textarea",
        required: false
    },
    {
        number: 4,
        title: "Ako vaše deti hovoria o Lýceu?",
        title_en: "How do your children talk about Lýceum?",
        description: "Čo sa im najviac páči? Ako o škole rozprávajú kamarátom alebo doma?",
        description_en: "What do they like the most? How do they talk about the school to friends or at home?",
        type: "textarea",
        required: false
    },
    {
        number: 5,
        title: "Ako vy osobne vnímate Lýceum – čo sa vám páči, čo by ste zlepšili a aký máte z neho celkový dojem?",
        title_en: "How do you personally perceive Lýceum – what do you like, what would you improve and what is your overall impression of it?",
        description: "",
        type: "textarea",
        required: false
    },
    {
        number: 6,
        title: "Ktorá z týchto vizualizácií podľa vás najviac vystihuje Lýceum?",
        title_en: "Which of these visualizations do you think best represents Lýceum?",
        description: "*povinné - Vyber 1 z 4 obrázkov – atmosféra školy, vzťahy, energia, nálada",
        description_en: "*required - Choose 1 from 4 images – school atmosphere, relationships, energy, mood",
        type: "image_choice",
        required: true,
        multiple: false,
        images: [
            { id: "1obrázok", url: "images/1obrázok.jpg", label: "Obrázok 1", label_en: "Image 1" },
            { id: "2obrázok", url: "images/2obrázok.jpg", label: "Obrázok 2", label_en: "Image 2" },
            { id: "3obrázok", url: "images/3obrázok.jpg", label: "Obrázok 3", label_en: "Image 3" },
            { id: "4obrázok", url: "images/4obrázok.jpg", label: "Obrázok 4", label_en: "Image 4" }
        ]
    },
    {
        number: 7,
        title: "A ktorá z týchto vizualizácií podľa vás najmenej zodpovedá tomu, ako Lýceum vnímate?",
        title_en: "And which of these visualizations do you think least corresponds to how you perceive Lýceum?",
        description: "*povinné - Vyber 1 z 4 obrázkov",
        description_en: "*required - Choose 1 from 4 images",
        type: "image_choice",
        required: true,
        multiple: false,
        images: [
            { id: "1obrázok", url: "images/1obrázok.jpg", label: "Obrázok 1", label_en: "Image 1" },
            { id: "2obrázok", url: "images/2obrázok.jpg", label: "Obrázok 2", label_en: "Image 2" },
            { id: "3obrázok", url: "images/3obrázok.jpg", label: "Obrázok 3", label_en: "Image 3" },
            { id: "4obrázok", url: "images/4obrázok.jpg", label: "Obrázok 4", label_en: "Image 4" }
        ]
    },
    {
        number: 8,
        title: "Ako by podľa vás mala škola komunikovať so svetom (so študentmi, rodičmi, verejnosťou)?",
        title_en: "How should the school communicate with the world (with students, parents, the public)?",
        description: "*povinné - škály 1-5",
        description_en: "*required - scales 1-5",
        type: "multiple_scale",
        required: true,
        scales: [
            {
                id: "formal",
                question: "Formálne - Neformálne",
                question_en: "Formal - Informal",
                min: 1,
                max: 5,
                minLabel: "Formálne",
                maxLabel: "Neformálne",
                minLabel_en: "Formal",
                maxLabel_en: "Informal"
            },
            {
                id: "traditional",
                question: "Tradične - Moderne",
                question_en: "Traditional - Modern",
                min: 1,
                max: 5,
                minLabel: "Tradične",
                maxLabel: "Moderne",
                minLabel_en: "Traditional",
                maxLabel_en: "Modern"
            },
            {
                id: "conservative",
                question: "Konzervatívne - Kreatívne",
                question_en: "Conservative - Creative",
                min: 1,
                max: 5,
                minLabel: "Konzervatívne",
                maxLabel: "Kreatívne",
                minLabel_en: "Conservative",
                maxLabel_en: "Creative"
            }
        ]
    },
    {
        number: 9,
        title: "Radi by ste sa zapojili do diskusie o novom vizuáli a značke Lýcea?",
        title_en: "Would you like to participate in the discussion about Lýceum's new visual and brand?",
        description: "Ak áno, napíšte svoje meno alebo e-mail.",
        description_en: "If yes, write your name or email.",
        type: "textarea"
    }
];

// Active questions array - will be populated based on user role
let questions = [];
let userRole = null;

let currentQuestion = 0;
let answers = {};
let sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// Google Sheets Web App URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyyEYPHavQbHwmEkBUQBE7h-89Dc8caKooV9A1gQqV9xjXgBRbY_haEK7eVnxXafz_U/exec';

// Build questions array based on role
function buildQuestionsForRole(role) {
    questions = [commonQuestions.intro, commonQuestions.role];
    
    const roleChoice = typeof role === 'object' && role.choiceIndex !== undefined 
        ? commonQuestions.role.choices[role.choiceIndex].toLowerCase()
        : (typeof role === 'number' ? commonQuestions.role.choices[role].toLowerCase() : '');
    
    if (roleChoice.includes('študent')) {
        questions = questions.concat(studentQuestions);
        userRole = 'student';
    } else if (roleChoice.includes('učiteľ')) {
        questions = questions.concat(teacherQuestions);
        userRole = 'teacher';
    } else if (roleChoice.includes('rodič')) {
        questions = questions.concat(parentQuestions);
        userRole = 'parent';
    } else {
        // Default to student questions for other roles
        questions = questions.concat(studentQuestions);
        userRole = 'other';
    }
    
    console.log('Questions built for role:', userRole, 'Total questions:', questions.length);
}

// Building visualization configuration - Variant 4: Simple Block
const buildingParts = [
    'block1',  // Foundation
    'block2',  // Main building body
    'block3',  // Window top left
    'block4',  // Window top center
    'block5',  // Window top right
    'block6',  // Window bottom left
    'block7',  // Window bottom right
    'block8',  // Door
    'block9',  // Door handle
    'block10', // Roof base
    'block11'  // Roof top
];

let buildingProgress = 0;
let blocksPerQuestion = 1; // Will be calculated based on total questions

// Building messages for different stages
const buildingMessages = [
    "Kladieme základy... 🏗️",
    "Stavíme hlavnú budovu...",
    "Prvé okná sa otvárajú...",
    "Ďalšie okná...",
    "Poschodia rastú...",
    "Svetlo vo vnútri... 💡",
    "Dokončujeme okná...",
    "Pridávame dvere...",
    "Kľučka na dverách... 🚪",
    "Strecha sa montuje...",
    "Lýceum je hotové! 🎉"
];

// Add building part with animation - adds blocks based on question progress
function addBuildingPart() {
    // Calculate total questions (excluding intro, including role)
    const totalQuestions = questions.filter(q => q.type !== 'intro').length;
    const totalBlocks = buildingParts.length;
    
    // Distribute blocks evenly across questions
    // We want the last block to be added with the last question
    const blocksPerQuestion = totalBlocks / totalQuestions;
    
    // Calculate target progress based on current question (starting from question 1 = role)
    // currentQuestion 1 = first real question (role selection)
    const questionNumber = currentQuestion; // This is the question we just answered/passed
    const targetProgress = Math.min(
        Math.ceil(questionNumber * blocksPerQuestion),
        totalBlocks
    );
    
    // Add blocks up to target
    while (buildingProgress < targetProgress && buildingProgress < totalBlocks) {
        const partId = buildingParts[buildingProgress];
        const part = document.getElementById(partId);
        
        if (part) {
            const delay = (buildingProgress - (targetProgress - Math.ceil(blocksPerQuestion))) * 150;
            // Add built class for animation with slight delay for each block
            setTimeout(() => {
                part.classList.add('built');
                
                // Show building visualization
                const visualization = document.getElementById('buildingVisualization');
                if (visualization) {
                    visualization.classList.add('active');
                }
            }, Math.max(0, delay)); // Stagger animations by 150ms
        }
        
        buildingProgress++;
    }
    
    // Update message after all blocks are added
    const currentLang = localStorage.getItem('lyceum_language') || 'sk';
    const t = translations[currentLang];
    const messageIndex = Math.min(buildingProgress - 1, t.building.messages.length - 1);
    updateBuildingMessage(t.building.messages[messageIndex]);
    
    console.log('Building progress:', buildingProgress, '/', totalBlocks, 'Question:', questionNumber, '/', totalQuestions);
}

// Update building message
function updateBuildingMessage(message) {
    const messageEl = document.getElementById('buildingMessage');
    if (messageEl) {
        const p = messageEl.querySelector('p');
        if (p) {
            p.textContent = message;
        }
        messageEl.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 3000);
    }
}

// Initialize the survey
function initSurvey() {
    // Load saved answers from localStorage
    loadSavedAnswers();
    
    // Start with common questions only
    questions = [commonQuestions.intro, commonQuestions.role];
    
    // Initialize building visualization
    initBuildingVisualization();
    
    renderQuestions();
    showQuestion(0);
    updateProgress();
    updateNavigation();
    
    // Auto-save every 10 seconds
    setInterval(saveToLocalStorage, 10000);
}

// Initialize building visualization
function initBuildingVisualization() {
    // Building starts empty, blocks will be added as user answers questions
    console.log('Building visualization initialized');
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
        // Get Slovak time (UTC+1 in winter, UTC+2 in summer)
        const now = new Date();
        const slovakTime = new Intl.DateTimeFormat('sk-SK', {
            timeZone: 'Europe/Bratislava',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).formatToParts(now);
        
        const timestamp = `${slovakTime[4].value}-${slovakTime[2].value}-${slovakTime[0].value} ${slovakTime[6].value}:${slovakTime[8].value}:${slovakTime[10].value}`;
        
        // Prepare data for Google Sheets
        questions.forEach((q, index) => {
            let answer = '';
            if (answers[index] !== undefined && answers[index] !== null) {
                if (q.type === 'intro') {
                    answer = 'N/A'; // Intro doesn't have answer
                } else if (q.type === 'choice') {
                    // Check if answer is object (with "other" text)
                    if (typeof answers[index] === 'object' && answers[index].choiceIndex !== undefined) {
                        const choiceText = q.choices[answers[index].choiceIndex];
                        const otherText = answers[index].otherText || '';
                        answer = otherText ? `${choiceText}: ${otherText}` : choiceText;
                    } else {
                        answer = q.choices[answers[index]];
                    }
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
            language: localStorage.getItem('lyceum_language') || 'sk',
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
    
    // Get current language
    const currentLang = localStorage.getItem('lyceum_language') || 'sk';

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.id = `question-${index}`;

        let contentHTML = '';
        
        // Don't show number for intro
        if (q.type !== 'intro') {
            contentHTML += `<div class="question-number" data-number="${q.number}"></div>`;
        }
        
        // Use translated title if available
        const questionTitle = q[`title_${currentLang}`] || q.title;
        contentHTML += `<h2 class="question-title ${q.type === 'intro' ? 'intro-title' : ''}">${questionTitle}</h2>`;

        // Use translated description if available
        const questionDesc = q[`description_${currentLang}`] || q.description;
        if (questionDesc) {
            contentHTML += `<p class="question-description">${questionDesc}</p>`;
        }

        if (q.type === 'intro') {
            // Use translated intro content if available
            const introContent = q[`content_${currentLang}`] || q.content;
            contentHTML += `<div class="intro-content">${introContent.replace(/\n/g, '<br>')}</div>`;
            
            // Get translated button text
            const t = translations[currentLang];
            const buttonText = t ? t.navigation.start : 'Začať dotazník →';
            contentHTML += `<button class="intro-button" onclick="nextQuestion()">${buttonText}</button>`;
        } else if (q.type === 'choice') {
            contentHTML += '<div class="choices">';
            const choicesArray = q[`choices_${currentLang}`] || q.choices;
            choicesArray.forEach((choice, choiceIndex) => {
                const letter = String.fromCharCode(65 + choiceIndex); // A, B, C, etc.
                const isOtherOption = choice.toLowerCase().includes('iné') || choice.toLowerCase().includes('uvede') || choice.toLowerCase().includes('other');
                contentHTML += `
                    <div class="choice" onclick="selectChoice(${index}, ${choiceIndex})" data-is-other="${isOtherOption}">
                        <div class="choice-content">
                            <span class="choice-letter">${letter}</span>
                            <span>${choice}</span>
                        </div>
                        <div class="choice-close">✕</div>
                    </div>
                `;
            });
            contentHTML += '</div>';
            
            // Add text input for "other" option
            contentHTML += `
                <div class="other-input-container" id="other-input-${index}" style="display: none;">
                    <input type="text" 
                           class="text-input other-text-input" 
                           id="other-text-${index}" 
                           placeholder="Uveďte vašu rolu..."
                           oninput="saveOtherText(${index})">
                </div>
            `;
        } else if (q.type === 'text') {
            contentHTML += `
                <input type="text" 
                       class="text-input" 
                       id="input-${index}" 
                       placeholder="Type your answer here..."
                       oninput="saveTextAnswer(${index})">
                <div class="input-hint" style="display:none"></div>
            `;
        } else if (q.type === 'textarea') {
            contentHTML += `
                <textarea class="textarea-input" 
                          id="input-${index}" 
                          placeholder="Type your answer here..."
                          oninput="saveTextAnswer(${index})"></textarea>
                <div class="input-hint" style="display:none"></div>
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
            // Use translated scale labels if available
            const scaleLabels = q[`scaleLabels_${currentLang}`] || q.scaleLabels;
            contentHTML += `<span class="scale-label-min">${scaleLabels[0]}</span>`;
            contentHTML += `<span class="scale-label-max">${scaleLabels[1]}</span>`;
            contentHTML += '</div>';
            contentHTML += '</div>';
        } else if (q.type === 'multiple_scale') {
            // Multiple scales rendering
            contentHTML += '<div class="multiple-scale-container">';
            if (q.scales) {
                q.scales.forEach((scale, scaleIndex) => {
                    const scaleQuestion = scale[`question_${currentLang}`] || scale.question;
                    const minLabel = scale[`minLabel_${currentLang}`] || scale.minLabel;
                    const maxLabel = scale[`maxLabel_${currentLang}`] || scale.maxLabel;
                    
                    contentHTML += `
                        <div class="scale-group">
                            <div class="scale-question">${scaleQuestion}</div>
                            <div class="scale-container">
                                <div class="scale-options">`;
                    
                    for (let i = scale.min; i <= scale.max; i++) {
                        contentHTML += `
                            <div class="scale-option" onclick="selectMultipleScale(${index}, ${scaleIndex}, ${i})" data-scale-id="${scale.id}">
                                <div class="scale-number">${i}</div>
                            </div>
                        `;
                    }
                    
                    contentHTML += `
                                </div>
                                <div class="scale-labels">
                                    <span class="scale-label-min">${minLabel}</span>
                                    <span class="scale-label-max">${maxLabel}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
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
        } else if (q.type === 'image_choice') {
            contentHTML += '<div class="image-choices">';
            q.images.forEach((img, imgIndex) => {
                contentHTML += `
                    <div class="image-choice" onclick="selectImageChoice(${index}, ${imgIndex}, ${q.multiple || false})" data-img-id="${img.id}">
                        <img src="${img.url}" alt="${img.label}">
                        <button class="image-zoom-btn" onclick="event.stopPropagation(); openImageModal('${img.url}')" title="Zobraziť v plnom rozlíšení">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                        </button>
                        <div class="image-choice-check">✓</div>
                    </div>
                `;
            });
            contentHTML += '</div>';
        } else if (q.type === 'choice_with_textarea') {
            contentHTML += '<div class="choices">';
            const choicesArray = q[`choices_${currentLang}`] || q.choices;
            choicesArray.forEach((choice, choiceIndex) => {
                const letter = String.fromCharCode(65 + choiceIndex);
                const isOtherOption = choice.toLowerCase().includes('iné') || choice.toLowerCase().includes('uvede') || choice.toLowerCase().includes('other');
                contentHTML += `
                    <div class="choice" onclick="selectChoice(${index}, ${choiceIndex})" data-is-other="${isOtherOption}">
                        <div class="choice-content">
                            <span class="choice-letter">${letter}</span>
                            <span>${choice}</span>
                        </div>
                        <div class="choice-close">✕</div>
                    </div>
                `;
            });
            contentHTML += '</div>';
            
            // Add text input for "other" option
            contentHTML += `
                <div class="other-input-container" id="other-input-${index}" style="display: none;">
                    <input type="text" 
                           class="text-input other-text-input" 
                           id="other-text-${index}" 
                           placeholder="Uveďte..."
                           oninput="saveOtherText(${index})">
                </div>
            `;
            
            // Add textarea for additional comments
            if (q.textareaPrompt) {
                contentHTML += `
                    <div class="textarea-section" style="margin-top: 20px;">
                        <label class="text-field-label">${q.textareaPrompt}</label>
                        <textarea class="textarea-input" 
                                  id="textarea-${index}" 
                                  placeholder="Type your answer here..."
                                  oninput="saveChoiceTextarea(${index})"></textarea>
                    </div>
                `;
            }
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
    const buildingSide = document.getElementById('buildingSide');
    const contentSide = document.querySelector('.content-side');
    
    if (questions[index].type === 'intro') {
        // Intro screen: full width, no building side
        navigation.style.display = 'none';
        progressBar.style.display = 'none';
        if (buildingSide) {
            buildingSide.classList.remove('visible');
        }
        if (contentSide) {
            contentSide.classList.add('full-width');
        }
    } else {
        // Regular questions: show navigation and building
        navigation.style.display = 'flex';
        progressBar.style.display = 'block';
        
        // Show building side starting from question 1 (role selection)
        if (index >= 1 && buildingSide) {
            // Delay to allow smooth transition
            setTimeout(() => {
                buildingSide.classList.add('visible');
            }, 200);
        }
        
        if (contentSide) {
            // Smooth transition from full-width to normal
            contentSide.classList.remove('full-width');
        }
    }
    
    // Mobile specific: always show building side for questions after intro
    if (index >= 1 && buildingSide && window.innerWidth <= 1024) {
        buildingSide.classList.add('visible');
    }
    
    // Hide building intro text (not the title) from question 2 onwards
    const buildingIntroText = document.getElementById('buildingIntroText');
    if (buildingIntroText) {
        if (index >= 2) {
            buildingIntroText.style.display = 'none';
        } else {
            buildingIntroText.style.display = 'block';
        }
    }

    // Restore previous answer if exists
    if (answers[index] !== undefined && answers[index] !== null) {
        const question = questions[index];
        if (question.type === 'choice') {
            const choices = document.querySelectorAll(`#question-${index} .choice`);
            
            // Check if answer is object (with "other" text)
            if (typeof answers[index] === 'object' && answers[index].choiceIndex !== undefined) {
                const choiceIndex = answers[index].choiceIndex;
                if (choices[choiceIndex]) {
                    choices[choiceIndex].classList.add('selected');
                    
                    // Show and restore "other" text input
                    const otherContainer = document.getElementById(`other-input-${index}`);
                    const otherInput = document.getElementById(`other-text-${index}`);
                    if (otherContainer && otherInput) {
                        otherContainer.style.display = 'block';
                        otherInput.value = answers[index].otherText || '';
                    }
                }
            } else if (choices[answers[index]]) {
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
    
    // Update building language if not intro
    if (index > 0) {
        const currentLang = localStorage.getItem('lyceum_language') || 'sk';
        const t = translations[currentLang];
        
        // Update building title and intro text
        const buildingTitle = document.querySelector('.building-intro-message h2');
        const buildingIntro = document.getElementById('buildingIntroText');
        
        if (buildingTitle && t) buildingTitle.textContent = t.building.title;
        if (buildingIntro && t) buildingIntro.textContent = t.building.intro;
    }
}

// Select a choice
function selectChoice(questionIndex, choiceIndex) {
    // Remove previous selection
    const choices = document.querySelectorAll(`#question-${questionIndex} .choice`);
    choices.forEach(c => c.classList.remove('selected'));

    // Add new selection
    const selectedChoice = choices[choiceIndex];
    selectedChoice.classList.add('selected');

    // Check if this is "other" option
    const isOther = selectedChoice.getAttribute('data-is-other') === 'true';
    const otherContainer = document.getElementById(`other-input-${questionIndex}`);
    
    if (isOther && otherContainer) {
        // Show text input for "other" option
        otherContainer.style.display = 'block';
        const otherInput = document.getElementById(`other-text-${questionIndex}`);
        if (otherInput) {
            otherInput.focus();
        }
        
        // Save as object with choice index and text
        const otherText = otherInput ? otherInput.value : '';
        answers[questionIndex] = {
            choiceIndex: choiceIndex,
            otherText: otherText
        };
    } else {
        // Hide text input
        if (otherContainer) {
            otherContainer.style.display = 'none';
        }
        
        // Save answer normally
        answers[questionIndex] = choiceIndex;
    }
    
    // Save to localStorage immediately
    saveToLocalStorage();
    
    // Save to Google Sheets in background
    sendToGoogleSheets(false);
}

// Save "other" text for choice questions
function saveOtherText(questionIndex) {
    const otherInput = document.getElementById(`other-text-${questionIndex}`);
    const currentAnswer = answers[questionIndex];
    
    if (typeof currentAnswer === 'object' && currentAnswer.choiceIndex !== undefined) {
        // Update the otherText property
        answers[questionIndex].otherText = otherInput.value;
        
        // Debounced save
        clearTimeout(window.saveTimeout);
        window.saveTimeout = setTimeout(() => {
            saveToLocalStorage();
            sendToGoogleSheets(false);
        }, 2000);
    }
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

// Select multiple scale value
function selectMultipleScale(questionIndex, scaleIndex, value) {
    const question = questions[questionIndex];
    if (!question || !question.scales) return;
    
    const scaleId = question.scales[scaleIndex].id;
    
    // Remove previous selection for this scale
    const options = document.querySelectorAll(`#question-${questionIndex} [data-scale-id="${scaleId}"]`);
    options.forEach(o => o.classList.remove('selected'));
    
    // Add new selection
    const selectedOption = Array.from(options).find(o => {
        const num = parseInt(o.querySelector('.scale-number').textContent);
        return num === value;
    });
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    // Initialize answers as object if not exists
    if (typeof answers[questionIndex] !== 'object' || answers[questionIndex] === null) {
        answers[questionIndex] = {};
    }
    
    // Save answer for this scale
    answers[questionIndex][scaleId] = value;
    
    // Save to localStorage immediately
    saveToLocalStorage();
    
    // Auto-save to Google Sheets
    clearTimeout(window.multipleScaleSaveTimeout);
    window.multipleScaleSaveTimeout = setTimeout(() => {
        sendToGoogleSheets(false);
    }, 2000);
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

// Select image choice
function selectImageChoice(questionIndex, imgIndex, multiple) {
    const imageChoices = document.querySelectorAll(`#question-${questionIndex} .image-choice`);
    const selectedChoice = imageChoices[imgIndex];
    
    if (multiple) {
        // Multiple selection mode
        selectedChoice.classList.toggle('selected');
        
        // Save as array of selected indices
        const selectedIndices = [];
        imageChoices.forEach((choice, idx) => {
            if (choice.classList.contains('selected')) {
                selectedIndices.push(idx);
            }
        });
        answers[questionIndex] = selectedIndices;
    } else {
        // Single selection mode
        imageChoices.forEach(c => c.classList.remove('selected'));
        selectedChoice.classList.add('selected');
        answers[questionIndex] = imgIndex;
    }
    
    // Save to localStorage immediately
    saveToLocalStorage();
    
    // Save to Google Sheets in background
    sendToGoogleSheets(false);
}

// Save choice with textarea answer
function saveChoiceTextarea(questionIndex) {
    const textarea = document.getElementById(`textarea-${questionIndex}`);
    const currentAnswer = answers[questionIndex];
    
    // Store as object with both choice and textarea
    if (typeof currentAnswer === 'object') {
        currentAnswer.textareaText = textarea.value;
    } else {
        answers[questionIndex] = {
            choiceIndex: currentAnswer,
            textareaText: textarea.value
        };
    }
    
    // Debounced save
    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => {
        saveToLocalStorage();
        sendToGoogleSheets(false);
    }, 2000);
}

// Navigate to next question
function nextQuestion() {
    // Check if current question is required and answered
    const currentQ = questions[currentQuestion];
    if (currentQ.required && !isQuestionAnswered(currentQuestion)) {
        showRequiredError();
        return;
    }
    
    // Special handling for role selection - rebuild questions FIRST
    if (currentQuestion === 1 && answers[1] !== undefined) {
        buildQuestionsForRole(answers[1]);
        // Re-render all questions with new role-specific questions
        renderQuestions();
    }
    
    // Add building part when moving forward from questions (including role selection)
    // Skip intro (question 0)
    // Add block even if question is not answered (optional questions)
    if (currentQuestion >= 1) {
        addBuildingPart();
    }
    
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        // Survey completed
        completeSurvey();
    }
}

// Check if question is answered
function isQuestionAnswered(questionIndex) {
    const answer = answers[questionIndex];
    const question = questions[questionIndex];
    
    if (question.type === 'choice') {
        if (typeof answer === 'object' && answer.choiceIndex !== undefined) {
            return answer.otherText && answer.otherText.trim() !== '';
        }
        return answer !== undefined && answer !== null;
    } else if (question.type === 'scale') {
        return answer !== undefined && answer !== null;
    } else if (question.type === 'image_choice') {
        // For image choice, answer is a number (index) or array of numbers
        if (Array.isArray(answer)) {
            return answer.length > 0;
        }
        return answer !== undefined && answer !== null && answer >= 0;
    } else if (question.type === 'multiple_text') {
        if (Array.isArray(answer)) {
            return answer.some(a => a && a.trim() !== '');
        }
        return false;
    } else if (question.type === 'intro') {
        return true; // Intro screens are always "answered"
    } else {
        // For text/textarea types
        return answer !== undefined && answer !== null && answer.toString().trim() !== '';
    }
}

// Show required field error
function showRequiredError() {
    const question = document.getElementById(`question-${currentQuestion}`);
    if (question) {
        // Remove existing error
        const existingError = question.querySelector('.required-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Get current language and translations
        const currentLang = localStorage.getItem('lyceum_language') || 'sk';
        const t = translations[currentLang];
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'required-error';
        errorDiv.textContent = t ? t.required : 'Táto otázka je povinná. Prosím, odpovedzte na ňu.';
        question.appendChild(errorDiv);
        
        // Remove error after 3 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 3000);
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
    
    // Progress based on current question position (not answered questions)
    let progressPercentage;
    let currentQuestionNum;
    
    if (questions[currentQuestion].type === 'intro') {
        // Intro screen - 0% progress
        progressPercentage = 0;
        currentQuestionNum = 0;
    } else {
        // Regular questions - progress based on position
        progressPercentage = (currentQuestion / totalQuestions) * 100;
        currentQuestionNum = currentQuestion;
    }
    
    document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    
    // Get current language
    const currentLang = localStorage.getItem('lyceum_language') || 'sk';
    const t = translations[currentLang];
    
    document.getElementById('questionCounter').textContent = `${t.progress} ${currentQuestionNum} ${t.of} ${totalQuestions} | ${t.answered}: ${answeredCount}`;
}

// Update navigation buttons
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Get current language and translations
    const currentLang = localStorage.getItem('lyceum_language') || 'sk';
    const t = translations[currentLang];

    // Disable previous button on first question (intro)
    prevBtn.disabled = currentQuestion === 0;
    
    // Update button texts with translations
    if (t) {
        prevBtn.textContent = t.navigation.back;
        nextBtn.textContent = t.navigation.continue;
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
    document.getElementById('progressBar').style.display = 'none';
    
    // Show completion screen
    document.getElementById('completionScreen').classList.add('active');
    
    // Get current language and translations
    const currentLang = localStorage.getItem('lyceum_language') || 'sk';
    const t = translations[currentLang];
    
    // Show loading
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator && t) {
        loadingIndicator.querySelector('p').textContent = t.completion.loading;
    }
    document.getElementById('loadingIndicator').style.display = 'flex';
    
    // Send to Google Sheets
    const success = await sendToGoogleSheets(true);
    
    // Hide loading
    document.getElementById('loadingIndicator').style.display = 'none';
    
    if (success || GOOGLE_SHEETS_URL.includes('YOUR_DEPLOYMENT_ID')) {
        // Show success message
        const successMessage = document.getElementById('successMessage');
        if (successMessage && t) {
            successMessage.querySelector('h1').textContent = t.completion.success;
            successMessage.querySelector('p').textContent = t.completion.successText;
        }
        successMessage.style.display = 'block';
        
        // Clear localStorage after successful submission
        try {
            localStorage.removeItem('lyceum_survey_' + sessionId);
        } catch (e) {
            console.error('Error clearing localStorage:', e);
        }
    } else {
        // Show error message
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage && t) {
            errorMessage.querySelector('h1').textContent = t.completion.error;
            errorMessage.querySelector('p').textContent = t.completion.errorText;
        }
        errorMessage.style.display = 'block';
    }
}

// Restart survey
function restartSurvey() {
    currentQuestion = 0;
    answers = {};
    buildingProgress = 0; // Reset building progress
    sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Hide completion screens
    document.getElementById('completionScreen').classList.remove('active');
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('loadingIndicator').style.display = 'none';
    
    // Show question container and navigation
    document.getElementById('questionContainer').style.display = 'flex';
    document.getElementById('navigation').style.display = 'flex';
    document.getElementById('progressBar').style.display = 'block';
    
    initSurvey();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Arrow keys navigation
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousQuestion();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextQuestion();
    }
    // Enter key navigation (but not in text areas)
    else if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        // Only auto-advance if not in textarea
        if (activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            nextQuestion();
        }
    }
    // Shift+Enter in text areas for new line (allow default behavior)
    else if (e.key === 'Enter' && e.shiftKey && e.target.tagName === 'TEXTAREA') {
        // Allow default behavior (new line)
        return;
    }
});

// Window beforeunload - save before leaving
window.addEventListener('beforeunload', (e) => {
    saveToLocalStorage();
    sendToGoogleSheets(false);
});

// Language translations
const translations = {
    sk: {
        intro: {
            title: "Nový branding Lýcea",
            content: `Milí študenti, učitelia, rodičia a priatelia Lýcea,
pracujeme na novej vizuálnej identite a webovej prezentácii školy.
Chceme zistiť, ako Lýceum reálne vnímate – čo pre vás znamená, ako pôsobí navonok a čo by podľa vás malo vyjadrovať. 
Dotazník je anonymný a zaberie len pár minút. Ďakujeme, že ste súčasťou tejto zmeny. 💜`
        },
        role: {
            title: "Aká je Vaša rola vo vzťahu k Lýceu?",
            choices: ["študent", "učiteľ", "rodič"]
        },
        navigation: {
            back: "← Späť",
            continue: "Pokračovať →",
            start: "Začať dotazník →"
        },
        progress: "Otázka",
        of: "z",
        answered: "Zodpovedané",
        required: "Táto otázka je povinná. Prosím, odpovedzte na ňu.",
        completion: {
            loading: "Odosielam odpovede...",
            success: "✓ Ďakujeme!",
            successText: "Váš dotazník bol úspešne odoslaný.",
            error: "⚠ Pozor",
            errorText: "Vaše odpovede sú uložené lokálne. Skúsime ich odoslať automaticky."
        },
        building: {
            title: "Stavajme Lýceum spolu",
            intro: "S každou vašou odpoveďou vyrastá nová budova. Sledujte, ako vaše odpovede pomáhajú budovať Lýceum. 💙",
            messages: [
                "Kladieme základy... 🏗️",
                "Stavíme hlavnú budovu...",
                "Prvé okná sa otvárajú...",
                "Ďalšie okná...",
                "Poschodia rastú...",
                "Svetlo vo vnútri... 💡",
                "Dokončujeme okná...",
                "Pridávame dvere...",
                "Kľučka na dverách... 🚪",
                "Strecha sa montuje...",
                "Lýceum je hotové! 🎉"
            ]
        }
    },
    en: {
        intro: {
            title: "New Lýceum Branding",
            content: `Dear students, teachers, parents and friends of Lýceum,
we are working on a new visual identity and website for the school.
We want to find out how you really perceive Lýceum – what it means to you, how it appears externally and what you think it should express.
The survey is anonymous and takes just a few minutes. Thank you for being part of this change. 💜`
        },
        role: {
            title: "What is your role in relation to Lýceum?",
            choices: ["student", "teacher", "parent"]
        },
        navigation: {
            back: "← Back",
            continue: "Continue →",
            start: "Start Survey →"
        },
        progress: "Question",
        of: "of",
        answered: "Answered",
        required: "This question is required. Please answer it.",
        completion: {
            loading: "Sending responses...",
            success: "✓ Thank you!",
            successText: "Your survey has been successfully submitted.",
            error: "⚠ Warning",
            errorText: "Your responses are saved locally. We will try to send them automatically."
        },
        building: {
            title: "Let's build Lýceum together",
            intro: "With each of your answers, a new building grows. Watch how your responses help build Lýceum. 💙",
            messages: [
                "Laying foundations... 🏗️",
                "Building main structure...",
                "First windows opening...",
                "More windows...",
                "Floors growing...",
                "Light inside... 💡",
                "Finishing windows...",
                "Adding doors...",
                "Door handle... 🚪",
                "Installing roof...",
                "Lýceum is ready! 🎉"
            ]
        }
    }
};

// Language toggle functionality
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Always default to Slovak if not set
    let currentLang = localStorage.getItem('lyceum_language');
    if (!currentLang) {
        currentLang = 'sk';
        localStorage.setItem('lyceum_language', 'sk');
    }
    
    // Set active button based on current language
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
        
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');
            
            // Save language preference
            localStorage.setItem('lyceum_language', btn.dataset.lang);
            
            // Update content with new language
            switchLanguage(btn.dataset.lang);
            console.log('Language switched to:', btn.dataset.lang);
        });
    });
}

// Switch language during survey
function switchLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Re-render all questions with new language
    renderQuestions();
    
    // Show current question again
    showQuestion(currentQuestion);
    
    // Update building messages
    const buildingTitle = document.querySelector('.building-intro-message h2');
    const buildingIntro = document.getElementById('buildingIntroText');
    
    if (buildingTitle) buildingTitle.textContent = t.building.title;
    if (buildingIntro) buildingIntro.textContent = t.building.intro;
    
    // Update building messages array in global scope
    buildingMessages.length = 0;
    buildingMessages.push(...t.building.messages);
    
    // Update progress counter
    updateProgress();
    
    // Update navigation
    updateNavigation();
}

// Update current question with new language
function updateCurrentQuestionLanguage(lang) {
    const currentQ = questions[currentQuestion];
    if (!currentQ) return;
    
    // Update question title
    const titleEl = document.querySelector('.question-title');
    if (titleEl && currentQ[`title_${lang}`]) {
        titleEl.textContent = currentQ[`title_${lang}`];
    }
    
    // Update question description
    const descEl = document.querySelector('.question-description');
    if (descEl && currentQ[`description_${lang}`]) {
        descEl.textContent = currentQ[`description_${lang}`];
    }
    
    // Update choices for choice questions
    if (currentQ.type === 'choice' && currentQ[`choices_${lang}`]) {
        const choices = document.querySelectorAll('.choice');
        choices.forEach((choice, index) => {
            const choiceText = choice.querySelector('.choice-content span:last-child');
            if (choiceText && currentQ[`choices_${lang}`][index]) {
                choiceText.textContent = currentQ[`choices_${lang}`][index];
            }
        });
    }
    
    // Update scale labels
    if (currentQ.type === 'scale' && currentQ[`scaleLabels_${lang}`]) {
        const scaleLabels = document.querySelectorAll('.scale-label-min, .scale-label-max');
        if (scaleLabels.length >= 2) {
            scaleLabels[0].textContent = currentQ[`scaleLabels_${lang}`][0];
            scaleLabels[1].textContent = currentQ[`scaleLabels_${lang}`][1];
        }
    }
    
    // Update image choice descriptions and labels
    if (currentQ.type === 'image_choice') {
        if (currentQ[`description_${lang}`]) {
            const descEl = document.querySelector('.question-description');
            if (descEl) {
                descEl.textContent = currentQ[`description_${lang}`];
            }
        }
        
        // Update image labels
        if (currentQ.images) {
            const imageChoices = document.querySelectorAll('.image-choice');
            imageChoices.forEach((choice, index) => {
                if (currentQ.images[index] && currentQ.images[index][`label_${lang}`]) {
                    // Image labels are usually not visible in UI, but we can update them if needed
                    const img = choice.querySelector('img');
                    if (img) {
                        img.alt = currentQ.images[index][`label_${lang}`];
                    }
                }
            });
        }
    }
    
    // Update textarea placeholders
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        if (textarea.placeholder && currentQ[`placeholder_${lang}`]) {
            textarea.placeholder = currentQ[`placeholder_${lang}`];
        }
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initLanguageToggle();
    initSurvey();
});

// Image modal functions
function openImageModal(imageUrl) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modalImg.src = imageUrl;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

