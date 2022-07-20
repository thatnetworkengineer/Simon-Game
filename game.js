// Holds a list of the colors for the game
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

// contains the buttons pressed by the user
var userClickedPattern = [];

// Did the game start?
var started = false;

// This is ther level counter
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});


// detect when button is pressed
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  // add the user pressed button to the array
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Check the user answer vs. the game's pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// This function will generate the pattern for the game
function nextSequence() {
  // reset the array after every level
  userClickedPattern = [];
  // change the level
  level++;
  $("#level-title").text("level " + level);
  // Generates the next color in the pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // Make chosen color blink
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play a sound corresponding to the color
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
