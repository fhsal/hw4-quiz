
// comment
var pos = 0;
var correct = 0;
var test, test_status, quest, choice, choices, chA, chB, chC, chD;
var answerA = "a";
var i;
var round = 0;
var answer;
var response ="";
var score = 0;
var totalTime = 120;
var secondsElapsed = 0;
var timeLeft;
var interval;
var highScores = "";
var savedScores = "";
var initials = "";
localStorage.savedScores= "High Scores: ";


// functions to hide/show buttons at during quiz

function hideButtons() {

document.getElementById("errorDisplay").style.visibility= "hidden";
document.getElementById("scoreDisplay").style.visibility= "hidden";
document.getElementById("nextQuestion").style.visibility= "hidden";
document.getElementById("StartOver").style.visibility= "hidden";
document.getElementById("submitInitials").style.visibility= "hidden";
document.getElementById("clearHighScores").style.visibility= "hidden";

}

function showQuizButtons() {
  document.getElementById("startBtn").style.visibility= "hidden";
  document.getElementById("nextQuestion").style.visibility= "visible";
  document.getElementById("StartOver").style.visibility= "hidden";
  document.getElementById("submitInitials").style.visibility= "hidden";
  document.getElementById("clearHighScores").style.visibility= "hidden";
  
}

function showEndQuizButtons() {

  document.getElementById("startBtn").style.visibility= "hidden";
  document.getElementById("nextQuestion").style.visibility= "hidden";
  document.getElementById("StartOver").style.visibility= "visible";
  document.getElementById("submitInitials").style.visibility= "visible";
  document.getElementById("clearHighScores").style.visibility= "visible";
  
}

// function to start quiz.  It resets time and calls functions to change the buttons which are relevant to quiz time
// and renders one round of questions

hideButtons()

function reStartQuiz() {

  stopTimer();
  startQuiz();
}

function startQuiz() {

    round = 0;
    timeLeft = 120;
    totalTime = 120;
    hideButtons();
    showQuizButtons();
    startTimer();
    renderOneRound();

}

// render a single question round and increment round count

function renderOneRound() {

    quest= questArray[round].question;
    answer= questArray[round].answer;
    chA= questArray[round].choices.a;
    chB= questArray[round].choices.b;
    chC= questArray[round].choices.c;
    chD= questArray[round].choices.d;

    document.getElementById("question-display").innerHTML = quest;
    document.getElementById("answerOne").innerHTML = chA;
    document.getElementById("answerTwo").innerHTML = chB;
    document.getElementById("answerThree").innerHTML = chC;
    document.getElementById("answerFour").innerHTML = chD;
    
    round=round+1
    }



// test answer to determine if it is correct.  If incorrect show error message and debit timeLeft & score,
// reset color in time box to white if correct and increase score

function testAnswer(response) {
    
  document.getElementById("scoreDisplay").style.visibility= "visible";

    if ((response === answer)) {

          score=score+10;
          document.getElementById("timerDisplay").setAttribute ("style" ,
                          "margin-left: 235px; background-color: white; width: auto");
          document.getElementById("errorDisplay").style.visibility= "hidden";
          document.getElementById("scoreDisplay").innerHTML = (score);
          document.getElementById("scoreDisplay").style.width= "55px";

          console.log("right answer "+ answer);
          console.log("score "+ score);
          console.log("round "+ round);

          nextRound()
        
        }

      else {
          score = score-5;
          stopTimer();
          totalTime= timeLeft - 20;
          startTimer();

          console.log("wrong answer");
          console.log("round "+ round);
          document.getElementById("timerDisplay").setAttribute ("style" ,
                          "margin-left: 235px; background-color: orangered; color: white; width: auto");
          document.getElementById("errorDisplay").style.visibility= "visible";
          document.getElementById("scoreDisplay").innerHTML = (score);
          document.getElementById("scoreDisplay").style.width= "55px";

          nextRound();

      }
  }


// function to allow user to save quiz scores in local storage.  Appends current saved scores to exisiting saved scores


function saveScore() {

  initials = prompt("enter your initials to save score!");
  savedScores = localStorage.savedScores;
  highScores = savedScores + initials + ":" + score + ", "
  document.getElementById("showHighScores").innerHTML = highScores.slice(0,-2);
  localStorage.savedScores = highScores;

}

