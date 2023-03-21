const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
});

function startGame() {
    console.log('started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
};

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [{
        question: 'Which actress starred in the movie Mamma Mia?',
        answers: [{
                text: 'Merryl Streep',
                correct: true
            },
            {
                text: 'Cate Blanchet',
                correct: false
            },
            {
                text: 'Nicole Kidman',
                correct: false
            },
            {
                text: 'Julia Roberts',
                correct: false
            },
        ]
    },
    {
        question: 'What band had their last gig on a rooftop',
        answers: [{
                text: 'Iron Maiden',
                correct: false
            },
            {
                text: 'The Beatles',
                correct: true
            },
            {
                text: 'The Monkees',
                correct: false
            },
            {
                text: 'Queen',
                correct: false
            }
        ]
    },
    {
        question: 'on 15th of march 2023 Brian May from the band queen was knighted by king Richard. What instrument does he play?',
        answers: [{
                text: 'Drums',
                correct: false
            },
            {
                text: 'Guitar',
                correct: true
            },
            {
                text: 'Piano',
                correct: false
            },
            {
                text: 'Base',
                correct: false
            }
        ]
    },
    {
        question: 'What song is the most streamed song ever on spotify?',
        answers: [{
                text: 'Shape Of You - Ed Sheeran',
                correct: false
            },
            {
                text: 'Bad Guy - Billie Eilish',
                correct: false
            },
            {
                text: 'One Dance - Drake',
                correct: false
            },
            {
                text: 'Blinding Lights - The Weeknd',
                correct: true
            }
        ]
    },
    {
        question: 'The album Thriller by michael Jackson is the best-selling album of all time with 51.2 million copies. Which album is the second best selling one?',
        answers: [{
                text: 'The Dark Side of the Moon by Pink Floyd',
                correct: false
            },
            {
                text: 'The Bodyguard by Whitney Houston',
                correct: false
            },
            {
                text: 'Back in Black by ACDC',
                correct: true
            },
            {
                text: 'Saturday Night Fever by Bee Gees',
                correct: false
            }
        ]
    }
]