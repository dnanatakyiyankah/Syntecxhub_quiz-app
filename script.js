const questions = [
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        answer: 0
    },
    {
        question: "Which programming language is known for its use in web development and has a mascot named Guido?",
        options: ["JavaScript", "Python", "Ruby", "PHP"],
        answer: 1
    },
    {
        question: "What is the primary function of CSS in web development?",
        options: ["To add interactivity", "To structure content", "To style the appearance", "To store data"],
        answer: 2
    },
    {
        question: "Which of the following is a relational database management system?",
        options: ["MongoDB", "MySQL", "Redis", "Cassandra"],
        answer: 1
    },
    {
        question: "What does SQL stand for?",
        options: ["Simple Query Language", "Structured Query Language", "Standard Question Language", "System Query Logic"],
        answer: 1
    },
    {
        question: "In cybersecurity, what does 'phishing' refer to?",
        options: ["A type of malware", "A social engineering attack", "A network protocol", "A encryption method"],
        answer: 1
    },
    {
        question: "What is the purpose of version control systems like Git?",
        options: ["To compile code", "To track changes in code", "To debug programs", "To deploy applications"],
        answer: 1
    },
    {
        question: "Which cloud computing service is provided by Amazon?",
        options: ["Azure", "Google Cloud", "AWS", "IBM Cloud"],
        answer: 2
    },
    {
        question: "What does API stand for in software development?",
        options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Process Interaction", "Application Process Interface"],
        answer: 0
    },
    {
        question: "Which of the following is an example of a NoSQL database?",
        options: ["PostgreSQL", "Oracle", "MongoDB", "SQL Server"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressElement = document.getElementById('progress');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    optionsElement.innerHTML = '';
    nextBtn.style.display = 'none';
    prevBtn.style.display = currentQuestionIndex > 0 ? 'block' : 'none';

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.classList.add('option');
        if (userAnswers[currentQuestionIndex] !== null) {
            // already answered, show highlights
            const correct = currentQuestion.answer;
            const selected = userAnswers[currentQuestionIndex];
            if (index === correct) {
                optionElement.classList.add('correct');
            } else if (index === selected) {
                optionElement.classList.add('wrong');
            }
            optionElement.classList.add('disabled');
            nextBtn.style.display = 'block';
        } else {
            optionElement.addEventListener('click', () => selectOption(index, optionElement));
        }
        optionsElement.appendChild(optionElement);
    });
}

function selectOption(index, element) {
    if (userAnswers[currentQuestionIndex] !== null) return; // already answered
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    if (userAnswers[currentQuestionIndex] === null) {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) return;
        const selectedIndex = Array.from(document.querySelectorAll('.option')).indexOf(selectedOption);
        userAnswers[currentQuestionIndex] = selectedIndex;
        // highlight
        const options = document.querySelectorAll('.option');
        const correct = questions[currentQuestionIndex].answer;
        options[correct].classList.add('correct');
        if (selectedIndex !== correct) {
            options[selectedIndex].classList.add('wrong');
        }
        options.forEach(opt => opt.classList.add('disabled'));
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showScore();
            }
        }, 1000);
    } else {
        // already answered, just move next
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }
});

prevBtn.addEventListener('click', () => {
    currentQuestionIndex--;
    loadQuestion();
});

function showScore() {
    const score = userAnswers.filter((ans, i) => ans !== null && ans === questions[i].answer).length;
    document.getElementById('question-container').style.display = 'none';
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    scoreContainer.style.display = 'block';
    scoreElement.textContent = score;
    totalElement.textContent = questions.length;
}

restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    userAnswers.fill(null);
    scoreContainer.style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    loadQuestion();
});

loadQuestion();