// function to allow user to clear saved quiz scores from display and local storage 

function clearScores() {
  localStorage.clear()
  localStorage.savedScores = "High Scores: "
  document.getElementById("showHighScores").innerHTML = "";

}

// function to allow user to start another round of the quiz 

function nextRound() {

  document.getElementById("timerDisplay").setAttribute ("style" ,
  "margin-left: 235px; background-color: white; color: black; width: auto");

    if(timeLeft>0 && (questArray.length > round)) {

      renderOneRound() }

    else { 

      stopTimer()
      alert("Game Over")
      showEndQuizButtons()

      }
    }

// timer block, counts down from variable "totalTime"

function renderTime () {

  if (timeLeft > 1) {

      document.getElementById("timerDisplay").innerHTML = timeLeft + ' seconds left'; }

  else { 
    
    alert("Time up!")
    stopTimer()
    showEndQuizButtons()

  }

}

// function to stop the timer

function stopTimer(){ clearInterval(interval)}

// function to start the timer and call render time each second

function startTimer() {
  
   //   // We only want to start the timer if timeLeft is > 0
  //  while (timeLeft > 0) {
   //     /* The "interval" variable here using "setInterval()" begins the recurring increment of the
      //  secondsElapsed variable which is used to check if the time is up */
      interval = setInterval(function() {
        secondsElapsed++;

        // So renderTime() is called here once every second.

        timeLeft = totalTime - secondsElapsed;
        console.log(timeLeft);

        renderTime()
      }, 1000);
}

// listener for the start quiz button


var startQ = document.getElementById("startBtn");
startQ.addEventListener("click", startQuiz);

// answer button actions

var answer1 = document.getElementById("answerOne");
  answer1.addEventListener("click", function(){response= "a"; testAnswer(response)});

var answer2 = document.getElementById("answerTwo");
  answer2 .addEventListener("click", function(){response= "b"; testAnswer(response)});

var answer3 = document.getElementById("answerThree");
    answer3 .addEventListener("click", function(){response= "c"; testAnswer(response)});

var answer4 = document.getElementById("answerFour");
answer4.addEventListener("click", function(){response= "d"; testAnswer(response)});


// test navigation button actions

var nextQ = document.getElementById("nextQuestion");
  nextQ.addEventListener("click", nextRound);

var restart = document.getElementById("StartOver");
  restart.addEventListener("click", startQuiz);

var submitInitials = document.getElementById("submitInitials");
  submitInitials.addEventListener("click", saveScore);

var clearHighScores = document.getElementById("clearHighScores");
  clearHighScores.addEventListener("click", clearScores);


// setting up questions object 

var questArray = [
  {
     question: "Who is Elmer Fudd?",
      choices: {
        a: "a Hunter",
        b: "a Baker",
        c: "a Boater",
        d: "a Fisherman",
      },
      answer: "a"
    },
  {
      question: "who is Bill Gates?",
      choices: {
        a: "a computer programmer",
        b: "a geek",
        c: "2nd richest man in the world",
        d: "your uncle",
      },

      answer: "c"
    },
  {
      question: "What company does Warren Buffet run?",
      choices: {
        a: "Berkshire Hathaway",
        b: "Monsanto",
        c: "General Electric",
        d: "Google",
      },

      answer: "a"
    },
  {
      question: "Where is Machu Pichu located?",
      choices: {
        a: "Brazil",
        b: "Argentina",
        c: "Minneapolis",
        d: "Puru",
      },
      answer: "d"
    },
    {
      question: "what is javascript?",
      choices: {
        a: "Coffee for writers",
        b: "A programming language",
        c: "A type of font",
        d: "An island of Indonesia",
      },
      answer: "b"
    },
    {
      question: "what is an array?",
      choices: {
        a: "A row of fish",
        b: "A secret weapon",
        c: "A data structure",
        d: "Your uncle named Ray",
      },
      answer: "c"
    },
    {
      question: "what is a local variable?",
      choices: {
        a: "The name of a bar",
        b: "A variable used globally",
        c: "A constant",
        d: "Defined in a function",
      },
      answer: "d"
    },
    {
      question: "what is full-stack engineering?",
      choices: {
        a: "Front-end sw development",
        b: "Back-end sw development",
        c: "end-to-end sw development",
        d: "Pancakes to order",
      },
      answer: "c"
    },
  ];











