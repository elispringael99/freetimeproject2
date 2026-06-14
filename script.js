const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;

const heartbeatSound = document.getElementById("heartbeatSound");
const giraffeWarning = document.getElementById("giraffeWarning");
const candleCount = 6;
const candlesEl = document.getElementById("candles");
const marker = document.getElementById("marker");
const target = document.getElementById("target");
const bar = document.getElementById("bar");
const statusEl = document.getElementById("status");
const roundEl = document.getElementById("round");
const leftEl = document.getElementById("left");
const button = document.getElementById("tryButton");
const final = document.getElementById("final");
const restart = document.getElementById("restart");
const gameScreen = document.getElementById("gameScreen");

const lionMusic = document.getElementById("lionMusic");
const warningText = document.querySelector(".warning-text");

const openLetter = document.getElementById("openLetter");
const birthdayLetter = document.getElementById("birthdayLetter");

const finalPresses = document.getElementById("finalPresses");
const finalMisses = document.getElementById("finalMisses");
const finalGiraffes =
  document.getElementById("finalGiraffes");

const missMessages = [
  "SO SLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOW 🐌",
  "MEMORY YES, BUT SPACE BAR SKILLS NON EXISTENTT",
  "WE DON'T HAVE ALL DAYYYYYYYYY 😭",
  "Almost! Still too slow tho tss tsss 😌",
  "You know you gotta hit when it's on the bar right 🤨",
  "The candles are retiring before you blow them out 👵",
  "At this rate it'll be your NEXT birthday 🎂",
  "Sharmeen please focus 😭",
  "The heart literally waited for you and then left 💔",
  "Bro is reacting on Internet Explorer 🖥️",
  "That red zone came and went like a shooting star ☄️",
  "The candles are laughing at you rn 😂",
  "I've seen turtles react faster 🐢",
  "Wake up wake up wake up ⏰",
  "The cake is getting impatient 🎂",
  "Are we blowing candles out or writing a book 🤓",
  "Not even close 😭",
  "Girl what was THAT 😭",
  "That was a warning shot 💀",
  "The candles survived another round 🕯️",
  "We're gonna be here forever at this rate 😂",
  "IT WAS RIGHT THEREEEEE",
  "Blink twice if you need help 👀",
  "I believe in you. The candles don't 💅",
  "Skill issue 🤏"
];

let round = 1;
let blown = 0;
let speed = 0.45;
let direction = 1;
let markerX = 0;
let lastTime = performance.now();
let running = true;
let targetWidth = 82;
let spacePresses = 0;
let misses = 0;
let giraffeChaosAmount = 120;


function makeCandles() {
  candlesEl.innerHTML = "";
  for (let i = 0; i < candleCount; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.innerHTML = '<div class="flame"></div>';
    candlesEl.appendChild(candle);
  }
}

function placeTarget() {
  const barWidth = bar.clientWidth;
  targetWidth = Math.max(40, 100 / Math.pow(1.35, round - 1));
  const maxLeft = barWidth - targetWidth;
  const left = Math.random() * maxLeft;
  target.style.width = `${targetWidth}px`;
  target.style.left = `${left}px`;
}

function draw(now) {
  if (!running) return;
  const delta = now - lastTime;
  lastTime = now;
  const barWidth = bar.clientWidth;
  markerX += direction * speed * delta;
  if (markerX >= barWidth) { markerX = barWidth; direction = -1; }
  if (markerX <= 0) { markerX = 0; direction = 1; }
  marker.style.left = `${markerX}px`;
  requestAnimationFrame(draw);
}

function blowCandles(amount) {
  const candles = [...document.querySelectorAll(".candle:not(.out)")];
  candles.slice(0, amount).forEach(c => c.classList.add("out"));
  blown += amount;
  leftEl.textContent = Math.max(0, candleCount - blown);
}

const perfectMessages = [
  "PERFECT. Damn did NOT expect that",
  "That was actually clean??? HOW IS THIS POSSIBLE 🦒",
  "Suuuuuuuuuuuure. That one was impressive.",
  "Have mercy on the candles please 💨",
  "How am i supposed to bully you if you do it perfectly :(",
  "Okay okay, fine you win"
];


const normalHitMessages = [
  "Wow okay okay",
  "A candle has fallen. Took you some time hue",
  "Progress. Slow progress, but progress.",
  "One candle down, several emotional damages to go.",
  "Dont have all day!!!!",
  "You know giraffes only have an age limit of 30 right?"
];


const lateGameMessages = [
  "Almost there, ALMOST",
  "Final candles. Pressure is ON.",
  "This is where legends are made, not your tho because you will fail it!",
  "Please don't miss now, this is dramatic.",
  "The birthday depends on this!!"
];

