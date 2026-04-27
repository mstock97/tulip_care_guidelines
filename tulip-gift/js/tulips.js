// ── TULIP VARIETY DATA & ILLUSTRATED SVG RENDERERS ──

window.TULIP_VARIETIES = {

  mom: [
    { name:'Tulipa World Peace',      type:'single',  c1:'#e8b830', c2:'#c8380a', c3:'#4a7c3f', accent:'#e8d060',
      desc:'Bold yellow blooms with a fiery red-orange glow through each petal. A Darwin hybrid that glows like a sunset.',
      bloom:'Mid spring', height:'45–55 cm' },
    { name:'Tulipa Whispering Dream', type:'lily',    c1:'#f5f0e8', c2:'#c8306a', c3:'#4a7c3f', accent:'#e890b0',
      desc:'Elegant lily-flowering tulip: ivory-white petals that slowly transform to rich raspberry-magenta as they mature.',
      bloom:'Mid spring', height:'50–60 cm' },
    { name:'Tulipa Queen of Night',   type:'single',  c1:'#2a1535', c2:'#1a0a25', c3:'#2a5020', accent:'#5a3070',
      desc:'The darkest tulip in existence — near-black velvety maroon with a mysterious depth. An undisputed showstopper.',
      bloom:'Late spring', height:'55–60 cm' },
    { name:'Tulipa Menton',           type:'single',  c1:'#e8784a', c2:'#c04830', c3:'#4a7c3f', accent:'#f0a080',
      desc:'Rich salmon-orange petals with a warm rosy glow inside. One of the most luminous tulips in afternoon sun.',
      bloom:'Late spring', height:'55–65 cm' },
    { name:'Tulipa Big Smile',        type:'single',  c1:'#f8e020', c2:'#d8b800', c3:'#4a7c3f', accent:'#fdf080',
      desc:'Bright, cheerful golden yellow — a classic Darwin hybrid that brings pure sunshine to the spring garden.',
      bloom:'Mid spring', height:'50–55 cm' },
    { name:'Tulipa Flaming Flag',     type:'single',  c1:'#f5f5f5', c2:'#9040c0', c3:'#4a7c3f', accent:'#c880e8',
      desc:'Creamy white petals dramatically flamed and feathered with bold magenta-purple streaks. Like a painted masterpiece.',
      bloom:'Mid spring', height:'45–55 cm' },
    { name:'Tulipa Toendra',          type:'single',  c1:'#e86060', c2:'#b83030', c3:'#4a7c3f', accent:'#f09090',
      desc:'Vibrant coral-red blooms with a neat rounded cup. Strong stems and exceptional long-lasting garden performance.',
      bloom:'Mid spring', height:'40–45 cm' },
    { name:'Tulipa Don Quichotte',    type:'single',  c1:'#d050a0', c2:'#a03080', c3:'#4a7c3f', accent:'#e890c8',
      desc:'Deep rose-pink with a cool magenta glow. A triumph tulip beloved for its reliability and intensely rich color.',
      bloom:'Mid spring', height:'45–55 cm' },
    { name:'Tulipa Purple Prince',    type:'single',  c1:'#7040a8', c2:'#502080', c3:'#3a6b30', accent:'#b090e0',
      desc:'Rich glowing violet-purple with a silky sheen. A single early tulip that opens before most others.',
      bloom:'Early spring', height:'30–35 cm' },
    { name:'Tulipa Yellow Crown',     type:'fringed', c1:'#f8e040', c2:'#d8b800', c3:'#4a7c3f', accent:'#fdf0a0',
      desc:'Bright lemon-yellow petals with beautifully fringed, feathery crystal-like edges that catch the light.',
      bloom:'Late spring', height:'45–50 cm' },
  ],

  courtney: [
    { name:'Tulipa Kunyun',          type:'single',  c1:'#f7e0a0', c2:'#e880c0', c3:'#4a7c3f', accent:'#f0b8d8',
      desc:'A color-shifting magic act: opens ivory-white with fuchsia-pink edges, matures to golden yellow with raspberry flushes.',
      bloom:'Mid–late spring', height:'55–60 cm' },
    { name:'Tulipa Orange Princess', type:'double',  c1:'#f07028', c2:'#901060', c3:'#4a7c3f', accent:'#f8a870',
      desc:'Lush peony-form double blooms in glowing nasturtium-orange, flamed with crimson-purple. Fragrant and full.',
      bloom:'Mid–late spring', height:'30–35 cm' },
    { name:'Tulipa Queensland',      type:'fringed', c1:'#d04878', c2:'#f8e0ec', c3:'#4a7c3f', accent:'#f0a8c8',
      desc:'Double fringed rose-red petals with delicately ruffled, serrated peach-pink edges. An absolute showpiece.',
      bloom:'Late spring', height:'35–40 cm' },
    { name:'Tulipa Purple Prince',   type:'single',  c1:'#7040a8', c2:'#502080', c3:'#3a6b30', accent:'#b090e0',
      desc:'Rich glowing violet-purple with a silky sheen. A single early tulip that opens before most others.',
      bloom:'Early spring', height:'30–35 cm' },
  ],
};

