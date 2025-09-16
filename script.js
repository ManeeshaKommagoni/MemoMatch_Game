let container = document.getElementById("cards-container");
let messageDiv = document.getElementById("message"); // 🎯 new message area

// Create 64 cards
for (let i = 0; i < 64; i++) {
  let card = document.createElement("div"); 
  card.className = "card";
  card.id = i;
  container.appendChild(card); 
}

let symbols = [
  '🍎','🍌','🍇','🍒','🍉','🥝','🍍','🍑',
  '🥑','🥕','🥦','🌽','🍆','🍓','🍋','🍐',
  '🐶','🐱','🦊','🐻','🐼','🐸','🐵','🦁',
  '⚽','🏀','🏈','🎾','🎲','🎯','🎹','🎨',
  '🍎','🍌','🍇','🍒','🍉','🥝','🍍','🍑',
  '🥑','🥕','🥦','🌽','🍆','🍓','🍋','🍐',
  '🐶','🐱','🦊','🐻','🐼','🐸','🐵','🦁',
  '⚽','🏀','🏈','🎾','🎲','🎯','🎹','🎨'
];

// Shuffle
symbols = symbols.sort(() => Math.random() - 0.5);

// Assign but hide
for (let i = 0; i < 64; i++) {
  let x = document.getElementById(i);
  x.dataset.symbol = symbols[i];
  x.innerText = "";
}

// Game state
let c = 0, cnt = 62;
let val1, val2, c1, c2;

// Timer setup
let timeDiv = document.getElementById("time");
let seconds = 0;
let timer = null;
function startTimer() {
  if (timer) return; // already running
  timer = setInterval(() => {
    seconds++;
    let min = String(Math.floor(seconds / 60)).padStart(2, "0");
    let sec = String(seconds % 60).padStart(2, "0");
    timeDiv.innerText = `${min}:${sec}`;
  }, 1000);
}

// Click logic
for (let i = 0; i < 64; i++) {
  let x = document.getElementById(i);

  x.addEventListener("click", function () {
    if (x.innerText !== "") return; // already revealed

    startTimer(); // start on first flip

    if (c === 0) {
      c = 1;
      val1 = x.dataset.symbol;
      x.innerText = x.dataset.symbol;
      x.style.backgroundColor = "#fddb6cff";
      c1 = x;
    } else if (c === 1) {
      val2 = x.dataset.symbol;
      x.innerText = x.dataset.symbol;
      x.style.backgroundColor = "#fddb6cff";
      c2 = x;

      if (val1 === val2) {
        // Match
        c1.style.backgroundColor = "#EBEBEB";
        c2.style.backgroundColor = "#EBEBEB";
        cnt += 2;
      } else {
        // No match → flip back
        setTimeout(() => {
          c1.innerText = "";
          c2.innerText = "";
          c1.style.backgroundColor = "#FAA533";
          c2.style.backgroundColor = "#FAA533";
        }, 500);
      }

      // Reset click state
      c = 0;

      // Win check
     // Win check
// Win check
if (cnt === 64) {
  clearInterval(timer);
  setTimeout(() => {
    container.innerHTML = ""; // clear the grid

    // Create win message
    let winMsg = document.createElement("div");
    winMsg.innerText = `🎉 You won in ${timeDiv.innerText}!`;
    winMsg.style.fontSize = "2rem";
    winMsg.style.color = "green";
    winMsg.style.textAlign = "center";
    winMsg.style.gridColumn = "1 / -1"; // span full grid
    winMsg.style.marginBottom = "20px";

    // Create restart button
    let restartBtn = document.createElement("button");
    restartBtn.innerText = "🔄 Restart Game";
    restartBtn.style.padding = "10px 20px";
    restartBtn.style.fontSize = "1.2rem";
    restartBtn.style.borderRadius = "8px";
    restartBtn.style.border = "none";
    restartBtn.style.backgroundColor = "#EF7722";
    restartBtn.style.color = "white";
    restartBtn.style.cursor = "pointer";
    restartBtn.style.marginTop = "20px";

    // Restart on click
    restartBtn.addEventListener("click", () => location.reload());

    // Place message + button in container
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.innerHTML = ""; // clear cards
    container.appendChild(winMsg);
    container.appendChild(restartBtn);
  }, 300);
}

    }
  });
}