function attempt() {


  if (!running) return;

  spacePresses++;

  const targetLeft = parseFloat(target.style.left);
  const targetRight = targetLeft + targetWidth;
  const center = markerX;
  const exactMiddle = targetLeft + targetWidth / 2;
  const distance = Math.abs(center - exactMiddle);
  const accuracy = 1 - (distance / (targetWidth / 2));

  if (center >= targetLeft && center <= targetRight) {
    const perfect = distance < targetWidth * 0.2;
    const giraffesEarned =
    Math.round(120 + accuracy * (2000 - 120));

  giraffeChaosAmount += giraffesEarned;
    blowCandles(1);
  if (candleCount - blown <= 2) {
    statusEl.textContent = randomMessage(lateGameMessages);
  } else {
    statusEl.textContent = perfect
      ? randomMessage(perfectMessages)
      : randomMessage(normalHitMessages);
  } 
  round++;   
  roundEl.textContent = round;
    if (round < 4) {
      speed *= 1.4;
    } else {
      speed *= 1.15;
    }
    markerX = 0;
    direction = 1;
    placeTarget();
  } else {
    misses++;
  statusEl.textContent =
    missMessages[Math.floor(Math.random() * missMessages.length)];
}
if (blown >= candleCount) {
  running = false;

  bgMusic.pause();
  bgMusic.currentTime = 0;

  giraffeWarning.classList.remove("hidden");
warningText.innerHTML = "WAIT...";

setTimeout(() => {
  heartbeatSound.volume = 0.6;
  heartbeatSound.play();
}, 1200);

setTimeout(() => {
  warningText.innerHTML =
    "WAIT...<br><br>did you hear that?";
}, 3500);

setTimeout(() => {
  warningText.innerHTML =
    "WAIT...<br><br>something feels wrong...";
}, 5500);

setTimeout(() => {
  warningText.innerHTML =
    "WAIT...<br><br>why is the heartbeat getting louder...";
}, 8000);

setTimeout(() => {
  warningText.innerHTML =
    "OH NO...";
}, 10500);

setTimeout(() => {
  document.body.classList.add("screen-shake");

  warningText.innerHTML =
    "🦒<br><br>WHAT HAVE YOU DONE?!?!";
}, 12500);

setTimeout(() => {
  giraffeExplosion();
}, 13200);

setTimeout(() => {
  heartbeatSound.pause();
  heartbeatSound.currentTime = 0;

  lionMusic.volume = 0.25;
  lionMusic.play();

  giraffeWarning.classList.add("hidden");
  document.body.classList.remove("screen-shake");

  finalGiraffes.textContent =
    giraffeChaosAmount.toLocaleString();

  finalPresses.textContent = spacePresses;
  finalMisses.textContent = misses;
  finalGiraffes.textContent = giraffeChaosAmount.toLocaleString();

  gameScreen.style.display = "none";
  final.classList.remove("hidden");
}, 15000);
  return;
}
}

function reset() {
  gameScreen.style.display = "";
  giraffeChaosAmount = 120;
  round = 1;
  blown = 0;
  speed = 0.45;
  direction = 1;
  markerX = 0;
  lastTime = performance.now();
  running = true;
  final.classList.add("hidden");
  statusEl.textContent = "Ready? Find the red moment.";
  roundEl.textContent = round;
  leftEl.textContent = candleCount;
  makeCandles();
  placeTarget();
  requestAnimationFrame(draw);
  giraffeWarning.classList.add("hidden");
document.body.classList.remove("screen-shake");
musicStarted = false;
heartbeatSound.pause();
heartbeatSound.currentTime = 0;
lionMusic.pause();
lionMusic.currentTime = 0;
spacePresses = 0;
misses = 0;

birthdayLetter.classList.add("hidden");
openLetter.style.display = "";


}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();

    if (!musicStarted) {
      bgMusic.volume = 0.25;
      bgMusic.play().catch((error) => {
      console.log("Music failed:", error);
    });
      musicStarted = true;
    }

    attempt();
  }
});
button.addEventListener("click", () => {
  if (!musicStarted) {
    bgMusic.volume = 0.25;
    bgMusic.play().catch((error) => {
      console.log("Music failed:", error);
    });
    musicStarted = true;
  }

  attempt();
});
restart.addEventListener("click", reset);
window.addEventListener("resize", placeTarget);

reset();

function giraffeExplosion() {
  const visibleGiraffes = Math.min(giraffeChaosAmount, 250);

  for (let i = 0; i < visibleGiraffes; i++) {
    const giraffe = document.createElement("div");
    giraffe.className = "flying-giraffe";
    giraffe.textContent = "🦒";

    giraffe.style.left = Math.random() * 100 + "vw";
    giraffe.style.top = Math.random() * 100 + "vh";

    giraffe.style.setProperty("--x", (Math.random() - 0.5) * 900 + "px");
    giraffe.style.setProperty("--y", (Math.random() - 0.5) * 900 + "px");
    giraffe.style.setProperty("--r", Math.random() * 720 + "deg");

    document.body.appendChild(giraffe);

    setTimeout(() => {
      giraffe.remove();
    }, 2200);
  }
}

openLetter.addEventListener("click", () => {
  birthdayLetter.classList.remove("hidden");
  openLetter.style.display = "none";
});

function randomMessage(list) {
  return list[Math.floor(Math.random() * list.length)];
}
