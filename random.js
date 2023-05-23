//Counter to keep track of number of clicks, defined outside of the function so it is not reset with every
// "setup" call
let clickCount = 0;
//Delcare totaPairs to keep track of total pairs in the current game, outside of any function to ensure it is 
//incremented properly 
let totalPairs = 0;
//Variables to keep track of the time elapsed
let timerInterval = null;
let elapsedTime = 0;

//Calculate totalPairs after the DOM has fully loaded to avoid any errors
$(document).ready(function () {
  totalPairs = $(".card").length / 2;
  console.log("Cards: " + totalPairs);
});

//Declare the number of pairs currently matched
let matchedPairs = 0;

// Function that defines two variables, first card and second card 
const setup = () => {
  // Declare two variables to store the first and second card
  let firstCard = undefined;
  let secondCard = undefined;

  // Add a click event listener to all elements with class "card" that do not have the "matched" class
  $(".card:not(.matched)").on("click", function () {
    // If the card is not flipped, increment the click count
    if (!$(this).hasClass("flip")) {
      clickCount++;
      $("#click-counter").text(`Total Clicks: ${clickCount}`);
    }

    // If the first card has been clicked and its id matches the id of the currently clicked card, do nothing
    if (firstCard && firstCard.id === $(this).find(".front_face")[0].id) {
      return;
    }

    // Toggle the "flip" class on the clicked card (this will flip the card)
    $(this).toggleClass("flip");

    // If the first card hasn't been clicked yet, set firstCard to the clicked card
    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    } else {
      // If the first card has been clicked, set secondCard to the clicked card
      secondCard = $(this).find(".front_face")[0];

      // Log the first and second card to the console
      console.log(firstCard, secondCard);

      // Remove the click event handler from all cards when two cards are selected
      $(".card").off("click");

      // If the first card and the second card match
      if (firstCard.src == secondCard.src) {
        // Log "match" to the console
        console.log("match");

        // Increment the matched pairs count
        matchedPairs++;

        // Display matched pairs and remaining pairs
        $("#matched-pairs").text(`Matched Pairs: ${matchedPairs}`);
        $("#remaining-pairs").text(`Remaining Pairs: ${totalPairs - matchedPairs}`);

        // Add the "matched" class to the matched cards, so they can no longer be clicked
        $(`#${firstCard.id}`).parent().addClass("matched");
        $(`#${secondCard.id}`).parent().addClass("matched");

        // After a delay of 1 second, check if all cards are matched, and if so, display the "You won" message
        setTimeout(() => {
          if ($(".card.matched").length === $(".card").length) {
            alert("You're a champion!");
          }

          // Reset the first and second card variables
          firstCard = undefined;
          secondCard = undefined;

          // Run the setup function again to re-enable clicks on unmatched cards
          setup();
        }, 1000);
      } else {
        // If the cards do not match, log "no match" to the console
        console.log("no match");

        // After a delay of 1 second, flip the cards back and reset the first and second card variables
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip");
          $(`#${secondCard.id}`).parent().toggleClass("flip");

          // Reset the first and second card variables
          firstCard = undefined;
          secondCard = undefined;

          // Run the setup function again to re-enable clicks on all cards
          setup();
        }, 1000);
      }
    }
  });
}


//Function that starts the timer
function startTimer() {
  timerInterval = setInterval(function () {
    elapsedTime++;
    $("#timer").text(elapsedTime);
  }, 1000);
}

//Function that resets the timer 
function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  $("#timer").text(elapsedTime);
}


$("#start-button").on("click", function () {
  // Hide start button and show game container
  $("#start-button").hide();
  $("#game-container").show();

  // Start the game
  setup();

  // Start the timer
  startTimer();
});

$("#reset-button").on("click", function () {
  // Reset the game
  $(".card").removeClass("flip matched");
  firstCard = undefined;
  secondCard = undefined;
  matchedPairs = 0;
  clickCount = 0;
  $("#click-counter").text(`Total Clicks: ${clickCount}`);
  $("#matched-pairs").text(`Matched Pairs: ${matchedPairs}`);
  $("#remaining-pairs").text(`Remaining Pairs: ${totalPairs - matchedPairs}`);

  // Reset the timer
  resetTimer();

  // Restart the game
  setup();
});


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assignment #4</title>

  <!-- Bootstrap CSS -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">

  <link rel="stylesheet" href="style.css">
  <!-- import jQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  
  <!-- Bootstrap -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"></script>
  
  <script src="index.js"></script>
</head>

<body>
  <button id="start-button" class="btn btn-success">Start</button>
  <div id="game-container" style="display: none;">
    <h1 id="timer">0</h1>
    <button id="reset-button">Reset</button>
    <div id="counter">
      <h1 id="click-counter" class="btn btn-danger">Total Clicks: 0</h1>
    </div>

    <div id="counter">
      <h1 id="matched-pairs">Matched Pairs: 0</h1>
    </div>

    <div id="counter">
      <h1 id="remaining-pairs">Remaining Pairs: 0</h1>
    </div>

    <div id="game_grid">
      <div class="card">
        <img id="img1" class="front_face" src="001.png" alt="">
        <img class="back_face" src="back.webp" alt="">
      </div>
      <div class="card">
        <img id="img2" class="front_face" src="002.png" alt="">
        <img class="back_face" src="back.webp" alt="">
      </div>
      <div class="card">
        <img id="img3" class="front_face" src="003.png" alt="">
        <img class="back_face" src="back.webp" alt="">
      </div>
      <div class="card">
        <img id="img4" class="front_face" src="001.png" alt="">
        <img class="back_face" src="back.webp" alt="">
      </div>
      <div class="card">
        <img id="img5" class="front_face" src="002.png" alt="">
        <img class="back_face" src="back.webp" alt="">
      </div>
      <div class="card">
        <img id="img6" class="front_face" src="003.png" alt="">
        <img class="back_face" src="back.webp" alt="">
      </div>
    </div>
</body><!-- Rest of your game HTML goes here -->
</div>



</html>