window.TULIP_VARIETIES.maw      = window.TULIP_VARIETIES.mom;
window.TULIP_VARIETIES.brittney = window.TULIP_VARIETIES.courtney;

// ── SVG TULIP ILLUSTRATORS ──

function stemAndLeaf(c3, thick) {
  thick = thick || 3;
  return '<line x1="30" y1="42" x2="30" y2="118" stroke="'+c3+'" stroke-width="'+thick+'" stroke-linecap="round"/>'
       + '<path d="M30 85 Q14 68 20 52" fill="'+c3+'" stroke="none"/>';
}

function drawSingle(v) {
  var c1=v.c1, c2=v.c2, c3=v.c3;
  var s = '<ellipse cx="18" cy="22" rx="10" ry="18" fill="'+c2+'" opacity="0.85" transform="rotate(-28 18 22)"/>'
        + '<ellipse cx="42" cy="22" rx="10" ry="18" fill="'+c2+'" opacity="0.85" transform="rotate(28 42 22)"/>'
        + '<ellipse cx="30" cy="16" rx="11" ry="22" fill="'+c1+'"/>'
        + '<ellipse cx="18" cy="26" rx="9" ry="18" fill="'+c1+'" transform="rotate(-18 18 26)"/>'
        + '<ellipse cx="42" cy="26" rx="9" ry="18" fill="'+c1+'" transform="rotate(18 42 26)"/>'
        + '<ellipse cx="26" cy="14" rx="3" ry="9" fill="white" opacity="0.20"/>'
        + (v.name.indexOf('Flag')>-1
            ? '<ellipse cx="30" cy="16" rx="5" ry="18" fill="'+c2+'" opacity="0.55"/>'
            + '<ellipse cx="18" cy="26" rx="4" ry="14" fill="'+c2+'" opacity="0.45" transform="rotate(-18 18 26)"/>'
            + '<ellipse cx="42" cy="26" rx="4" ry="14" fill="'+c2+'" opacity="0.45" transform="rotate(18 42 26)"/>' : '')
        + (v.name.indexOf('Peace')>-1
            ? '<ellipse cx="30" cy="28" rx="8" ry="10" fill="'+c2+'" opacity="0.40"/>'
            + '<ellipse cx="18" cy="30" rx="6" ry="9" fill="'+c2+'" opacity="0.35" transform="rotate(-18 18 30)"/>' : '');
  return s + stemAndLeaf(c3);
}

function drawDouble(v) {
  var c1=v.c1, c2=v.c2, c3=v.c3;
  var s = '';
  [-50,-20,10,40,70,100].forEach(function(a) {
    s += '<ellipse cx="30" cy="26" rx="11" ry="16" fill="'+c2+'" opacity="0.7" transform="rotate('+a+' 30 26)"/>';
  });
  [-35,0,35,70].forEach(function(a) {
    s += '<ellipse cx="30" cy="24" rx="10" ry="14" fill="'+c1+'" opacity="0.85" transform="rotate('+a+' 30 24)"/>';
  });
  s += '<ellipse cx="30" cy="22" rx="9" ry="10" fill="'+c1+'"/>'
     + '<ellipse cx="27" cy="18" rx="3" ry="6" fill="white" opacity="0.18"/>';
  if (v.name.indexOf('Orange Princess')>-1)
    s += '<ellipse cx="30" cy="30" rx="6" ry="8" fill="'+c2+'" opacity="0.35"/>';
  return s + stemAndLeaf(c3, 3);
}

