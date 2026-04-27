// Settingsj
const REDIRECT_URL = "gift-details.html";
const TOTAL_TIME = 10;
let timeLeft = TOTAL_TIME;
let isPaused = false;

// 1. Personalized Greeting Logic
const params = new URLSearchParams(window.location.search);
const userName = params.get('name');   // e.g., ?name=Mom
const eventName = params.get('event'); // e.g., &event=Mother's Day

if (userName) {
    document.getElementById('greeting').textContent = `Hi ${userName},`;
}
if (eventName) {
    document.getElementById('event-title').textContent = `HAPPY ${eventName.toUpperCase()}`;
}

// 2. High-Intensity Multi-Color Confetti
const fireFanfare = () => {
    // A wider, more vibrant palette
    const vibrantColors = ['#ff718d', '#fdff6a', '#7afcff', '#ff9de2', '#c5a059', '#2c3e50', '#ffffff', '#4caf50'];

    // Function to fire a single burst
    const shoot = (angle, originX) => {
        confetti({
            particleCount: 80, // Increased count for "more" confetti
            angle: angle,
            spread: 70,
            origin: { x: originX, y: 0.6 },
            colors: vibrantColors,
            ticks: 200,
            gravity: 0.8,
            scalar: 1.2,
            drift: 0
        });
    };

    // Fire three bursts for a "fanfare" effect
    shoot(60, 0);    // Left side
    shoot(120, 1);   // Right side
    
    // Delayed center blast for extra impact
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.7 },
            colors: vibrantColors
        });
    }, 300);
};

// 3. Timer & Progress Bar Logic (Synchronized)
const progressBar = document.getElementById('progress-bar');
const countdownEl = document.getElementById('countdown');

const timer = setInterval(() => {
    if (!isPaused) {
        timeLeft--;
        countdownEl.textContent = timeLeft;
        
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
    fireFanfare(); // Fire extra confetti when they choose to stay!
    document.querySelector('.timer-text').textContent = "Timer paused. Enjoy the celebration!";
    progressBar.style.background = "#4caf50";
});

// Run massive fanfare on entry
window.onload = fireFanfare;
