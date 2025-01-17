var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;



$(document).on('keypress', function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }

});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        playSound("wrong")

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");;
        }, 200);

        console.log("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }
}
function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level++;
    $("#level-title").text("Level " + level)


}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}