function drawFringed(v) {
  var c1=v.c1, c2=v.c2, c3=v.c3;
  var s = '<ellipse cx="30" cy="24" rx="16" ry="22" fill="'+c1+'"/>'
        + '<ellipse cx="18" cy="28" rx="10" ry="17" fill="'+c1+'" transform="rotate(-20 18 28)"/>'
        + '<ellipse cx="42" cy="28" rx="10" ry="17" fill="'+c1+'" transform="rotate(20 42 28)"/>';
  var fc = v.name.indexOf('Queensland')>-1 ? v.c2 : v.accent;
  [[14,10],[18,6],[22,4],[26,3],[30,2],[34,3],[38,4],[42,6],[46,10]].forEach(function(pt,i) {
    s += '<line x1="'+pt[0]+'" y1="'+(pt[1]+4)+'" x2="'+pt[0]+'" y2="'+pt[1]+'" stroke="'+fc+'" stroke-width="1.5" stroke-linecap="round"/>';
    if (i%2===0) s += '<line x1="'+(pt[0]+1)+'" y1="'+(pt[1]+5)+'" x2="'+(pt[0]+2)+'" y2="'+(pt[1]+1)+'" stroke="'+fc+'" stroke-width="1" stroke-linecap="round"/>';
  });
  if (v.name.indexOf('Queensland')>-1) s += '<ellipse cx="30" cy="22" rx="12" ry="16" fill="'+v.c2+'" opacity="0.15"/>';
  if (v.name.indexOf('Crown')>-1)      s += '<ellipse cx="30" cy="24" rx="10" ry="16" fill="'+c2+'" opacity="0.12"/>';
  s += '<ellipse cx="27" cy="16" rx="3" ry="7" fill="white" opacity="0.18"/>';
  return s + stemAndLeaf(c3);
}

function drawLily(v) {
  var c1=v.c1, c2=v.c2, c3=v.c3;
  var s = '<path d="M30 40 C22 28 14 12 20 2 C24 8 28 18 30 20 C32 18 36 8 40 2 C46 12 38 28 30 40Z" fill="'+c2+'" opacity="0.75"/>'
        + '<path d="M30 40 C16 32 6 20 10 6 C15 14 22 26 30 32Z" fill="'+c1+'" transform="rotate(-15 30 40)"/>'
        + '<path d="M30 40 C44 32 54 20 50 6 C45 14 38 26 30 32Z" fill="'+c1+'" transform="rotate(15 30 40)"/>'
        + '<path d="M30 40 C22 28 16 12 22 2 C25 8 28 20 30 22 C32 20 35 8 38 2 C44 12 38 28 30 40Z" fill="'+c1+'"/>';
  if (v.name.indexOf('Whisper')>-1)
    s += '<path d="M22 18 C24 10 28 4 30 2 C32 4 36 10 38 18 C36 14 32 10 30 12 C28 10 24 14 22 18Z" fill="'+c2+'" opacity="0.55"/>';
  s += '<ellipse cx="28" cy="16" rx="2" ry="7" fill="white" opacity="0.20"/>';
  return s + stemAndLeaf(c3, 2.5);
}

function drawTulip(v) {
  if (v.type==='double')  return drawDouble(v);
  if (v.type==='fringed') return drawFringed(v);
  if (v.type==='lily')    return drawLily(v);
  return drawSingle(v);
}

// ── SVG NODE BUILDER — DOMParser preserves SVG namespace correctly ──
window.makeTulipSVG = function(v, w, h) {
  w = w||60; h = h||120;
  var markup = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 120" '
             + 'width="'+w+'" height="'+h+'" overflow="visible" style="display:block;">'
             + drawTulip(v) + '</svg>';
  var doc = new DOMParser().parseFromString(markup, 'image/svg+xml');
  var node = doc.documentElement;
  if (node.nodeName==='parsererror' || (node.querySelector && node.querySelector('parsererror'))) {
    var fb = document.createElementNS('http://www.w3.org/2000/svg','svg');
    fb.setAttribute('viewBox','0 0 60 120'); fb.setAttribute('width',w); fb.setAttribute('height',h);
    var r = document.createElementNS('http://www.w3.org/2000/svg','rect');
    r.setAttribute('x','10');r.setAttribute('y','10');r.setAttribute('width','40');r.setAttribute('height','100');
    r.setAttribute('rx','8');r.setAttribute('fill',v.c1||'#e85d3a');
    fb.appendChild(r); return fb;
  }
  return document.importNode(node, true);
};

