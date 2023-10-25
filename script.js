document.addEventListener("DOMContentLoaded", function () {
  const questionsEl = document.querySelector("#question-title");
  const timerEl = document.querySelector("#timer");
  const submitBtn = document.querySelector("#submitBtn");
  const startBtn = document.querySelector("#startBtn");
  const initialEl = document.querySelector("#initials");
  const choiceEl = document.querySelector("#choices");
  const correctStatusEl = document.querySelector("#correct");
  const quizEl = document.querySelector("#quiz-questions");
  const endScreenEl = document.querySelector("#end-screen");
  const mainEl = document.querySelector(".main-screen");

  const questions = [
    {
      title: "Which one is a looping structure in JavaScript?",
      choices: [
        { text: "All the below", correct: true },
        { text: "For", correct: false },
        { text: "While", correct: false },
        { text: "Do-while loops", correct: false },
      ],
    },
    {
      title: "What are the two basic groups of data types in JavaScript?",
      choices: [
        { text: "Primitive and attribute", correct: false },
        { text: "Primitive and reference types", correct: true },
        { text: "Reference types and attribute", correct: false },
        { text: "None of the above", correct: false },
      ],
    },
    {
      title: "Commonly used data types DO NOT include:",
      choices: [
        { text: "strings", correct: false },
        { text: "booleans", correct: false },
        { text: "alerts", correct: true },
        { text: "numbers", correct: false },
      ],
    },
    {
      title: "Boolean operators that can be used in JavaScript include:",
      choices: [
        { text: "'And' Operator &&", correct: false },
        { text: "'Or' Operator ||", correct: false },
        { text: "'Not' Operator !", correct: false },
        { text: "All the above", correct: true },
      ],
    },
    {
      title:
        "Which one of these is not among the three different types of errors in JavaScript?",
      choices: [
        { text: "Animation time errors", correct: true },
        { text: "Load time errors", correct: false },
        { text: "Run time errors", correct: false },
        { text: "Logical Errors", correct: false },
      ],
    },
    {
      title: "What is the data type of variables in JavaScript?",
      choices: [
        { text: "Object data types", correct: false },
        { text: "Function data type", correct: false },
        { text: "None of the above", correct: false },
        { text: "All of the above", correct: true },
      ],
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: [
        { text: "quotes", correct: false },
        { text: "curly brackets", correct: false },
        { text: "parentheses", correct: true },
        { text: "square brackets", correct: false },
      ],
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        { text: "numbers and strings", correct: false },
        { text: "other arrays", correct: false },
        { text: "booleans", correct: false },
        { text: "all of the above", correct: true },
      ],
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: [
        { text: "commas", correct: false },
        { text: "curly brackets", correct: false },
        { text: "quotes", correct: true },
        { text: "parentheses", correct: false },
      ],
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: [
        { text: "JavaScript", correct: false },
        { text: "terminal / bash", correct: false },
        { text: "for loops", correct: false },
        { text: "console.log", correct: true },
      ],
    },
    {
      title: "What is the type of Pop up boxes available in JavaScript?:",
      choices: [
        { text: "Alert", correct: true },
        { text: "Confirm", correct: true },
        { text: "Prompt", correct: true },
        { text: "All the above", correct: true },
      ],
    },
  ];

  // Penalty for wrong answers and initial values for score, question index, and time
  const penalty = 10;
  let questionIndex = 0;
  let timerId;
  let time = 0;
  // Function to initialize the quiz
 function quizInit() {
    mainEl.classList.add("hide");
    timerId = setInterval(tick, 1000);
    let questionsEl = document.querySelector("#quiz-questions");
    questionsEl.classList.remove("hide");
    displayQuestion();
    time = 165;
  }

  // Function to display a question
  function displayQuestion() {
    questionsEl.textContent = questions[questionIndex].title;
    displayChoices();
  }

  // Function to display answer choices for the current question
  function displayChoices() {
    choiceEl.innerHTML = "";

    const question = questions[questionIndex];

    // Create and display buttons for each answer choice
    question.choices.forEach((choice, index) => {
      const choiceBtn = document.createElement("button");
      choiceBtn.innerHTML = `${index + 1}. ${choice.text}`;
      choiceBtn.dataset.index = index;
      choiceBtn.classList.add("choices");
      choiceEl.appendChild(choiceBtn);

      // Attach a click event listener to each choice button
      choiceBtn.addEventListener("click", selectAnswer);
    });
  }

  // Function to handle the selection of an answer
  function selectAnswer(e) {
    let selectBtn = e.target;
    const choiceIndex = selectBtn.dataset.index;
    const isCorrect = questions[questionIndex].choices[choiceIndex].correct;
    setStatusClass(isCorrect);

    // Handle correct and incorrect answers
    if (!isCorrect) {
      time -= penalty; // Deduct time for incorrect answers
    }
    console.log(isCorrect, questionIndex);
    questionIndex++;

    // Move to the next question if there are more questions
    if (questionIndex < questions.length) {
      displayQuestion();
    } else if (questionIndex === questions.length) {
      // End the quiz if all questions have been answered
      quizEnd();
    }
  }

  // Function to set the class and text for the correct or wrong answer feedback
  function setStatusClass(isCorrect) {
    clearStatusClass();
    if (isCorrect) {
      correctStatusEl.textContent = "Correct!";
    } else {
      correctStatusEl.textContent = "Wrong!";
    }
    correctStatusEl.classList.remove("hide");
  }

  // Function to clear the class and text for the answer feedback
  function clearStatusClass() {
    correctStatusEl.classList.add("hide");
    correctStatusEl.textContent = "";
  }

  // Function to update the timer and end the quiz if time runs out
  function tick() {
    time--;
    timerEl.textContent = `Time: ${time}`;

    // End the quiz if time is up
    if (time <= 0) {
      quizEnd();
    }
  }

  function endScreen() {
    // Show the end screen
    endScreenEl.classList.remove("hide");

    // Display the final score
    let finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = timerEl.textContent.slice(6);
  }

  // Function to handle the end of the quiz
  function quizEnd() {
    // Stop the timer
    clearInterval(timerId);
    // Handle the end of the quiz, display the score, and perform other actions
    console.log("Game over");
    quizEl.classList.add("hide");
    endScreen();
    questionIndex = 0;
    time = 0;
  }

  // Attach the quizInit function to the start button's click event
  startBtn.addEventListener("click", quizInit);

   submitBtn.addEventListener("click", () => {
    endScreenEl.classList.add("hide");
    mainEl.classList.remove("hide");

    if (initialEl.value === "") {
      alert("Please enter your initials");
    } else {
      var finalScore = {
        initials: initialEl.value,
        score: timerEl.textContent.slice(6),
      };
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
    }
  });
});