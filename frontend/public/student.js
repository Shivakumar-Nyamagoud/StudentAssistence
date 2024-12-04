// import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// // DOM Elements
// const takeQuizBtn = document.getElementById('take-quiz-btn');
// const quizSection = document.getElementById('quiz-section');
// const startQuizBtn = document.getElementById('start-quiz-btn');
// const quizContainer = document.getElementById('quiz-container');
// const questionText = document.getElementById('question-text');
// const optionsList = document.getElementById('options-list');
// const submitAnswerBtn = document.getElementById('submit-answer-btn');
// const quizResult = document.getElementById('quiz-result');
// const scoreDisplay = document.getElementById('score');
// const retryQuizBtn = document.getElementById('retry-quiz-btn');

// let questions = [];
// let currentQuestionIndex = 0;
// let score = 0;
// let selectedAnswer = "";

// // Toggle visibility of quiz section when "Take Quiz" is clicked
// takeQuizBtn.addEventListener('click', () => {
//     // Show the quiz section and hide the others
//     quizSection.style.display = 'block';
//     startQuizBtn.style.display = 'block';
//     quizResult.style.display = 'none';
//     quizContainer.style.display = 'none';

//     // Optionally, you could hide the other sections here if needed
//     document.getElementById('add-course-form').style.display = 'none';
//     document.getElementById('your-courses-form').style.display = 'none';
// });

// // Start Quiz Button Event
// startQuizBtn.addEventListener('click', async () => {
//     startQuizBtn.style.display = 'none';
//     quizContainer.style.display = 'block';
//     await fetchQuizQuestions(); // Fetch questions when starting the quiz
// });

// // Fetch Quiz Questions from Open Trivia Database API
// async function fetchQuizQuestions() {
//     const response = await fetch('https://opentdb.com/api.php?amount=49&category=19'); // Fetch 5 random multiple choice questions
//     const data = await response.json();
//     questions = data.results;
//     loadQuestion(currentQuestionIndex);
// }

// // Load Question and Options
// function loadQuestion(index) {
//     const question = questions[index];
//     questionText.textContent = question.question;
//     optionsList.innerHTML = ''; // Clear previous options

//     // Shuffle options
//     const options = [...question.incorrect_answers, question.correct_answer];
//     shuffleArray(options);

//     options.forEach((option, i) => {
//         const li = document.createElement('li');
//         li.textContent = option;
//         li.addEventListener('click', () => selectAnswer(option));
//         optionsList.appendChild(li);
//     });
// }

// // Shuffle options to randomize order
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

// // Select an Answer
// function selectAnswer(answer) {
//     selectedAnswer = answer;
//     // Highlight the selected answer (optional)
//     Array.from(optionsList.children).forEach((li) => {
//         li.style.backgroundColor = li.textContent === selectedAnswer ? '#ddd' : '';
//     });
// }

// // Submit Answer Button Event
// submitAnswerBtn.addEventListener('click', () => {
//     if (selectedAnswer === "") {
//         alert('Please select an answer');
//         return;
//     }

//     // Check if the selected answer is correct
//     const correctAnswer = questions[currentQuestionIndex].correct_answer;
//     if (selectedAnswer === correctAnswer) {
//         score++;
//     }

//     // Move to the next question or finish the quiz
//     currentQuestionIndex++;
//     if (currentQuestionIndex < questions.length) {
//         loadQuestion(currentQuestionIndex);
//     } else {
//         showQuizResult();
//     }
// });

// // Show Quiz Result
// function showQuizResult() {
//     quizContainer.style.display = 'none';
//     quizResult.style.display = 'block';
//     scoreDisplay.textContent = score;

//     // Save the result to Firebase under the student's ID
//     const studentId = "currentStudentId"; // You need to get the current student's ID from session or login info
//     const db = getDatabase();
//     const resultsRef = ref(db, 'quizResults/' + studentId);
//     push(resultsRef, {
//         score: score,
//         date: new Date().toLocaleString()
//     }).then(() => {
//         console.log('Quiz result saved successfully');
//     }).catch((error) => {
//         console.error('Error saving quiz result:', error);
//     });
// }

// // Retry Quiz Button Event
// retryQuizBtn.addEventListener('click', () => {
//     score = 0;
//     currentQuestionIndex = 0;
//     showQuizResult();
//     quizContainer.style.display = 'none';
//     startQuizBtn.style.display = 'block';
// });
