//DOM elements//
const startScreen= document.getElementById("start-screen");
const quizScreen= document.getElementById("quizscreen");
const resultScreen= document.getElementById("result-screen");
const startbutton= document.getElementById("startbtn");
const questionText=document.getElementById("questiontext");
const answerContainer=document.getElementById("answer-container");
const currentQxn= document.getElementById("current-question");
const totalQuestion= document.getElementById("totalquestion");
const scores= document.getElementById("score");
const finalScore= document.getElementById("finalscore");
const maxScore= document.getElementById("maxscore");
const resultMessage= document.getElementById("resultmessage");
const restartBtn= document.getElementById("restartbtn");
const progressBar= document.getElementById("progress");
const progressContainer = document.getElementById("progressBar");

//Questions
const quizQuestions=[
    {question: "What is the main ingredient in a capuccino besides espresso?",
        answers:[
            {text: "Water", correct: false},
            {text: "Steamed milk", correct: true},
            {text: "Chocolate Syrup", correct: false},
            {text: "Whipped cream", correct: false},
        ],
    },
    {question: "Where did coffee originally come from?",
        answers:[
            {text: "Brazil", correct: false},
            {text: "Ethiopia", correct: true},
            {text: "Colombia", correct: false},
            {text: "Italy", correct: false},
        ],
    },
    {question: "What type of coffee bean is the most commonly produced worldwide? ",
        answers:[
            {text: "Robusta", correct: false},
            {text: "Arabica", correct: true},
            {text: "Liberica", correct: false},
            {text: "Excelsa", correct: false},
        ],
    },
    {question: "What is espresso?",
        answers:[
            {text: "A coffee brewed by boiling water and grounds together", correct: false},
            {text: "A method of brewing coffee by forcing hot water under pressure through finely-ground beans", correct: true},
            {text: "A sweetened coffee drink with milk", correct: false},
            {text: "AInstant coffee powder", correct: false},
        ],
    },
    {question: "Which country is currently the largest producer of coffee?",
        answers:[
            {text: "Vietnam", correct: false},
            {text: "Indonesia", correct: false},
            {text: "Kenya", correct: false},
            {text: "Brazil", correct: true},
        ],
    },
    {question: "What does “latte” mean in Italian?",
        answers:[
            {text: "Foam", correct: false},
            {text: "Milk", correct: true},
            {text: "Coffee", correct: false},
            {text: "Hot", correct: false},
        ],
    },
    {question: "What’s the difference between an Americano and an espresso?",
        answers:[
            {text: "Americano has more coffee beans", correct: false},
            {text: "Americano has added water", correct: true},
            {text: "Espresso has sugar", correct: false},
            {text: "Espresso is cold", correct: false},
        ],
    },
    {question: "What does a barista do?",
        answers:[
            {text: "Grows coffee beans", correct: false},
            {text: "Serves and prepares coffee drinks", correct: true},
            {text: "Roasts coffee beans", correct: false},
            {text: "Invents coffee recipes", correct: false},
        ],
    },
    {question: "What part of the coffee plant is used to make coffee?",
        answers:[
            {text: "Leaf", correct: false},
            {text: "Flower", correct: false},
            {text: "Bean", correct: true},
            {text: "Root", correct: false},
        ],
    },
    {question: "What is cold brew coffee?",
        answers:[
            {text: "Coffee brewed with cold water over a long time", correct: true},
            {text: "Coffee brewed and then chilled with ice", correct: false},
            {text: "Coffee with milk and ice", correct: false},
            {text: "Coffee that’s been frozen", correct: false},
        ],
    },
];
//Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false; //first click on the answer then it will disabled until the next question,
                            //so core will not increment when you accidentally double click on the answer

totalQuestion.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

//event Listeners
startbutton.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

//methods
function startQuiz(){
    //console.log("quiz started")
    //reset variables
    currentQuestionIndex = 0;
    score = 0;
    scores.textContent = score;

    startScreen.classList.remove("active");
    //resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    progressBar.style.display = "block";

    showQuestion();
}

function showQuestion(){
  //reset state  
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQxn.textContent = currentQuestionIndex + 1;

  //update the progress bar
  const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  //todo: explain
   answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer=>{
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-button");

    //what is dataset? - property of the button element that allows you to store, custom data
    //adding the true field in a button
    //format:  button.dataset.any name = ...;
    button.dataset.correct = answer.correct;

    //add click event into the answer
    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button);
  });
}
   // now with the answers in buttons
  //if you add eventListener, by default it will get an argument called event
  function selectAnswer(event){
    //optimization check
    if(answerDisabled) return;

    answerDisabled= true;

    const selectedBtn =event.target;
    const isCorrect =selectedBtn.dataset.correct ==="true";

    // first this is(answerContainer) not an array then convert to an array
    //so we can use .forEach method
    // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, 
    // this is because the NodeList is not an array and we need to use the forEach method
    Array.from(answerContainer.children).forEach(button=>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }else if(button === selectedBtn){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scores.textContent = score;   
    }
    //add delays
    setTimeout(()=>{currentQuestionIndex++;

        //check if there are more question or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();

            } else{
                showResults();
        }
        }, 800);
  }
 function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    progressContainer.style.display = "none";

    finalScore.textContent = score;

    const percentage = (score/quizQuestions.length)*100;

    if(percentage === 100){
        const img = document.createElement("img"); // 🧱 make an <img>
            img.src = "hirono.png";      // 🖼️ where your image is
            img.alt = "Hirono";                        // ♿ text if image doesn’t load
            img.style.width = "80px";                 // 📏 optional size
            img.style.width = "50px"; 
            
            img.style.display = "block";     
            img.style.margin = "10px auto";

            resultMessage.textContent = "Perfect! You're a coffee genius!"; 
            resultMessage.appendChild(img);
        } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}


function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}


