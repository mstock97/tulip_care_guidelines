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
      p.style.animationDelay  = (Math.random() * 12) + 's';
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

  /* ── Detach lid into fixed clone that arcs & rests ── */
  function detachLid() {
    var svgEl  = document.getElementById('boxSvg');
    var lidGrp = document.getElementById('lid-group');
    if (!svgEl || !lidGrp) return;
    var svgRect  = svgEl.getBoundingClientRect();
    var lidLeft  = svgRect.left + svgRect.width * (8/220);
    var lidWidth = svgRect.width * (204/220);
    var lidH     = svgRect.height * (110/210);

    var clone = document.createElementNS('http://www.w3.org/2000/svg','svg');
    clone.setAttribute('viewBox','0 0 220 120');
    clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
    clone.style.cssText = 'position:fixed;left:'+lidLeft+'px;top:'+svgRect.top+'px;width:'+lidWidth+'px;height:'+lidH+'px;pointer-events:none;z-index:999;overflow:visible;filter:drop-shadow(0 8px 20px rgba(0,0,0,0.22));';
    var lc = lidGrp.cloneNode(true); lc.removeAttribute('id');
    clone.appendChild(lc);
    document.body.appendChild(clone);
    lidGrp.style.opacity = '0';

    var sx = lidLeft, sy = svgRect.top;
    var lx = svgRect.left - lidWidth*0.25, ly = svgRect.bottom + 50;
    var dur = 900, t0 = null;
    function ei(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
    function eo(t){return 1-Math.pow(1-t,3);}

    (function anim(ts) {
      if (!t0) t0 = ts;
      var t = Math.min((ts-t0)/dur, 1);
      var x = sx+(lx-sx)*ei(t);
      var y = sy+(-200*Math.sin(t*Math.PI))+(ly-sy)*eo(t);
      var r = -60*t+18*Math.sin(t*Math.PI*2);
      if (t>0.75) r = r+(-38-r)*((t-0.75)/0.25);
      clone.style.transform='translate('+(x-sx)+'px,'+(y-sy)+'px) rotate('+r+'deg)';
      clone.style.opacity = t>0.88 ? String(1-(t-0.88)/0.12*0.12) : '1';
      if (t<1) requestAnimationFrame(anim);
      else { clone.style.transform='translate('+(lx-sx)+'px,'+(ly-sy)+'px) rotate(-38deg)'; clone.style.opacity='0.9'; }
    })(0);
  }

  /* ── Launch physics tulips + animate cards popping in ── */
  function launchTulips() {
    var svgEl = document.getElementById('boxSvg');
    if (!svgEl) return;
    var rect = svgEl.getBoundingClientRect();
    var ox = rect.left + rect.width/2;
    var oy = rect.top  + rect.height*0.45;

    var varieties = window.TULIP_VARIETIES && window.TULIP_VARIETIES[window.PAGE_KEY];
    if (!varieties || !varieties.length) return;

    var launches = [
      {vx:0,   vy:-40, size:88, delay:160},
      {vx:-15, vy:-35, size:72, delay:210},
      {vx:15,  vy:-35, size:72, delay:200},
      {vx:-28, vy:-28, size:64, delay:260},
      {vx:28,  vy:-28, size:64, delay:250},
      {vx:-7,  vy:-44, size:80, delay:150},
      {vx:9,   vy:-42, size:76, delay:195},
    ];

    // Get the variety card elements so we can animate them popping in
    var cardEls = document.querySelectorAll('.tulip-card');

    launches.forEach(function(cfg, idx) {
      var v = varieties[idx % varieties.length];
      setTimeout(function() {
        var el = window.makeTulipElement(v, cfg.size);
        el.style.cssText += 'position:fixed;z-index:50;left:'+ox+'px;top:'+oy+'px;opacity:1;will-change:transform,opacity;transform-origin:bottom center;';
        document.body.appendChild(el);

        var x=ox, y=oy, vx=cfg.vx, vy=cfg.vy;
        var gravity=1.65, rot=(Math.random()-0.5)*10, rs=(Math.random()-0.5)*5, frame=0;

        (function tick(){
          vy+=gravity; x+=vx; y+=vy; rot+=rs; vx*=0.992;
          el.style.left=x+'px'; el.style.top=y+'px';
          el.style.transform='rotate('+rot+'deg)';
          if (y>oy+60) el.style.opacity=String(Math.max(0,1-(y-oy-60)/180));
          if (++frame<120 && y<window.innerHeight+80) requestAnimationFrame(tick);
          else if (el.parentNode) el.parentNode.removeChild(el);
        })();
      }, cfg.delay);
    });

    // Stagger-animate each variety card popping in after tulips land
    cardEls.forEach(function(card, i) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(22px) scale(0.92)';
      card.style.transition = 'none';
      setTimeout(function() {
        card.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 900 + i * 80);
    });
  }

  /* ── Confetti ── */
  function spawnConfetti(colors) {
    var box = document.getElementById('boxSvg');
    if (!box) return;
    var r = box.getBoundingClientRect();
    var cx=r.left+r.width/2, cy=r.top+r.height*0.38;
    for (var i=0;i<48;i++) {
      (function(idx){
        setTimeout(function(){
          var el=document.createElement('div');
          el.style.cssText='position:fixed;pointer-events:none;z-index:30;border-radius:'+(Math.random()>0.45?'50%':'2px')+';width:'+(7+Math.random()*7)+'px;height:'+(7+Math.random()*7)+'px;background:'+colors[idx%colors.length]+';left:'+(cx+(Math.random()-0.5)*190)+'px;top:'+(cy+(Math.random()-0.5)*60)+'px;opacity:0;animation:confettiFall '+(0.75+Math.random()*0.9)+'s linear '+(Math.random()*0.2)+'s forwards;';
          document.body.appendChild(el);
          setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},2200);
        },idx*12);
      })(i);
    }
  }

  /* ── Main open handler ── */
  window.openBox = function() {
    var wrapper = document.getElementById('giftWrapper');
    if (!wrapper || wrapper.dataset.opened) return;
    wrapper.dataset.opened = '1';
    wrapper.style.cursor = 'default';
    wrapper.classList.add('shake');

    var confettiColors = window.CONFETTI_COLORS || ['#e85d3a','#f5c518','#b03a2e','#ffd6cc','#fff4a0','#ff8c6b'];
    var ids = ['promptText','clickHint'];
    ids.forEach(function(id){ var el=document.getElementById(id); if(el) el.classList.add('hidden'); });

    setTimeout(function(){
      var s1=document.getElementById('sw1'), s2=document.getElementById('sw2');
      if(s1) s1.classList.add('pop'); if(s2) s2.classList.add('pop');
    },80);
    setTimeout(detachLid, 130);
    launchTulips();
    setTimeout(function(){spawnConfetti(confettiColors);},220);
    setTimeout(function(){spawnConfetti(confettiColors);},500);
    setTimeout(activatePetals, 600);
    setTimeout(function(){var r=document.getElementById('revealMsg'); if(r) r.classList.add('show');},950);
  };

})();
