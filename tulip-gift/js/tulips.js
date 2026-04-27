// ── TULIP VARIETY DATA & ILLUSTRATED SVG RENDERERS ──

// Each variety has: name, type (single|double|fringed|lily|parrot), colors, desc, bloom, height
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
// Each returns inner SVG content for a 60x120 viewBox, flower centered at (30, 40), stem going to (30, 120)

function stemAndLeaf(c3, thick) {
  thick = thick || 3;
  return '<line x1="30" y1="42" x2="30" y2="118" stroke="'+c3+'" stroke-width="'+thick+'" stroke-linecap="round"/>'
       + '<path d="M30 85 Q14 68 20 52" fill="'+c3+'" stroke="none"/>';
}

// Single cup tulip (classic goblet shape with 6 petals)
function drawSingle(v) {
  var c1=v.c1, c2=v.c2, c3=v.c3;
  // back petals
  var s = '<ellipse cx="18" cy="22" rx="10" ry="18" fill="'+c2+'" opacity="0.85" transform="rotate(-28 18 22)"/>'
        + '<ellipse cx="42" cy="22" rx="10" ry="18" fill="'+c2+'" opacity="0.85" transform="rotate(28 42 22)"/>'
  // front petals
        + '<ellipse cx="30" cy="16" rx="11" ry="22" fill="'+c1+'"/>'
        + '<ellipse cx="18" cy="26" rx="9" ry="18" fill="'+c1+'" transform="rotate(-18 18 26)"/>'
        + '<ellipse cx="42" cy="26" rx="9" ry="18" fill="'+c1+'" transform="rotate(18 42 26)"/>'
  // inner sheen
        + '<ellipse cx="26" cy="14" rx="3" ry="9" fill="white" opacity="0.20"/>'
  // flame overlay for Flaming Flag
        + (v.name.indexOf('Flag')>-1 ? '<ellipse cx="30" cy="16" rx="5" ry="18" fill="'+c2+'" opacity="0.55"/>'
            + '<ellipse cx="18" cy="26" rx="4" ry="14" fill="'+c2+'" opacity="0.45" transform="rotate(-18 18 26)"/>'
            + '<ellipse cx="42" cy="26" rx="4" ry="14" fill="'+c2+'" opacity="0.45" transform="rotate(18 42 26)"/>' : '')
  // World Peace red blush
        + (v.name.indexOf('Peace')>-1 ? '<ellipse cx="30" cy="28" rx="8" ry="10" fill="'+c2+'" opacity="0.40"/>'
            + '<ellipse cx="18" cy="30" rx="6" ry="9" fill="'+c2+'" opacity="0.35" transform="rotate(-18 18 30)"/>' : '');
  return s + stemAndLeaf(c3);
}

// Double / peony tulip (many layered petals, rounder fuller shape)
function drawDouble(v) {
  var c1=v.c1, c2=v.c2, c3=v.c3;
  var s = '';
  // outer ring of petals
  var angles = [-50,-20,10,40,70,100];
  for (var i=0;i<angles.length;i++) {
    s += '<ellipse cx="30" cy="26" rx="11" ry="16" fill="'+c2+'" opacity="0.7" transform="rotate('+angles[i]+' 30 26)"/>';
  }
  // mid ring
  var angles2 = [-35,0,35,70];
  for (var i=0;i<angles2.length;i++) {
    s += '<ellipse cx="30" cy="24" rx="10" ry="14" fill="'+c1+'" opacity="0.85" transform="rotate('+angles2[i]+' 30 24)"/>';
  }
  // center dome
  s += '<ellipse cx="30" cy="22" rx="9" ry="10" fill="'+c1+'"/>'
     + '<ellipse cx="27" cy="18" rx="3" ry="6" fill="white" opacity="0.18"/>';
  // orange princess purple flame tips
  if (v.name.indexOf('Orange Princess')>-1) {
    s += '<ellipse cx="30" cy="30" rx="6" ry="8" fill="'+c2+'" opacity="0.35"/>';
  }
  return s + stemAndLeaf(c3, 3);
}

