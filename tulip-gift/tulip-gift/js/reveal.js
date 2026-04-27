// ── GIFT BOX REVEAL — physics tulips + gated petals ──

(function () {

  /* ── Petals: create but keep paused ── */
  var petalBg = document.getElementById('petalBg');
  if (petalBg) {
    var emojis = ['🌷', '🌸', '✿', '🌺'];
    for (var i = 0; i < 18; i++) {
      var p = document.createElement('span');
      p.className = 'petal';
      p.textContent = emojis[i % emojis.length];
      p.style.left = (Math.random() * 100) + '%';
      p.style.animationDelay = (Math.random() * 12) + 's';
      p.style.animationDuration = (10 + Math.random() * 14) + 's';
      p.style.fontSize = (1.1 + Math.random() * 1.2) + 'rem';
      petalBg.appendChild(p);
    }
  }

  function activatePetals() {
    var petals = document.querySelectorAll('.petal');
    petals.forEach(function (p, i) {
      setTimeout(function () { p.classList.add('active'); }, i * 80);
    });
  }

  /* ── Physics tulip launcher ── */
  function launchTulips() {
    var box = document.getElementById('boxSvg');
    if (!box) return;
    var rect = box.getBoundingClientRect();
    var originX = rect.left + rect.width / 2;
    var originY = rect.top + rect.height * 0.45;

    var tulips = [
      { emoji: '🌷', vx:  0,   vy: -38, size: '3.2rem', delay: 180 },
      { emoji: '🌷', vx: -14,  vy: -34, size: '2.5rem', delay: 220 },
      { emoji: '🌸', vx:  14,  vy: -34, size: '2.5rem', delay: 210 },
      { emoji: '🌺', vx: -26,  vy: -28, size: '2.2rem', delay: 260 },
      { emoji: '🌷', vx:  26,  vy: -28, size: '2.2rem', delay: 250 },
      { emoji: '🌷', vx:  -6,  vy: -42, size: '2.8rem', delay: 160 },
      { emoji: '🌸', vx:   8,  vy: -40, size: '2.6rem', delay: 200 },
    ];

    tulips.forEach(function (cfg) {
      setTimeout(function () {
        var el = document.createElement('span');
        el.style.cssText = [
          'position:fixed',
          'pointer-events:none',
          'z-index:50',
          'opacity:1',
          'transform-origin:center bottom',
          'will-change:transform,opacity',
          'font-size:' + cfg.size,
          'left:' + originX + 'px',
          'top:'  + originY + 'px',
        ].join(';');
        el.textContent = cfg.emoji;
        document.body.appendChild(el);

        var x = originX, y = originY;
        var vx = cfg.vx, vy = cfg.vy;
        var gravity = 1.6;
        var rotation = (Math.random() - 0.5) * 12;
        var rotSpeed = (Math.random() - 0.5) * 6;
        var frame = 0;

        function animate() {
          frame++;
          vy += gravity;
          x  += vx;
          y  += vy;
          rotation += rotSpeed;
          vx *= 0.992;

          el.style.left      = x + 'px';
          el.style.top       = y + 'px';
          el.style.transform = 'rotate(' + rotation + 'deg)';

          if (y > originY + 60) {
            var fade = Math.min(1, (y - originY - 60) / 180);
            el.style.opacity = String(1 - fade);
          }

          if (frame < 120 && y < window.innerHeight + 60) {
            requestAnimationFrame(animate);
          } else {
            if (el.parentNode) el.parentNode.removeChild(el);
          }
        }
        requestAnimationFrame(animate);
      }, cfg.delay);
    });
  }

  /* ── Confetti ── */
  function spawnConfetti(colors) {
    var box  = document.getElementById('boxSvg').getBoundingClientRect();
    var cx   = box.left + box.width / 2;
    var cy   = box.top  + box.height * 0.38;
    for (var i = 0; i < 48; i++) {
      (function (idx) {
        setTimeout(function () {
          var el = document.createElement('div');
          el.style.cssText = [
            'position:fixed',
            'pointer-events:none',
            'z-index:30',
            'border-radius:' + (Math.random() > 0.45 ? '50%' : '2px'),
            'width:'  + (7 + Math.random() * 7) + 'px',
            'height:' + (7 + Math.random() * 7) + 'px',
            'background:' + colors[idx % colors.length],
            'left:' + (cx + (Math.random() - 0.5) * 190) + 'px',
            'top:'  + (cy + (Math.random() - 0.5) * 60)  + 'px',
            'opacity:0',
            'transform:rotate(' + (Math.random() * 360) + 'deg)',
            'animation:confettiFall ' + (0.75 + Math.random() * 0.9) + 's linear ' + (Math.random() * 0.2) + 's forwards',
          ].join(';');
          document.body.appendChild(el);
          setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 2200);
        }, idx * 12);
      })(i);
    }
  }

  /* ── Main open handler ── */
  window.openBox = function () {
    var wrapper = document.getElementById('giftWrapper');
    if (!wrapper || wrapper.dataset.opened) return;
    wrapper.dataset.opened = '1';
    wrapper.style.cursor = 'default';
    wrapper.classList.add('shake');

    var promptText = document.getElementById('promptText');
    var clickHint  = document.getElementById('clickHint');
    var revealMsg  = document.getElementById('revealMsg');
    var sw1        = document.getElementById('sw1');
    var sw2        = document.getElementById('sw2');
    var lidGroup   = document.getElementById('lid-group');
    var confettiColors = window.CONFETTI_COLORS || ['#e85d3a','#f5c518','#b03a2e','#ffd6cc','#fff4a0','#ff8c6b','#fce4b0'];

    if (promptText) promptText.classList.add('hidden');
    if (clickHint)  clickHint.classList.add('hidden');

    setTimeout(function () {
      if (sw1) sw1.classList.add('pop');
      if (sw2) sw2.classList.add('pop');
    }, 80);

    setTimeout(function () {
      if (lidGroup) lidGroup.classList.add('fly-off');
    }, 120);

    launchTulips();
    setTimeout(function () { spawnConfetti(confettiColors); }, 220);
    setTimeout(function () { spawnConfetti(confettiColors); }, 500);
    setTimeout(activatePetals, 600);

    setTimeout(function () {
      if (revealMsg) revealMsg.classList.add('show');
    }, 950);
  };

})();
