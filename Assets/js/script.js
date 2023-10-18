let questionsEl = document.querySelector('#question-title');
let timerEl = document.querySelector('#timer');
let choicesEl = document.querySelector('#choices');
let submitBtn = document.querySelector("#submitBtn");
let startBtn = document.querySelector("#startBtn");
let initialEl = document.querySelector("#initials");
let feedbackEl = document.querySelector("#feedback");
let choices = document.querySelector('#choices');

const questions = [
  {
    title: "Which one is a looping structure in JavaScript?",
    choices: ["All the below", "For", "While", "Do-while loops"],
    answer: "All the below",
  },
  {
    title: "What are the two basic groups of data types in JavaScript?",
    choices: [
      "Primitive and attribute",
      "Primitive and reference types",
      "Reference types and attribute",
      "None of the above",
    ],
    answer: "Primitive and reference types",
  },
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "Boolean operators that can be used in JavaScript include:",
    choices: [
      "'And' Operator &&",
      "'Or' Operator ||",
      "'Not' Operator !",
      "All the above",
    ],
    answer: "All the above",
  },
  {
    title:
      "Which one of these is not among the three different types of errors in JavaScript?",
    choices: [
      "Animation time errors",
      "Load time errors",
      "Run time errors",
      "Logical Errors",
    ],
    answer: "Animation time errors",
  },
  {
    title: "What is the data type of variables in JavaScript?",
    choices: [
      "Object data types",
      "Function data type",
      "None of the above",
      "All of the above",
    ],
    answer: "Object data types",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
  {
    title: "What is the type of Pop up boxes available in JavaScript?:",
    choices: ["Alert", "Confirm", "Prompt", "All the above"],
    answer: "All the above",
  },
];

let questionIndex = 0;
let time = questions.length * 15;
let timerId;

function quizInit() {
    //Hides main screen
    let mainEl = document.querySelector(".main-screen");
    mainEl.setAttribute("class", 'hide');
    //Starts timer
    timerId = setInterval(tick, 1000);
    //Unhides questions
    let questionsEl = document.querySelector("#quiz-questions");
    questionsEl.classList.remove("hide");
    displayQuestion();
}

function displayQuestion() {
  questionsEl.textContent = questions[questionIndex].title;
  displayChoices();
};

function displayChoices() {
  //clears previous choices
  choices.innerHTML = '';

  for(let i = 0; i < questions[questionIndex].choices.length; i++){
    const choiceBtn = document.createElement('button');
    choiceBtn.textContent = `${i + 1}. ${questions[questionIndex].choices[i]}`;
    choices.appendChild(choiceBtn);
  }
}

function tick(){
    time--;
    timerEl.textContent = time;
    time <= 0 ? quizEnd(): null;
}

function quizEnd(){
    clearInterval(timerId);

    let endScreenEl = document.getElementById('#end-screen');
    endScreenEl.removeAttribute('class');
}

startBtn.addEventListener("click", quizInit);