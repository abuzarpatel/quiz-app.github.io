const questions = [
    {
        question: "Who is the father of HTML?",
        answers: [
            { text: "Rasmus Lerdorf" , correct: false},
            { text: "Tim Berners-Lee" , correct: true},
            { text: "Brendan Eich" , correct: false},
            { text: "Sergey Brin" , correct: false},
        ]
    },
    {
        question: "HTML stands for __________",
        answers: [
            { text: "HyperText Markup Language" , correct: true},
            { text: "HyperText Machine Language" , correct: false},
            { text: "HyperText Marking Language" , correct: false},
            { text: "HighText Marking Language" , correct: false},
        ]
    },
    {
        question: "Which of the following is used to read an HTML page and render it?",
        answers: [
            { text: "Web server" , correct: false},
            { text: "Web network" , correct: false},
            { text: " Web browser" , correct: true},
            { text: " Web matrix" , correct: false},
        ]
    },
    {
        question: " In which part of the HTML metadata is contained?",
        answers: [
            { text: "head tag" , correct: true},
            { text: "title tag" , correct: false},
            { text: "html tag" , correct: false},
            { text: "body tag" , correct: false},
        ]
    },
    {
        question: "Which element is used for or styling HTML5 layout?",
        answers: [
            { text: "CSS" , correct: true},
            { text: " jQuery" , correct: false},
            { text: " JavaScript" , correct: false},
            { text: "PHP" , correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"; 
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();