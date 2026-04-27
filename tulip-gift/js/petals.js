// Floating tulip petals background
(function() {
  const container = document.querySelector('.petal-bg');
  if (!container) return;

  const emojis = ['🌷', '🌸', '✿', '🌺', '💐', '🌷', '🌸'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = 10 + Math.random() * 14;
    const size = 1.2 + Math.random() * 1.6;

    petal.style.cssText = `
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      font-size: ${size}rem;
    `;

    container.appendChild(petal);
  }
})();
