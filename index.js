// Function that defines two variables, first card and second card 
const setup = () => {
  // Declare two variables to store the first and second card
  let firstCard = undefined;
  let secondCard = undefined;

  // Add a click event listener to all elements with class "card" that do not have the "matched" class
  $(".card:not(.matched)").on("click", function () {
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

        // Add the "matched" class to the matched cards, so they can no longer be clicked
        $(`#${firstCard.id}`).parent().addClass("matched");
        $(`#${secondCard.id}`).parent().addClass("matched");

        // Reset the first and second card variables
        firstCard = undefined;
        secondCard = undefined;

        // Run the setup function again to re-enable clicks on unmatched cards
        setup();
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

$(document).ready(setup);
