
//board voor snake
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake hoofd
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//appeltjes
var foodX;
var foodY;


//game over regels
var gameOver = false; 

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); 

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10); //update elke 100 ms
}

var foodImages = ['foodPeach.png', 'foodBanana.png', 'foodApple.png', 'foodCherries.png'];

// Variabele om bij te houden welke afbeelding actief is
var activeFoodImage;

function update() {
  if (gameOver) {
    return;
  }

  // Nieuwe achtergrondafbeelding
  var backgroundImage = new Image();
  backgroundImage.src = "backgroundGrass.jpg";

  // Wacht tot de afbeelding is geladen
  backgroundImage.onload = function () {
    // Functie om de achtergrond te tekenen
    function drawBackground() {
      // Teken de nieuwe achtergrondafbeelding
      context.drawImage(backgroundImage, 0, 0, board.width, board.height);

      // Teken de borders
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.strokeRect(0, 0, board.width, board.height);
    }

    // Roep de functie aan om de achtergrond te tekenen
    drawBackground();

    // Roep de functie aan om de speler en het voedsel te tekenen
    drawPlayerAndFood();
  };

  // Functie om de speler en het voedsel te tekenen
  function drawPlayerAndFood() {
    context.fillStyle = "black";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Controleer of de slang de randen van het bord raakt
    if (snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.height) {
      gameOver = true;
      alert("Game Over");
      return;
    }

    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
      context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    } // Teken nieuwe snake body bij elke appel gegeten

    // "Game over" voorwaarden
    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
        gameOver = true;
        alert("Game Over");
        return;
      }
    }

    // Kies een willekeurige afbeelding voor het voedsel als deze nog niet is ingesteld
    if (!activeFoodImage) {
      activeFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];
    }

    // Maak een nieuw Image-object voor het voedsel
    var foodImage = new Image();
    foodImage.src = activeFoodImage;

    // Teken het voedsel als een afbeelding
    context.drawImage(foodImage, foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
      snakeBody.push([foodX, foodY]);
      placeFood();

      // Kies een nieuwe willekeurige afbeelding voor het voedsel
      activeFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
      snakeBody[0] = [snakeX, snakeY];
    }
  }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } //function om snake beweging functioneel te maken
}