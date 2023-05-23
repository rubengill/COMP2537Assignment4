//Function that defines two variables, first card and second card 
const setup = () => {
  let firstCard = undefined
  let secondCard = undefined
  //Click event listener on all elements of class "card", remember "." notation to select classes 
  $(".card").on(("click"), function () {
    if (firstCard && firstCard.id === $(this).find(".front_face")[0].id) {
      return;
    }
    $(this).toggleClass("flip");
    //Sets firstCard to the first card the user clicks 
    if (!firstCard)
      firstCard = $(this).find(".front_face")[0]
    else {
      //if firstCard is defined, set secondCard to the next card the user clicks. 
      secondCard = $(this).find(".front_face")[0]
      console.log(firstCard, secondCard);
      //If they are the same, log that they match 
      if (firstCard.src == secondCard.src) {
        console.log("match")
        $(`#${firstCard.id}`).parent().off("click")
        $(`#${secondCard.id}`).parent().off("click")
        firstCard = undefined;
        secondCard = undefined;
      } else {
        console.log("no match")
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip")
          $(`#${secondCard.id}`).parent().toggleClass("flip")
          firstCard = undefined;
          secondCard = undefined;
        }, 1000)
      }
    }
  });
}
$(document).ready(setup)