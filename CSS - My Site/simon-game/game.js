const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

const playSound = function (name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const animatePress = function (currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout((_) => $(`#${currentColour}`).removeClass("pressed"), 100);
  $(`#${currentColour}`).fadeOut(100).fadeIn(100);
};

const nextSequence = function () {
  level++;
  $("h1").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  gamePattern.push(randomChosenColour);
};

const restartGame = function () {
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  $("h1").text("Press A Key to Start");
};

const checkAnswer = function (currentLevel) {
  userClickedPattern.forEach(function (clicked, index) {
    if (gamePattern[index] !== clicked) {
      playSound("wrong");
      restartGame();
      return;
    }
  });

  if (userClickedPattern.length === currentLevel) {
    setTimeout(nextSequence, 1000);
    userClickedPattern = [];
  }
};

$(".btn").click(function (e) {
  if (!gameStarted) return;
  userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(e.target.id);
  animatePress(e.target.id);

  checkAnswer(level);
});

$(document).keydown((_) => {
  if (!gameStarted) {
    $("h1").text("Level 0");
    gameStarted = true;
    nextSequence();
  }
});
