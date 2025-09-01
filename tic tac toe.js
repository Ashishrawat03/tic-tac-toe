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
document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".heading h1", { 
      duration: 1, 
      y: -50, 
      opacity: 0, 
      ease: "bounce.out" 
  });

  gsap.from(".box", { 
      duration: 0.8, 
      scale: 0, 
      opacity: 0, 
      stagger: 0.1, 
      ease: "back.out(1.7)"
  });

  gsap.from(".reset", { 
      duration: 1, 
      y: 50, 
      opacity: 0, 
      ease: "power2.out"
  });

  document.querySelectorAll(".box").forEach(box => {
      box.addEventListener("mouseenter", () => {
          gsap.to(box, { scale: 1.1, duration: 0.2, ease: "power1.out" });
      });
      box.addEventListener("mouseleave", () => {
          gsap.to(box, { scale: 1, duration: 0.2, ease: "power1.in" });
      });
  });
});
