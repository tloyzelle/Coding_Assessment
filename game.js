//variables
var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText = document.getElementById("questionCounter");
var scoreText = document.getElementById("score");

//let
let currentQuestion = {}
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
//questions
let questions = [
    {
        question: "Commonly used data typoes do NOT include ______.",
        choice1: "Strings",
        choice2: "Booleans",
        choice3: "Alerts",
        choice4: "Numbers",
        answer: 3
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choice1: "Quotes",
        choice2: "Curly Brackets",
        choice3: "Parenthesis",
        choice4: "Square Brackets",
        answer: 3
    },
    {
        question: "Arrays in Javascript can be used to store _____.",
        choice1: "Numbers and Strings",
        choice2: "Other Arrays",
        choice3: "Booleans",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variable.",
        choice1: "Commas",
        choice2: "Curly Brackets",
        choice3: "Quotes",
        choice4: "Parenthesis",
        answer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "Javascript",
        choice2: "Terminal/Bash",
        choice3: "For Loops",
        choice4: "console.log",
        answer: 4
    }
]

///constants
const CORRECT_BONUS = 25;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length ===0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //goes to end page
        return window.location.assign("end.html");
    };

    questionCounter++ ;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply == "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});
//adding to score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();