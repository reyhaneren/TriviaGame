var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Bangkok is the capital of which country?", "Algiers is the capital of which country?", "Seoul is the capital of which country?", "Berlin is the capital of which country?", "Buenos Aires is the capital of which country?", "Ankara is the capital of which country?", "Vienna is the capital of which country?", "Rome is the capital of which country?"];
var answerArray = [
    ["Thailand", "India", "Argentina", "United Kingdom"],
    ["Italy", "Algeria", "Netherlands", "Turkey"],
    ["Japan", "China", "South Korea", "Pakistan"],
    ["Sweden", "Russia", "Germany", "India"],
    ["Brazil", "Phillippines", "Canada", "Argentina"],
    ["Turkey", "Japan", "Belgium", "Spain"],
    ["United Kingdom", "Austria", "Thailand", "Belgium"],
    ["Czech Republic", "China", "Cuba", "Italy"]
];
var correctAnswers = ["A. Thailand", "B. Algeria", "C. South Korea", "C. Germany", "D. Argentina", "A. Turkey", "B. Austria", "D. Italy"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

$(document).ready(function() {

    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Game</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();

    $("body").on("click", ".start-button", function(event) {
        event.preventDefault();
        generateHTML();

        timerWrapper();

    });

    $("body").on("click", ".answer", function(event) {

        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {


            clearInterval(theClock);
            generateWin();
        } else {

            clearInterval(theClock);
            generateLoss();
        }
    });

    $("body").on("click", ".reset-button", function(event) {
        resetGame();
    });

});

function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainArea").html(gameHTML);
}

function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
    } else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);

    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Game!</a></p>";
    $(".mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateHTML();
    timerWrapper();
}
