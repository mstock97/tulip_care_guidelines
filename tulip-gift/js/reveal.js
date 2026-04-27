// ── GIFT BOX REVEAL — SVG tulip physics + card pop-in ── 
(function () {

  /* ── Petals: create paused until box opens ── */
  var petalBg = document.getElementById('petalBg');
  if (petalBg) {
    var emojis = ['🌷','🌸','✿','🌺'];
    for (var i = 0; i < 18; i++) {
      var p = document.createElement('span');
      p.className = 'petal';
      p.textContent = emojis[i % emojis.length];
      p.style.left = (Math.random() * 100) + '%';
      p.style.animationDelay    = (Math.random() * 12) + 's';
      p.style.animationDuration = (10 + Math.random() * 14) + 's';
      p.style.fontSize = (1.1 + Math.random() * 1.2) + 'rem';
      petalBg.appendChild(p);
    }
  }

  function activatePetals() {
    document.querySelectorAll('.petal').forEach(function(p, i) {
      setTimeout(function() { p.classList.add('active'); }, i * 80);
    });
  }

  /* ── Lid: explodes off and flies out of the viewport ── */
  function detachLid() {
    var svgEl  = document.getElementById('boxSvg');
    var lidGrp = document.getElementById('lid-group');
    if (!svgEl || !lidGrp) return;

    var svgRect  = svgEl.getBoundingClientRect();
    var lidLeft  = svgRect.left + svgRect.width * (8 / 220);
    var lidWidth = svgRect.width * (204 / 220);
    var lidH     = svgRect.height * (110 / 210);

    var clone = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    clone.setAttribute('viewBox', '0 0 220 120');
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.style.cssText = [
      'position:fixed',
      'left:'   + lidLeft      + 'px',
      'top:'    + svgRect.top  + 'px',
      'width:'  + lidWidth     + 'px',
      'height:' + lidH         + 'px',
      'pointer-events:none',
      'z-index:999',
      'overflow:visible',
      'filter:drop-shadow(0 8px 24px rgba(0,0,0,0.28))',
    ].join(';');

    var lc = lidGrp.cloneNode(true);
    lc.removeAttribute('id');
    clone.appendChild(lc);
    document.body.appendChild(clone);
    lidGrp.style.opacity = '0';

    var x   = 0, y = 0, vx = 18, vy = -32, rot = 0, rs = 14;
    var gravity = 1.2;
    var frame = 0, maxFrames = 200;

    function animLid() {
      frame++;
      vy  += gravity;
      x   += vx;
      y   += vy;
      rot += rs;
      vx  *= 0.99;

      clone.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rot + 'deg)';

      var traveled = Math.sqrt(x*x + y*y);
      if (traveled > 300) {
        var fade = Math.max(0, 1 - (traveled - 300) / 200);
        clone.style.opacity = String(fade);
      }

      var offScreen = (
        svgRect.top  + y > window.innerHeight + 100 ||
        svgRect.top  + y < -200 ||
        svgRect.left + x > window.innerWidth  + 200 ||
        svgRect.left + x < -200
      );

      if (frame < maxFrames && !offScreen) {
        requestAnimationFrame(animLid);
      } else {
        if (clone.parentNode) clone.parentNode.removeChild(clone);
      }
    }

    requestAnimationFrame(animLid);
  }

  /* ── Physics tulip launcher ── */
  function launchTulips() {
    var svgEl = document.getElementById('boxSvg');
    if (!svgEl) return;
    var rect = svgEl.getBoundingClientRect();
    var ox = rect.left + rect.width  / 2;
    var oy = rect.top  + rect.height * 0.45;

    var varieties = window.TULIP_VARIETIES && window.TULIP_VARIETIES[window.PAGE_KEY];
    if (!varieties || !varieties.length) return;

    var launches = [
      { vx:  0,   vy: -40, size: 88, delay: 160 },
      { vx: -15,  vy: -35, size: 72, delay: 210 },
      { vx:  15,  vy: -35, size: 72, delay: 200 },
      { vx: -28,  vy: -28, size: 64, delay: 260 },
      { vx:  28,  vy: -28, size: 64, delay: 250 },
      { vx:  -7,  vy: -44, size: 80, delay: 150 },
      { vx:   9,  vy: -42, size: 76, delay: 195 },
    ];

    launches.forEach(function(cfg, idx) {
      var v = varieties[idx % varieties.length];
      setTimeout(function() {
        var el = window.makeTulipElement(v, cfg.size);
        el.style.cssText += 'position:fixed;z-index:50;left:'+ox+'px;top:'+oy+'px;opacity:1;will-change:transform,opacity;transform-origin:bottom center;';
        document.body.appendChild(el);

        var x = ox, y = oy, vx = cfg.vx, vy = cfg.vy;
        var gravity = 1.65;
        var rot = (Math.random() - 0.5) * 10;
        var rs  = (Math.random() - 0.5) * 5;
        var frame = 0;

        (function tick() {
          vy += gravity; x += vx; y += vy; rot += rs; vx *= 0.992;
          el.style.left      = x + 'px';
          el.style.top       = y + 'px';
          el.style.transform = 'rotate(' + rot + 'deg)';
          if (y > oy + 60) el.style.opacity = String(Math.max(0, 1 - (y - oy - 60) / 180));
          if (++frame < 120 && y < window.innerHeight + 80) {
            requestAnimationFrame(tick);
          } else {
            if (el.parentNode) el.parentNode.removeChild(el);
          }
        })();
      }, cfg.delay);
    });
  }

  /* ── Confetti ── */
  function spawnConfetti(colors) {
    var box = document.getElementById('boxSvg');
    if (!box) return;
    var r  = box.getBoundingClientRect();
    var cx = r.left + r.width  / 2;
    var cy = r.top  + r.height * 0.38;
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

  /* ── Card pop-in ── */
  window.animateCards = function() {
    var cards = document.querySelectorAll('.tulip-card');
    cards.forEach(function(card, i) {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(20px) scale(0.92)';
      card.style.transition = 'none';
      void card.offsetWidth;
      setTimeout(function() {
        card.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
        card.style.opacity    = '1';
        card.style.transform  = 'translateY(0) scale(1)';
      }, i * 75);
    });
  };

  /* ── Main open handler ── */
  window.openBox = function() {
    var wrapper = document.getElementById('giftWrapper');
    if (!wrapper || wrapper.dataset.opened) return;
    wrapper.dataset.opened = '1';
    wrapper.style.cursor = 'default';
    wrapper.classList.add('shake');

    var confettiColors = window.CONFETTI_COLORS || ['#e85d3a','#f5c518','#b03a2e','#ffd6cc','#fff4a0','#ff8c6b'];

    ['promptText', 'clickHint'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });

    setTimeout(function() {
      var s1 = document.getElementById('sw1');
      var s2 = document.getElementById('sw2');
      if (s1) s1.classList.add('pop');
      if (s2) s2.classList.add('pop');
    }, 80);

    setTimeout(detachLid, 120);
    launchTulips();

    setTimeout(function() { spawnConfetti(confettiColors); }, 200);
    setTimeout(function() { spawnConfetti(confettiColors); }, 480);
    setTimeout(activatePetals, 600);

    setTimeout(function() {
      var r = document.getElementById('revealMsg');
      if (r) r.classList.add('show');
    }, 900);

    // Post-reveal: page scripts wrap openBox and call buildVarietyGrid + animateCards.
    // The .show class switches display:none → display:flex and triggers the fade-in.
    // We need a brief rAF after adding .show so the browser registers the display
    // change before the opacity/transform transition fires.
  };

})();