window.makeTulipElement = function(v, sizePx) {
  sizePx = sizePx||80;
  var wrap = document.createElement('span');
  wrap.style.cssText = 'display:inline-block;pointer-events:none;';
  wrap.appendChild(window.makeTulipSVG(v, Math.round(sizePx*0.5), sizePx));
  return wrap;
};

// ── PHOTO MODAL ──
// Fetches a real cultivar photo from Wikipedia (CORS-open with &origin=*).
// Falls back to the SVG illustration if no image is found.

var _photoCache = {};

function _wikiTitle(name) {
  return "Tulipa '" + name.replace(/^Tulipa\s+/, '') + "'";
}

function _fetchTulipPhoto(v, cb) {
  if (_photoCache[v.name] !== undefined) { cb(_photoCache[v.name]); return; }
  var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages'
          + '&format=json&pithumbsize=700&origin=*&titles='
          + encodeURIComponent(_wikiTitle(v.name));
  fetch(url)
    .then(function(r){ return r.json(); })
    .then(function(data){
      var pages = data.query && data.query.pages;
      var src = null;
      if (pages) {
        Object.keys(pages).forEach(function(k){
          if (!src && pages[k].thumbnail) src = pages[k].thumbnail.source;
        });
      }
      _photoCache[v.name] = src;
      cb(src);
    })
    .catch(function(){ _photoCache[v.name]=null; cb(null); });
}

function _openPhotoModal(v) {
  // ── Overlay ──
  var overlay = document.createElement('div');
  overlay.style.cssText = [
    'position:fixed','inset:0','z-index:9000',
    'background:rgba(0,0,0,0.72)',
    'display:flex','align-items:center','justify-content:center',
    'padding:16px','box-sizing:border-box',
    'opacity:0','transition:opacity 0.22s ease',
    'backdrop-filter:blur(5px)','-webkit-backdrop-filter:blur(5px)',
  ].join(';');

  // ── Card ──
  var card = document.createElement('div');
  card.style.cssText = [
    'background:#fff','border-radius:20px','overflow:hidden',
    'width:100%','max-width:400px',
    'max-height:88vh','display:flex','flex-direction:column',
    'box-shadow:0 24px 80px rgba(0,0,0,0.45)',
    'transform:scale(0.9) translateY(16px)',
    'transition:transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
  ].join(';');

  // ── Photo area ──
  var photoArea = document.createElement('div');
  photoArea.style.cssText = [
    'width:100%','height:260px','flex-shrink:0',
    'position:relative','overflow:hidden',
    'background:linear-gradient(140deg,'+v.c1+'55 0%,'+v.c2+'55 100%)',
    'display:flex','align-items:center','justify-content:center',
  ].join(';');

  // Loading state — SVG + spinner text
  var loadWrap = document.createElement('div');
  loadWrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;';
  var loadSvg = window.makeTulipSVG(v, 52, 104);
  loadSvg.style.opacity = '0.45';
  loadWrap.appendChild(loadSvg);
  var loadTxt = document.createElement('div');
  loadTxt.textContent = 'Loading photo…';
  loadTxt.style.cssText = 'font-family:Nunito,sans-serif;font-size:0.75rem;font-weight:700;color:'+v.c2+';opacity:0.75;letter-spacing:0.04em;';
  loadWrap.appendChild(loadTxt);
  photoArea.appendChild(loadWrap);

  // Close ×
  var closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label','Close');
  closeBtn.style.cssText = [
    'position:absolute','top:10px','right:12px','z-index:2',
    'background:rgba(0,0,0,0.38)','border:none',
    'color:#fff','width:30px','height:30px','border-radius:50%',
    'font-size:1.1rem','line-height:1','cursor:pointer',
    'display:flex','align-items:center','justify-content:center',
  ].join(';');
  photoArea.appendChild(closeBtn);

  // ── Info panel ──
  var info = document.createElement('div');
  info.style.cssText = 'padding:18px 20px 22px;overflow-y:auto;flex:1;';

  var nameEl = document.createElement('div');
  nameEl.style.cssText = "font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:1.1rem;font-weight:700;color:#111;margin-bottom:10px;line-height:1.3;";
  nameEl.textContent = v.name;

  var badgeRow = document.createElement('div');
  badgeRow.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;';

  function makeBadge(text, bg, fg) {
    var s = document.createElement('span');
    s.style.cssText = 'font-family:Nunito,sans-serif;font-size:0.7rem;font-weight:800;letter-spacing:0.04em;padding:3px 9px;border-radius:99px;'
                    + (bg ? 'background:'+bg+';color:'+fg+';border:1px solid '+bg.replace('28','60')+';' : 'background:#e8f5ee;color:#2a6040;');
    s.textContent = text;
    return s;
  }
  badgeRow.appendChild(makeBadge(v.bloom, v.c1+'28', v.c2));
  badgeRow.appendChild(makeBadge(v.height, null, null));
  badgeRow.appendChild(makeBadge(v.type.charAt(0).toUpperCase()+v.type.slice(1)+' tulip', null, null));

  var descEl = document.createElement('p');
  descEl.style.cssText = 'font-family:Nunito,sans-serif;font-size:0.86rem;color:#444;line-height:1.65;margin:0;';
  descEl.textContent = v.desc;

  info.appendChild(nameEl);
  info.appendChild(badgeRow);
  info.appendChild(descEl);

  card.appendChild(photoArea);
  card.appendChild(info);
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // ── Close logic ──
  function closeModal() {
    overlay.style.opacity = '0';
    card.style.transform = 'scale(0.9) translateY(16px)';
    setTimeout(function(){ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); document.removeEventListener('keydown',onKey); }, 250);
  }
  function onKey(e){ if(e.key==='Escape') closeModal(); }
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', function(e){ if(e.target===overlay) closeModal(); });
  closeBtn.addEventListener('click', closeModal);

  // Animate in
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      overlay.style.opacity = '1';
      card.style.transform = 'scale(1) translateY(0)';
    });
  });

  // ── Fetch & swap photo ──
  _fetchTulipPhoto(v, function(src){
    if (src) {
      var img = document.createElement('img');
      img.alt = v.name;
      img.style.cssText = [
        'position:absolute','inset:0',
        'width:100%','height:100%','object-fit:cover',
        'opacity:0','transition:opacity 0.4s ease',
      ].join(';');
      img.onload = function(){
        loadWrap.style.display = 'none';
        img.style.opacity = '1';
        // Attribution
        var attr = document.createElement('div');
        attr.textContent = 'Photo via Wikimedia Commons';
        attr.style.cssText = 'position:absolute;bottom:5px;right:8px;font-size:0.58rem;color:rgba(255,255,255,0.6);font-family:Nunito,sans-serif;pointer-events:none;text-shadow:0 1px 3px rgba(0,0,0,0.6);';
        photoArea.appendChild(attr);
      };
      img.onerror = function(){ loadTxt.textContent = 'Photo not available'; };
      photoArea.insertBefore(img, closeBtn);
      img.src = src;
    } else {
      loadSvg.style.opacity = '0.7';
      loadTxt.textContent = 'No photo found for this variety';
    }
  });
}

