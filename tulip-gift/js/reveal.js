// ── GIFT BOX REVEAL — illustrated tulip physics + gated petals ──
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

  /* ── Detach lid into a fixed element that flies + rests ── */
  function detachLid() {
    var svgEl  = document.getElementById('boxSvg');
    var lidGrp = document.getElementById('lid-group');
    if (!svgEl || !lidGrp) return;

    var svgRect = svgEl.getBoundingClientRect();
    var lidTop    = svgRect.top;
    var lidLeft   = svgRect.left + svgRect.width * (8 / 220);
    var lidWidth  = svgRect.width * (204 / 220);
    var lidHeight = svgRect.height * (110 / 210);

    var clone = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    clone.setAttribute('viewBox', '0 0 220 120');
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.style.cssText = [
      'position:fixed',
      'left:'   + lidLeft   + 'px',
      'top:'    + lidTop    + 'px',
      'width:'  + lidWidth  + 'px',
      'height:' + lidHeight + 'px',
      'pointer-events:none',
      'z-index:999',
      'overflow:visible',
      'filter:drop-shadow(0 8px 20px rgba(0,0,0,0.22))',
    ].join(';');

    var lidClone = lidGrp.cloneNode(true);
    lidClone.removeAttribute('id');
    clone.appendChild(lidClone);
    document.body.appendChild(clone);
    lidGrp.style.opacity = '0';

    var startX = lidLeft, startY = lidTop;
    var landX  = svgRect.left - lidWidth * 0.25;
    var landY  = svgRect.bottom + 50;
    var duration = 900, start = null;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function easeInOut(t) { return t < 0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2; }

    function animLid(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var ex = easeInOut(t);
      var x  = startX + (landX - startX) * ex;
      var vy = startY + (-200 * Math.sin(t * Math.PI)) + (landY - startY) * easeOut(t);
      var rot = -60 * t + 18 * Math.sin(t * Math.PI * 2);
      if (t > 0.75) { var s2 = (t - 0.75) / 0.25; rot = rot + (-38 - rot) * s2; }
      var sc = t < 0.1 ? (1 + t * 0.6) : 1.06;
      clone.style.transform = 'translate('+(x-startX)+'px,'+(vy-startY)+'px) rotate('+rot+'deg) scale('+sc+')';
      clone.style.opacity   = t > 0.88 ? String(1 - (t-0.88)/0.12 * 0.12) : '1';
      if (t < 1) { requestAnimationFrame(animLid); }
      else {
        clone.style.transform = 'translate('+(landX-startX)+'px,'+(landY-startY)+'px) rotate(-38deg) scale(1)';
        clone.style.opacity = '0.9';
      }
    }
    requestAnimationFrame(animLid);
  }

  /* ── Physics tulip launcher — uses illustrated SVG tulips ── */
  function launchTulips() {
    var svgEl = document.getElementById('boxSvg');
    if (!svgEl) return;
    var rect = svgEl.getBoundingClientRect();
    var ox = rect.left + rect.width / 2;
    var oy = rect.top  + rect.height * 0.45;

    var varieties = window.TULIP_VARIETIES && window.TULIP_VARIETIES[window.PAGE_KEY];
    if (!varieties || !varieties.length) return;

    // Pick up to 7 tulips to launch, cycling through varieties
    var launches = [
      { vx:  0,   vy: -38, size: 90,  delay: 180 },
      { vx: -14,  vy: -34, size: 75,  delay: 220 },
      { vx:  14,  vy: -34, size: 75,  delay: 210 },
      { vx: -26,  vy: -28, size: 65,  delay: 260 },
      { vx:  26,  vy: -28, size: 65,  delay: 250 },
      { vx:  -6,  vy: -42, size: 82,  delay: 160 },
      { vx:   8,  vy: -40, size: 78,  delay: 200 },
    ];

    launches.forEach(function(cfg, idx) {
      var variety = varieties[idx % varieties.length];
      setTimeout(function() {
        var el = window.makeTulipElement(variety, cfg.size);
        el.style.cssText += 'position:fixed;z-index:50;left:' + ox + 'px;top:' + oy + 'px;opacity:1;will-change:transform,opacity;transform-origin:bottom center;';
        document.body.appendChild(el);

        var x = ox, y = oy, vx = cfg.vx, vy = cfg.vy;
        var gravity = 1.6, rot = (Math.random()-0.5)*10, rs = (Math.random()-0.5)*5, frame = 0;

        (function tick() {
          vy += gravity; x += vx; y += vy; rot += rs; vx *= 0.992;
          el.style.left = x + 'px';
          el.style.top  = y + 'px';
          el.style.transform = 'rotate(' + rot + 'deg)';
          if (y > oy + 60) el.style.opacity = String(Math.max(0, 1 - (y - oy - 60) / 180));
          if (++frame < 120 && y < window.innerHeight + 80) requestAnimationFrame(tick);
          else if (el.parentNode) el.parentNode.removeChild(el);
        })();
      }, cfg.delay);
    });
  }

  /* ── Confetti ── */
  function spawnConfetti(colors) {
    var box = document.getElementById('boxSvg');
    if (!box) return;
    var r  = box.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height * 0.38;
    for (var i = 0; i < 48; i++) {
      (function(idx) {
        setTimeout(function() {
          var el = document.createElement('div');
          el.style.cssText = [
            'position:fixed', 'pointer-events:none', 'z-index:30',
            'border-radius:' + (Math.random() > 0.45 ? '50%' : '2px'),
            'width:'  + (7 + Math.random() * 7) + 'px',
            'height:' + (7 + Math.random() * 7) + 'px',
            'background:' + colors[idx % colors.length],
            'left:' + (cx + (Math.random() - 0.5) * 190) + 'px',
            'top:'  + (cy + (Math.random() - 0.5) * 60)  + 'px',
            'opacity:0',
            'animation:confettiFall ' + (0.75 + Math.random() * 0.9) + 's linear ' + (Math.random() * 0.2) + 's forwards',
          ].join(';');
          document.body.appendChild(el);
          setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 2200);
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
    var sw1 = document.getElementById('sw1');
    var sw2 = document.getElementById('sw2');
    var confettiColors = window.CONFETTI_COLORS || ['#e85d3a','#f5c518','#b03a2e','#ffd6cc','#fff4a0','#ff8c6b'];

    if (promptText) promptText.classList.add('hidden');
    if (clickHint)  clickHint.classList.add('hidden');

    setTimeout(function() {
      if (sw1) sw1.classList.add('pop');
      if (sw2) sw2.classList.add('pop');
    }, 80);

    setTimeout(detachLid, 130);
    launchTulips();
    setTimeout(function() { spawnConfetti(confettiColors); }, 220);
    setTimeout(function() { spawnConfetti(confettiColors); }, 500);
    setTimeout(activatePetals, 600);
    setTimeout(function() { if (revealMsg) revealMsg.classList.add('show'); }, 950);
  };

})();
