const c = document.querySelector(".carGame");
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const o = document.querySelector(".oneMore");
console.log(o, c, score, startScreen, gameArea);
// console.log(score,startScreen,gameArea);
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  // console.log(e.key)
  keys[e.key] = true;
  // console.log(keys)
}
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  // console.log(e.key)
  // console.log(keys)
}
function collision(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
  // audio.stop();
}
function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

// function endGame(){
//     player.start = false;
// }
function end() {
  // ausio.stop();
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "Game Over <br> Your final Score is" +
    player.score +
    "<br> Press here to restart the Game";

  // Game Over <br> Your final Score is " + player.score + "<br> Press here to restart the Game"
}
function moveEnemy(car) {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function (item) {
    if (collision(car, item)) {
      console.log("Boom");
      end();
    }
    if (item.y >= 700) {
      item.y = -50;
      item.style.left = Math.floor(Math.random() * 150) + "px";
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

startScreen.addEventListener("click", Start);

let player = { speed: 3, score: 0 };

function gamePlay() {
  // console.log("am clicked");
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  // console.log(road);

  if (player.start) {
    moveLines();
    moveEnemy(car);
    if (keys.ArrowUp && player.y > road.top + 30) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 35) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 18) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    console.log(player.score++);
    //                 var audio = new Audio('audio.mp3');
    //   audio.play();
    //                 function play() {
    //   var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
    //   audio.play();
    // }

    player.score++;
    let ps = player.score - 1;
    score.innerHTML = "Score:" + ps;
  }
}
function Start() {
  // gameArea.classList.remove('hide');
  console.log(gameArea);
  startScreen.classList.add("hide");
  gameArea.innerHTML = " ";

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);
  for (x = 0; x < 5; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 150;
    roadLine.style.top = x * 100 + "px";
    // roadLine.style.bottom = (x * 150) + "px";
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  // car.innerHTML = "hey am car";
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  // console.log("top" + car.offsetTop);
  // console.log("left" + car.offsetLeft);

  for (x = 0; x < 15; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (x + 1) * 350 * -1;
    enemyCar.style.top = enemyCar + "px";
    // roadLine.style.bottom = (x * 150) + "px";
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = Math.floor(Math.random() * 150) + "px";
    gameArea.appendChild(enemyCar);
  }
}
function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
}

// var x = document.createElement('audio');
//         x.setAttribute('src', 'images/sound.mp3');
//         x.setAttribute('class', 'sound');
//         let y = document.getElementsByClassName('.sound')
//         // audio.loop = true;
//        x.play();