// Fringed tulip (cup shape with jagged/fringe edge)
function drawFringed(v) {
  var c1=v.c1, c2=v.c2, c3=v.c3;
  // Build fringe using small spiky paths along top arc
  var s = '';
  // base petals
  s += '<ellipse cx="30" cy="24" rx="16" ry="22" fill="'+c1+'"/>'
     + '<ellipse cx="18" cy="28" rx="10" ry="17" fill="'+c1+'" transform="rotate(-20 18 28)"/>'
     + '<ellipse cx="42" cy="28" rx="10" ry="17" fill="'+c1+'" transform="rotate(20 42 28)"/>';
  // Queensland: white fringe on pink base
  var fc = (v.name.indexOf('Queensland')>-1) ? v.c2 : v.accent;
  // fringe spikes around top edge
  var fringePoints = [
    [14,10],[18,6],[22,4],[26,3],[30,2],[34,3],[38,4],[42,6],[46,10]
  ];
  for (var i=0;i<fringePoints.length;i++) {
    var fx=fringePoints[i][0], fy=fringePoints[i][1];
    s += '<line x1="'+fx+'" y1="'+(fy+4)+'" x2="'+fx+'" y2="'+fy+'" stroke="'+fc+'" stroke-width="1.5" stroke-linecap="round"/>';
    if (i%2===0) s += '<line x1="'+(fx+1)+'" y1="'+(fy+5)+'" x2="'+(fx+2)+'" y2="'+(fy+1)+'" stroke="'+fc+'" stroke-width="1" stroke-linecap="round"/>';
  }
  // Queensland inner overlay color
  if (v.name.indexOf('Queensland')>-1) {
    s += '<ellipse cx="30" cy="22" rx="12" ry="16" fill="'+v.c2+'" opacity="0.15"/>';
  }
  // Yellow Crown fringe color
  if (v.name.indexOf('Crown')>-1) {
    s += '<ellipse cx="30" cy="24" rx="10" ry="16" fill="'+c2+'" opacity="0.12"/>';
  }
  s += '<ellipse cx="27" cy="16" rx="3" ry="7" fill="white" opacity="0.18"/>';
  return s + stemAndLeaf(c3);
}

// Lily-flowering tulip (narrow waist, reflexed pointed petals)
function drawLily(v) {
  var c1=v.c1, c2=v.c2, c3=v.c3;
  // Pointed reflexed petals characteristic of lily tulips
  var s = '';
  // back pointed petals
  s += '<path d="M30 40 C22 28 14 12 20 2 C24 8 28 18 30 20 C32 18 36 8 40 2 C46 12 38 28 30 40Z" fill="'+c2+'" opacity="0.75"/>';
  // side petals with curve
  s += '<path d="M30 40 C16 32 6 20 10 6 C15 14 22 26 30 32Z" fill="'+c1+'" transform="rotate(-15 30 40)"/>'
     + '<path d="M30 40 C44 32 54 20 50 6 C45 14 38 26 30 32Z" fill="'+c1+'" transform="rotate(15 30 40)"/>';
  // front center petal
  s += '<path d="M30 40 C22 28 16 12 22 2 C25 8 28 20 30 22 C32 20 35 8 38 2 C44 12 38 28 30 40Z" fill="'+c1+'"/>';
  // Whispering Dream: ivory base with magenta tips
  if (v.name.indexOf('Whisper')>-1) {
    s += '<path d="M22 18 C24 10 28 4 30 2 C32 4 36 10 38 18 C36 14 32 10 30 12 C28 10 24 14 22 18Z" fill="'+c2+'" opacity="0.55"/>';
  }
  s += '<ellipse cx="28" cy="16" rx="2" ry="7" fill="white" opacity="0.20"/>';
  return s + stemAndLeaf(c3, 2.5);
}

// Dispatcher
function drawTulip(v) {
  if (v.type === 'double')  return drawDouble(v);
  if (v.type === 'fringed') return drawFringed(v);
  if (v.type === 'lily')    return drawLily(v);
  return drawSingle(v);
}

// Build an SVG element for a single tulip at given pixel size
window.makeTulipSVG = function(v, w, h) {
  w = w || 60; h = h || 120;
  var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 60 120');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
  svg.setAttribute('overflow','visible');
  svg.innerHTML = drawTulip(v);
  return svg;
};

// Build a launch element (wrapped svg in a span for physics)
window.makeTulipElement = function(v, sizePx) {
  sizePx = sizePx || 80;
  var w = Math.round(sizePx * 0.5);
  var h = sizePx;
  var wrap = document.createElement('span');
  wrap.style.cssText = 'display:inline-block;pointer-events:none;';
  wrap.appendChild(window.makeTulipSVG(v, w, h));
  return wrap;
};

