const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');
const startButton = document.getElementById('start-btn');
const timeoutSound = document.getElementById('timeout-sound'); // Seleccionar el elemento de audio

let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let incorrectQuestions = []; // Para guardar las preguntas incorrectas
let timer;
let timeLeft = 5;

const totalQuestions = 20;
let questions = [];

// Genera las preguntas aleatorias de las tablas de multiplicar
function generateQuestions() {
    for (let i = 0; i < totalQuestions; i++) {
        let num1 = Math.floor(Math.random() * 8) + 2; // Número de la tabla (del 2 al 9)
        let num2 = Math.floor(Math.random() * 10); // Número a multiplicar (del 0 al 9)
        questions.push({ num1, num2, correctAnswer: num1 * num2 });
    }
}

// Muestra la siguiente pregunta
function showNextQuestion() {
    if (currentQuestion < totalQuestions) {
        const { num1, num2 } = questions[currentQuestion];
        questionElement.textContent = `¿Cuánto es ${num1} x ${num2}?`;
        answerElement.value = '';
        startTimer();
    } else {
        endGame();
    }
}

// Inicia el temporizador de 5 segundos
function startTimer() {
    timeLeft = 5;
    timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;

        if (timeLeft === 0) {
            clearInterval(timer);
            timeoutSound.play(); // Reproducir sonido cuando el tiempo se acaba
            checkAnswer();
        }
    }, 1000);
}

// Verifica la respuesta del usuario
function checkAnswer() {
    clearInterval(timer);
    const userAnswer = answerElement.value ? parseInt(answerElement.value) : 'Sin contestar';
    const { num1, num2, correctAnswer } = questions[currentQuestion];

    if (userAnswer === correctAnswer) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
        incorrectQuestions.push({ num1, num2, correctAnswer, userAnswer }); // Guardar las respuestas incorrectas
    }

    currentQuestion++;
    showNextQuestion();
}

// Finaliza el juego y muestra los resultados
function endGame() {
    let score = (correctAnswers / totalQuestions) * 10;
    resultElement.textContent = `Juego terminado. Respuestas correctas: ${correctAnswers}, Respuestas incorrectas: ${incorrectAnswers}. Tu puntuación es: ${score.toFixed(1)} / 10`;

    // Mostrar las respuestas incorrectas y las correctas
    if (incorrectQuestions.length > 0) {
        let incorrectList = "<h2>Respuestas incorrectas o sin contestar:</h2><ul>";
        incorrectQuestions.forEach(q => {
            let userAnswerText = q.userAnswer === 'Sin contestar' ? 'Sin contestar' : q.userAnswer;
            incorrectList += `<li>${q.num1} x ${q.num2} = ${q.correctAnswer} (Tu respuesta: ${userAnswerText})</li>`;
        });
        incorrectList += "</ul>";
        resultElement.innerHTML += incorrectList;
    }

    resultElement.classList.remove('hidden');
    questionElement.classList.add('hidden');
    answerElement.classList.add('hidden');
    timerElement.classList.add('hidden');
    startButton.classList.remove('hidden');
    startButton.textContent = "Reiniciar";
}

// Inicia el juego
function startGame() {
    questions = [];
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    incorrectQuestions = []; // Reiniciar el registro de preguntas incorrectas
    resultElement.classList.add('hidden');
    questionElement.classList.remove('hidden');
    answerElement.classList.remove('hidden');
    timerElement.classList.remove('hidden');
    startButton.classList.add('hidden');
    generateQuestions();
    showNextQuestion();
}

// Evento al iniciar el juego
startButton.addEventListener('click', startGame);

// Detecta cuando el usuario presiona Enter para verificar la respuesta antes del tiempo
answerElement.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
