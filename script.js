// Settings
const REDIRECT_URL = "gift-details.html";
const TOTAL_TIME = 10;
let timeLeft = TOTAL_TIME;
let isPaused = false;

// 1. Dynamic Greeting based on URL (?name=FamilyMember)
const params = new URLSearchParams(window.location.search);
const userName = params.get('name');
if (userName) {
    document.getElementById('greeting').textContent = `Something Special for ${userName}`;
}

// 2. High-End Confetti Fanfare
const fireFanfare = () => {
    const defaults = { spread: 360, ticks: 100, gravity: 0.5, decay: 0.94, startVelocity: 30, colors: ['#c5a059', '#2c3e50', '#ffffff'] };
    confetti({ ...defaults, particleCount: 40, scalar: 1.2 });
    confetti({ ...defaults, particleCount: 25, scalar: 0.75 });
};

// 3. Timer & Progress Bar Logic
const progressBar = document.getElementById('progress-bar');
const countdownEl = document.getElementById('countdown');

const timer = setInterval(() => {
    if (!isPaused) {
        timeLeft--;
        countdownEl.textContent = timeLeft;
        
        // Update Progress Bar width
        const percentage = (timeLeft / TOTAL_TIME) * 100;
        progressBar.style.width = `${percentage}%`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            window.location.href = REDIRECT_URL;
        }
    }
}, 1000);

// 4. Interactive Elements
document.getElementById('redirect-now').addEventListener('click', () => {
    window.location.href = REDIRECT_URL;
});

document.getElementById('stop-timer').addEventListener('click', () => {
    isPaused = true;
    fireFanfare(); // Reward them for staying!
    document.querySelector('.timer-text').textContent = "Timer paused. Take your time.";
    progressBar.style.background = "#4caf50"; // Turn bar green when paused
});

// Run fanfare on entry
window.onload = fireFanfare;