// Build the variety grid HTML — centered last row
window.buildVarietyGrid = function(page) {
  var varieties = window.TULIP_VARIETIES[page];
  if (!varieties || !varieties.length) return '';

  var cols = 3;
  var total = varieties.length;
  var lastRowCount = total % cols;

  var html = '<div style="display:grid;grid-template-columns:repeat('+cols+',1fr);gap:14px;">';

  varieties.forEach(function(v, idx) {
    var isLastRowSolo = lastRowCount > 0 && idx >= total - lastRowCount;
    var colStart = '';
    // Center last row items
    if (isLastRowSolo && lastRowCount === 1) colStart = 'grid-column: 2;';
    else if (isLastRowSolo && lastRowCount === 2 && idx === total - lastRowCount) colStart = 'grid-column: 1; margin-left: calc(50% + 7px);';

    var svgStr = '';
    var tmpSvg = window.makeTulipSVG(v, 32, 64);
    svgStr = tmpSvg.outerHTML;

    html += #div class="tulip-card" style="'+colStart+'background:#fff;border:1.5px solid '+v.c1+'44;border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:7px;">'
          + '<div style="display:flex;align-items:center;gap:10px;">'
          + '<div style="flex-shrink:0;">'+svgStr+'</div>'
          + '<div>'
          + '<div style="font-family:\'Playfair Display\',Georgia,serif;font-style:italic;font-size:0.84rem;font-weight:700;color:#1a1a1a;line-height:1.25;">'+v.name+'</div>'
          + '<div style="margin-top:4px;display:flex;gap:5px;flex-wrap:wrap;">'
          + '<span style="font-size:0.68rem;font-weight:800;letter-spacing:0.05em;background:'+v.c1+'28;color:'+v.c2+';padding:2px 7px;border-radius:99px;border:1px solid '+v.c1+'50;">'+v.bloom+'</span>'
          + '<span style="font-size:0.68rem;font-weight:800;letter-spacing:0.05em;background:#e8f5ee;color:#2a6040;padding:2px 7px;border-radius:99px;">'+v.height+'</span>'
          + '</div>'
          + '</div></div>'
          + '<p style="font-size:0.78rem;color:#555;line-height:1.55;margin:0;">'+v.desc+'</p>'
          + '</div>';
  });

  // Fix centering for last row: if leftover, wrap in a colspan spanning full grid
  if (lastRowCount > 0) {
    // rebuild just the last row items centered
    html = '<div style="display:grid;grid-template-columns:repeat('+cols+',1fr);gap:14px;">';
    var mainRows = varieties.slice(0, total - lastRowCount);
    var lastRow  = varieties.slice(total - lastRowCount);

    mainRows.forEach(function(v) {
      var svgStr = window.makeTulipSVG(v, 32, 64).outerHTML;
      html += '<div class="tulip-card" style="background:#fff;border:1.5px solid '+v.c1+'44;border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:7px;">'
            + '<div style="display:flex;align-items:center;gap:10px;">'
            + '<div style="flex-shrink:0;">'+svgStr+'</div>'
            + '<div>'
            + '<div style="font-family:\'Playfair Display\',Georgia,serif;font-style:italic;font-size:0.84rem;font-weight:700;color:#1a1a1a;line-height:1.25;">'+v.name+'</div>'
            + '<div style="margin-top:4px;display:flex;gap:5px;flex-wrap:wrap;">'
            + '<span style="font-size:0.68rem;font-weight:800;letter-spacing:0.05em;background:'+v.c1+'28;color:'+v.c2+';padding:2px 7px;border-radius:99px;border:1px solid '+v.c1+'50;">'+v.bloom+'</span>'
            + '<span style="font-size:0.68rem;font-weight:800;letter-spacing:0.05em;background:#e8f5ee;color:#2a6040;padding:2px 7px;border-radius:99px;">'+v.height+'</span>'
            + '</div>'
            + '</div></div>'
            + '<p style="font-size:0.78rem;color:#555;line-height:1.55;margin:0;">'+v.desc+'</p>'
            + '</div>';
    });

    if (lastRow.length > 0) {
      // centered wrapper spanning full 3 cols
      html += '<div style="grid-column:1/-1;display:flex;justify-content:center;gap:14px;">';
      lastRow.forEach(function(v) {
        var svgStr = window.makeTulipSVG(v, 32, 64).outerHTML;
        html += '<div class="tulip-card" style="width:calc((100% - '+((cols-1)*14)+'px) / '+cols+');background:#fff;border:1.5px solid '+v.c1+'44;border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:7px;">'
              + '<div style="display:flex;align-items:center;gap:10px;">'
              + '<div style="flex-shrink:0;">'+svgStr+'</div>'
              + '<div>'
              + '<div style="font-family:\'Playfair Display\',Georgia,serif;font-style:italic;font-size:0.84rem;font-weight:700;color:#1a1a1a;line-height:1.25;">'+v.name+'</div>'
              + '<div style="margin-top:4px;display:flex;gap:5px;flex-wrap:wrap;">'
              + '<span style="font-size:0.68rem;font-weight:800;letter-spacing:0.05em;background:'+v.c1+'28;color:'+v.c2+';padding:2px 7px;border-radius:99px;border:1px solid '+v.c1+'50;">'+v.bloom+'</span>'
              + '<span style="font-size:0.68rem;font-weight:800;letter-spacing:0.05em;background:#e8f5ee;color:#2a6040;padding:2px 7px;border-radius:99px;">'+v.height+'</span>'
              + '</div>'
              + '</div></div>'
              + '<p style="font-size:0.78rem;color:#555;line-height:1.55;margin:0;">'+v.desc+'</p>'
              + '</div>';
      });
      html += '</div>';
    }

    html += '</div>';
  }

  return html;
};
