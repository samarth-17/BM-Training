interface QuestionType {
    question: string;
    incorrect_answers: string[];
    correct_answer: string;
}

const startButton = document.getElementById("startbuttn") as HTMLButtonElement | null;
const quizContainer = document.getElementById("quiz-container") as HTMLDivElement | null;

let currentQuestionIndex: number = 0;
let score: number = 0;
let questions: QuestionType[] = [];

async function fetchQuestions(): Promise<QuestionType[]> {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple");
        const data = await response.json();
        return data.results;

}


async function startQuiz(): Promise<void> {

    const heading = document.querySelector("h1") as HTMLHeadingElement | null;
    const cont1 = document.querySelector(".cont1") as HTMLDivElement | null;

    if (heading) heading.style.display = "none";
    if (cont1) cont1.style.display = "none";

    if (quizContainer) quizContainer.style.display = "block";

    questions = await fetchQuestions();
    showQuestion();
}

function showQuestion(): void {
    if (currentQuestionIndex >= questions.length) {
        return showScore();
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!quizContainer) return; 

    quizContainer.innerHTML = `
        <div class="quiz-container">
            <h2 id="question">${currentQuestion.question}</h2>
            <div id="answers" class="d-flex flex-column align-items-center mt-3"></div>
            <button id="next-btn" class="btn btn-outline-light" style="display: none;">Next</button>
        </div>
    `;

    const answersElement = document.getElementById("answers") as HTMLDivElement | null;
    if (!answersElement) return;


    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    answers.sort(() => Math.random());

    answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn", "btn-outline-light", "mb-2", "w-50");
        button.addEventListener("click", () => selectAnswer(button, answer, currentQuestion.correct_answer));
        answersElement.appendChild(button);
    });

    const nextButton = document.getElementById("next-btn") as HTMLButtonElement | null;
    if (nextButton) {
        nextButton.addEventListener("click", nextQuestion);
    }
}

function selectAnswer(button: HTMLButtonElement, selected: string, correct: string): void {
    const buttons = document.querySelectorAll("#answers button") as NodeListOf<HTMLButtonElement>;
    buttons.forEach((btn) => (btn.disabled = true));

    if (selected === correct) {
        button.classList.add("btn-success");
        score++;
    } else {
        button.classList.add("btn-danger");
    }

    const nextButton = document.getElementById("next-btn") as HTMLButtonElement | null;
    if (nextButton) nextButton.style.display = "block";
}


function nextQuestion(): void {
    currentQuestionIndex++;
    showQuestion();
}

function showScore(): void {
    if (!quizContainer) return;

    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${score} / ${questions.length}</p>
        <button class="btn btn-outline-light" onclick="location.reload()">Restart Quiz</button>
    `;
}

startButton.addEventListener("click", () => startQuiz());


