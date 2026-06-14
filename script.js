const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;



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
  "The heart was RIGHT THEREEEEE",
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

function attempt() {


  if (!running) return;

  const targetLeft = parseFloat(target.style.left);
  const targetRight = targetLeft + targetWidth;
  const center = markerX;
  const exactMiddle = targetLeft + targetWidth / 2;
  const distance = Math.abs(center - exactMiddle);

  if (center >= targetLeft && center <= targetRight) {
    const perfect = distance < targetWidth * 0.2;
    blowCandles(1);
    statusEl.textContent = perfect ? "Perfect blow! One candle went poof 💨" : "Nice! One candle went out!!!";    round++;
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
  statusEl.textContent =
    missMessages[Math.floor(Math.random() * missMessages.length)];
}
  if (blown >= candleCount) {
  running = false;

  gameScreen.style.display = "none";
  final.classList.remove("hidden");

  return;
}
}

function reset() {
  gameScreen.style.display = "";

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