// ── VARIETY GRID BUILDER ──
window.buildVarietyGrid = function(page, targetEl) {
  var varieties = window.TULIP_VARIETIES[page];
  if (!varieties || !varieties.length) return;

  // mobile column count: 2-col for large sets (≥8 varieties), 1-col for small sets
  var mobileCols = varieties.length >= 8 ? 2 : 1;

  // Inject shared grid + modal styles once
  if (!document.getElementById('tulip-grid-styles')) {
    var style = document.createElement('style');
    style.id = 'tulip-grid-styles';
    style.textContent = [
      // Base: 3-col desktop for all grids
      '.tulip-variety-grid{display:grid;gap:14px;grid-template-columns:repeat(3,1fr);}',
      // Tablet: always 2-col at ≤700px
      '@media(max-width:700px){.tulip-variety-grid{grid-template-columns:repeat(2,1fr);}}',
      // Mobile: 2-col variant (large sets — Mom/Maw with 10 varieties)
      '@media(max-width:480px){.tulip-variety-grid.tulip-grid--mobile-2{grid-template-columns:repeat(2,1fr);}}',
      // Mobile: 1-col variant (small sets — Courtney/Brittney with 4 varieties)
      '@media(max-width:480px){.tulip-variety-grid.tulip-grid--mobile-1{grid-template-columns:1fr;}}',
      // On 1-col mobile, switch cards to horizontal row layout (big, easy to tap)
      '@media(max-width:480px){',
      '  .tulip-grid--mobile-1 .tulip-card{flex-direction:row!important;align-items:flex-start!important;gap:14px!important;padding:14px 16px!important;}',
      '  .tulip-grid--mobile-1 .tulip-card-svg{width:44px!important;}',
      '  .tulip-grid--mobile-1 .tulip-card-body{flex:1;min-width:0;}',
      '}',
      // Photo hint: hidden by default, shown on touch-only devices
      '.tulip-photo-hint{display:none;}',
      '@media(hover:none){.tulip-photo-hint{display:block;}}',
    ].join('\n');
    document.head.appendChild(style);
  }

  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function makeCard(v) {
    var card = document.createElement('div');
    card.className = 'tulip-card';
    card.style.cssText = 'background:#fff;border:1.5px solid '+v.c1+'44;border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:7px;';

    // ── Top row: SVG + name/badges ──
    var topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex;align-items:flex-start;gap:10px;';

    // SVG wrap — clickable
    var svgWrap = document.createElement('div');
    svgWrap.className = 'tulip-card-svg';
    svgWrap.style.cssText = [
      'flex-shrink:0;cursor:pointer;position:relative;',
      'border-radius:10px;padding:5px;',
      'transition:background 0.18s,transform 0.18s;',
      'width:42px;',
    ].join('');
    svgWrap.title = 'See a real photo';

    var svgNode = window.makeTulipSVG(v, 36, 72);
    svgWrap.appendChild(svgNode);

    // 📷 badge
    var camBadge = document.createElement('div');
    camBadge.textContent = '📷';
    camBadge.style.cssText = 'position:absolute;bottom:-3px;right:-3px;font-size:0.6rem;background:#fff;border-radius:99px;padding:1px 2px;box-shadow:0 1px 4px rgba(0,0,0,0.2);pointer-events:none;line-height:1;';
    svgWrap.appendChild(camBadge);

    svgWrap.addEventListener('mouseenter', function(){ svgWrap.style.background=v.c1+'22'; svgWrap.style.transform='scale(1.08)'; });
    svgWrap.addEventListener('mouseleave', function(){ svgWrap.style.background=''; svgWrap.style.transform=''; });
    svgWrap.addEventListener('click', function(e){ e.stopPropagation(); _openPhotoModal(v); });

    topRow.appendChild(svgWrap);

    // Name + badges
    var body = document.createElement('div');
    body.className = 'tulip-card-body';
    body.style.cssText = 'min-width:0;flex:1;';

    var nameEl = document.createElement('div');
    nameEl.style.cssText = "font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:0.84rem;font-weight:700;color:#1a1a1a;line-height:1.25;";
    nameEl.textContent = v.name;
    body.appendChild(nameEl);

    var badgeRow = document.createElement('div');
    badgeRow.style.cssText = 'margin-top:5px;display:flex;gap:5px;flex-wrap:wrap;';

    var b1 = document.createElement('span');
    b1.style.cssText = 'font-size:0.68rem;font-weight:800;letter-spacing:0.05em;background:'+v.c1+'28;color:'+v.c2+';padding:2px 7px;border-radius:99px;border:1px solid '+v.c1+'50;';
    b1.textContent = v.bloom;
    badgeRow.appendChild(b1);

    var b2 = document.createElement('span');
    b2.style.cssText = 'font-size:0.68rem;font-weight:800;letter-spacing:0.05em;background:#e8f5ee;color:#2a6040;padding:2px 7px;border-radius:99px;';
    b2.textContent = v.height;
    badgeRow.appendChild(b2);

    body.appendChild(badgeRow);
    topRow.appendChild(body);
    card.appendChild(topRow);

    // ── Description ──
    var desc = document.createElement('p');
    desc.className = 'tulip-card-desc';
    desc.style.cssText = 'font-size:0.78rem;color:#555;line-height:1.55;margin:0;';
    desc.textContent = v.desc;
    card.appendChild(desc);

    // ── Touch hint ──
    var hint = document.createElement('div');
    hint.className = 'tulip-photo-hint';
    hint.style.cssText = 'font-size:0.68rem;color:'+v.c2+';font-weight:700;opacity:0.6;margin-top:2px;';
    hint.textContent = 'Tap the tulip to see a real photo 📷';
    card.appendChild(hint);

    return card;
  }

  targetEl.innerHTML = '';
  var grid = document.createElement('div');
  grid.className = 'tulip-variety-grid tulip-grid--mobile-' + mobileCols;
  varieties.forEach(function(v){ grid.appendChild(makeCard(v)); });
  targetEl.appendChild(grid);
};
