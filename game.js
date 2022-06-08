var buttonColours = ["red", "blue", "green", "yellow"]; //Button Colour array

var gamePattern = []; //Empty array to store sequence
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
    //variable to store id of button that got clicked
    var userChosenColour = $(this).attr("id");
    //add id contents of the clicked btn to userClickedPattern array
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    //console.log(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    userClickedPattern = [];
    level++;

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4); //random number 1 - 3

    var randomChosenColour = buttonColours[randomNumber]; //select a button colour with the random number generator
    gamePattern.push(randomChosenColour); //store the random colour to the gamePattern array

    $("#" + randomChosenColour).delay(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //get id of button and flash

    playSound(randomChosenColour);


}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong");
        var wrongAnswer = new Audio("sounds/wrong.mp3")

        wrongAnswer.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
