const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

// let so they can be redefined later
let shuffledQuestions, currentQuestionIndex

/** 
 * Give an eventlistener to the start and nect-button.
 * when the user clicks the button.
 */
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
});
/**
 * Function to start the game. 
 * The startbutton will hide when you start
 * The questions will shuffle so question is random
 * Bring up the next question
 * 
 */
function startGame() {
    console.log('started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0; // So we start with the first question 
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
};

// Function to set the next question
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

/**
 * Function to show the questions
 * Function to show the answers
 * create a button for all the answers
 * listen to when the user clicks the btn and implements a new function 
 */
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct // fråga och kolla denna 
            //Increment score
            
        } else {
            
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
/**
 * Hide the next-button 
 * hide the children from the id answer-buttons
 */
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
/**
 * Function for the user to select an answer
 * Targets the buton the user selects 
 * loops every button and checks if the answer is correct
 * Function to show a next-button if we have some questions left 
 * else a restart-button to restart the game
 */
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    /*
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })*/
    //setStatusClass(document.body, correct)
    
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

}

/**
 * If the answer is correct it adds the class correct
 * If the answer is wrong it adds the class wrong
 */
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        incrementScore();
        alert("Hey! You got it right! :D");
    } else {
        element.classList.add('wrong')
        incrementWrongAnswer(); 
        alert("Hey! You got it wrong! D:");
    }
}
/**
 * If the answer is correct it removes the class correct
 * If the answer is wrong it removes the class wrong
 */
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
    
}


// My questions 
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
        question: 'What band had their last gig on a rooftop?',
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