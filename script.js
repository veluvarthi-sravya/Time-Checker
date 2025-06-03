
let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");
let incMinBtn = document.getElementById("incMin");
let decMinBtn = document.getElementById("decMin");
let incSecBtn = document.getElementById("incSec");
let decSecBtn = document.getElementById("decSec");

let duration = 5 * 60; // 5 minutes in seconds
let timeLeft = duration;
let timerId;
let isRunning = false;
let isPaused = false;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function setButtons(state) {

  startBtn.style.display = state === 'initial' ? 'inline-block' : 'none';
  pauseBtn.style.display = (state === 'running' || state === 'paused') ? 'inline-block' : 'none'; // <-- updated
  resetBtn.style.display = state !== 'initial' ? 'inline-block' : 'none';
  
  pauseBtn.textContent = state === 'paused' ? 'Resume' : 'Pause';

  let disabled = state !== 'initial';
  incMinBtn.disabled = disabled;
  decMinBtn.disabled = disabled;
  incSecBtn.disabled = disabled;
  decSecBtn.disabled = disabled;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  isPaused = false;
  setButtons('running');
  timerId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerId);
      isRunning = false;
      setButtons('initial');
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timerId);
  isRunning = false;
  isPaused = true;
  setButtons('paused');
}

function resumeTimer() {
  if (isRunning || !isPaused) return;
  isRunning = true;
  isPaused = false;
  setButtons('running');
  timerId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerId);
      isRunning = false;
      setButtons('initial');
      alert("Time's up!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerId);
  timeLeft = duration;
  updateDisplay();
  isRunning = false;
  isPaused = false;
  setButtons('initial');
}

function setDurationFromTimeLeft() {
  duration = timeLeft;
}

function incrementMinutes() {
  if (isRunning) return;
  let minutes = Math.floor(timeLeft / 60);
  if (minutes < 99) timeLeft += 60;
  setDurationFromTimeLeft();
  updateDisplay();
}
function decrementMinutes() {
  if (isRunning) return;
  let minutes = Math.floor(timeLeft / 60);
  if (minutes > 0) timeLeft -= 60;
  if (timeLeft < 0) timeLeft = 0;
  setDurationFromTimeLeft();
  updateDisplay();
}
function incrementSeconds() {
  if (isRunning) return;
  let seconds = timeLeft % 60;
  if (seconds < 59) timeLeft += 1;
  else timeLeft += (60 - seconds);
  setDurationFromTimeLeft();
  updateDisplay();
}
function decrementSeconds() {
  if (isRunning) return;
  let seconds = timeLeft % 60;
  if (timeLeft > 0) {
    if (seconds > 0) timeLeft -= 1;
    else timeLeft -= 60;
    if (timeLeft < 0) timeLeft = 0;
  }
  setDurationFromTimeLeft();
  updateDisplay();
}

// Button event listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", function() {
  if (isPaused) {
    resumeTimer();
  } else {
    pauseTimer();
  }
});

resetBtn.addEventListener("click", resetTimer);

incMinBtn.addEventListener("click", incrementMinutes);
decMinBtn.addEventListener("click", decrementMinutes);
incSecBtn.addEventListener("click", incrementSeconds);
decSecBtn.addEventListener("click", decrementSeconds);

setButtons('initial');
updateDisplay();