let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function startStopwatch() {
    if (!timerInterval) {
        if (!startTime) {
            startTime = Date.now();
        } else {
            startTime = Date.now() - elapsedTime;
        }
        timerInterval = setInterval(updateStopwatch, 10);
    }
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    startTime = null; // Reset the startTime variable
    laps = [];
    updateStopwatch();
    document.getElementById("lap-times").innerHTML = "";
    document.getElementById("stopwatch").textContent = "00:00:00.00"; // Reset displayed time
}

function updateStopwatch() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("stopwatch").textContent = formattedTime;
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}.${padTime(millisecondsFormatted)}`;
}

function padTime(value) {
    return value < 10 ? "0" + value : value;
}

function recordLap() {
    if (timerInterval) {
        laps.push(elapsedTime);
        const lapIndex = laps.length;
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement("div");
        lapElement.textContent = `Lap ${lapIndex}: ${lapTime}`;
        document.getElementById("lap-times").appendChild(lapElement);
    }
}
