document.addEventListener("DOMContentLoaded", () => {
  let turn = false;
  let boxes = document.querySelectorAll(".box");
  let reset = document.querySelector(".reset");
  let gameOver = false;

  function handleClick(event) {
    let box = event.target;

    if (gameOver || box.textContent !== "") return;

    if (turn) {
      box.textContent = "O";
    } else {
      box.textContent = "X";
    }
    turn = !turn;
    checkWin();
  }

  boxes.forEach((box) => {
    box.addEventListener("click", handleClick);
  });

  reset.addEventListener("click", () => {
    boxes.forEach((box) => {
      box.textContent = "";
    });
    turn = false;
    gameOver = false;
    reset.textContent = "Reset";
  });

  function checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;

      if (
        boxes[a].textContent !== "" &&
        boxes[a].textContent === boxes[b].textContent &&
        boxes[a].textContent === boxes[c].textContent
      ) {
        setTimeout(() => {
          showPopup(`${boxes[a].textContent} wins!`);
          reset.textContent = "Play Again";
        }, 100);
        gameOver = true;
        return;
      }
    }

    
    if ([...boxes].every(box => box.textContent !== "")) {
      setTimeout(() => {
        showPopup("It's a draw!");
        reset.textContent = "Play Again"; 
      }, 100);
      gameOver = true;
    }
  }
});
function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  const popupClose = document.getElementById("popup-close");

 
  popupMessage.textContent = message;

  
  popup.classList.remove("hidden");

  
  popupClose.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
}

//GSAP CODE

