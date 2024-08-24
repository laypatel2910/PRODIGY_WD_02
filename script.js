let startTime, updatedTime, difference;
let interval;
let isRunning = false;
let lapNumber = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);
        isRunning = true;
        toggleButtons();
    }
}

function pause() {
    if (isRunning) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
        toggleButtons();
    }
}

function reset() {
    clearInterval(interval);
    difference = 0;
    isRunning = false;
    lapNumber = 0;
    display.textContent = "00:00:00";
    lapsList.innerHTML = '';
    toggleButtons();
}

function recordLap() {
    if (isRunning) {
        lapNumber++;
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function toggleButtons() {
    startBtn.disabled = isRunning;
    pauseBtn.disabled = !isRunning;
    resetBtn.disabled = isRunning;
    lapBtn.disabled = !isRunning;
}
