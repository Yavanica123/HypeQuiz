const questions = [
    {
        question: "Which country's central bank governor resigned unexpectedly in March 2025?",
        options: ["Australia", "New Zealand", "Canada", "United Kingdom"],
        correct: 1
    },
    {
        question: "Which European leader proposed extending their country's nuclear umbrella to European allies in March 2025?",
        options: ["German Chancellor", "French President", "British Prime Minister", "Italian Prime Minister"],
        correct: 1
    },
    {
        question: "Which country's President granted a one-month exemption for domestic automakers from new tariffs in March 2025?",
        options: ["United States", "Canada", "Mexico", "China"],
        correct: 0
    },
    {
        question: "Which Indian state presented a budget of Rs 1.65 lakh crore for 2025-26 in March 2025?",
        options: ["Maharashtra", "Chhattisgarh", "Karnataka", "Tamil Nadu"],
        correct: 1
    },
    {
        question: "Which organization released a report titled 'From Borrowers to Builders – Women's Role in India's Financial Growth Story' in March 2025?",
        options: ["Reserve Bank of India", "NITI Aayog", "Ministry of Finance", "World Bank"],
        correct: 1
    },
    {
        question: "Which country's air force explored integrating the Harpoon anti-ship missile on F-16 aircraft in March 2025?",
        options: ["United States", "Russia", "China", "India"],
        correct: 0
    },
    {
        question: "In March 2025, tensions escalated between which two countries at the Torkham border crossing?",
        options: ["India and Pakistan", "Pakistan and Afghanistan", "Iran and Iraq", "Turkey and Syria"],
        correct: 1
    },
    {
        question: "Which Indian state faced challenges in its cotton industry due to whiteflies and pink bollworms in March 2025?",
        options: ["Gujarat", "Punjab", "Madhya Pradesh", "Andhra Pradesh"],
        correct: 1
    },
    {
        question: "Which Indian state launched the Swavalambini Women Entrepreneurship Programme with NITI Aayog in March 2025?",
        options: ["Maharashtra", "Karnataka", "Tamil Nadu", "Odisha"],
        correct: 3
    },
    {
        question: "Which Indian space mission was planned for launch in March 2025 to explore the lunar south pole?",
        options: ["Chandrayaan-3", "Chandrayaan-4", "Mangalyaan-2", "Gaganyaan"],
        correct: 1
    }
];

const questionEl = document.getElementById("question");
const answerBtns = document.getElementById("answers"); 
const nextBtn = document.getElementById("next");
const timerEl = document.getElementById("tleft");

let currentQuestion = 0, score = 0, timeLeft, timer;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    nextBtn.style.display = "none";
    loadQuestion();
}

function loadQuestion() {
    reset();
    let q = questions[currentQuestion];
    questionEl.innerText = q.question;
    q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("btn");
        btn.setAttribute("data-index", i);
        btn.addEventListener("click", selectAnswer);
        answerBtns.appendChild(btn);
    });
    startTimer();
}

function reset() {
    clearInterval(timer);
    timeLeft = 10;
    timerEl.innerText = timeLeft;
    answerBtns.innerHTML = "";
    nextBtn.style.display = "none";
}

function startTimer() {
    timer = setInterval(() => {
        timerEl.innerText = --timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            questionEl.innerText = "Time's Up!";
            disableButtons();
            nextBtn.style.display = "block";
        }
    }, 1000);
}

function selectAnswer(event) {
    clearInterval(timer);
    let index = event.target.getAttribute("data-index");
    if (index == questions[currentQuestion].correct) {
        score++;
        event.target.classList.add("correct");
    } else {
        event.target.classList.add("wrong");
    }
    disableButtons();
    nextBtn.style.display = "block";
}

function disableButtons() {
    document.querySelectorAll(".btn").forEach(btn => btn.disabled = true);
}

nextBtn.addEventListener("click", () => {
    if (++currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionEl.innerText = `Quiz Completed! Score: ${score}/${questions.length}`;
        nextBtn.style.display = "none";
    }
});

startQuiz();
