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
startButton.addEventListener('click', startGame)
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
    resetScore();
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
            button.dataset.correct = answer.correct 
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
        
    } else {
        element.classList.add('wrong')
        incrementWrongAnswer(); 
        
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
/**
 * Function to reset the score
 */
 function resetScore() {
    // reset score 1
    const score1 = document.getElementById("score");
    score1.innerHTML = "0";
    
    // reset score 2
    const score2 = document.getElementById("incorrect");
    score2.innerHTML = "0";
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
        question: 'on March 15, 2023, Brian May who is a member of Queen was knighted by King Richard. What instrument does he play',
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
                text: 'Bass Guitar',
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
        question: 'The album Thriller by Michael Jackson is the best-selling album of all time with 51.2 million copies. Which album is the second best selling one?',
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
    },
    {
        question: 'Which movie is the highest-grossing movie of all time?',
        answers: [{
                text: 'Avengers: Endgame',
                correct: false
            },
            {
                text: 'Avatar',
                correct: true
            },
            {
                text: 'Titanic',
                correct: false
            },
            {
                text: 'The Lion King',
                correct: false
            }
        ]
    },
    {
    question: 'With 4 0scars, this talented actor/actress is the most awarded of all time. Who is it?',
        answers: [{
                text: 'Merryl Streep',
                correct: false
            },
            {
                text: 'Marlon Brando',
                correct: false
            },
            {
                text: 'Katharine Hepburn',
                correct: true
            },
            {
                text: 'Jack Nicholson',
                correct: false
            }
        ]
    },
    {
     question: 'Which year was the first year for the oscars?',
        answers: [{
                text: '1935',
                correct: false
            },
            {
                 text: '1957',
                 correct: false
            },
            {
                 text: '1919',
                correct: false
            },
            {
                 text: '1929',
                correct: true
            }
            ]
        },
   {
    question: 'Beyonce is one of the worlds wellknown artist in the world. What was the name of her group were she had her breakthrough?',
        answers: [{
                text: 'The Destinys Child',
                correct: true
            },
            {
                text: 'Atomic Kitten',
                correct: false
            },
            {
                text: 'Spice Girls',
                correct: false
            },
            {
                text: 'Fugees',
                correct: false
            }
            ]
        },  
    {
    question: 'K-pop is a genre that has taken the world by storm and one of the biggest groups are BTS. Who many members are there in BTS?',
        answers: [{
            text: '9',
            correct: false
        },
        {
            text: '7',
            correct: true
        },
        {
            text: '5',
            correct: false
        },
        {
            text: '12',
            correct: false
        }
        ]
},  
{
    question: 'Bollywood is the largest film industry in India. Approximately how many films are made there in a year?',
        answers: [{
            text: '400',
            correct: false
        },
        {
            text: '600',
            correct: false
        },
        {
            text: '700',
            correct: false
        },
        {
            text: '900',
            correct: true
        }
        ]
} 
]