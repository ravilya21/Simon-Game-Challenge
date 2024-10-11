var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColor = "";
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    level++;
    $("h1").text("Level " + level);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio('sounds/' + randomChosenColor + ".mp3");
    audio.play();
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}

function animatePress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function() {
        $("#" + name).removeClass("pressed");
    }, 100);
}

$(document).keydown(function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
