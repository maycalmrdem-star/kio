// Shared SVG building blocks for the v2 covers: textures, gold foil, arabesque bands, ornaments.
var V2 = {
  defs: function(o){
    o = o || {};
    return '<defs>'+
      // fine paper grain
      '<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="'+(o.grain||0.85)+'" numOctaves="3" seed="7"/>'+
      '<feColorMatrix values="0 0 0 0 '+(o.gr||0.3)+'  0 0 0 0 '+(o.gg||0.24)+'  0 0 0 0 '+(o.gb||0.15)+'  0 0 0 '+(o.ga||0.16)+' 0"/></filter>'+
      // soft mottling (paper fibres / leather)
      '<filter id="mottle" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="'+(o.mot||0.006)+'" numOctaves="4" seed="3"/>'+
      '<feColorMatrix values="0 0 0 0 '+(o.mr||0.3)+'  0 0 0 0 '+(o.mg||0.24)+'  0 0 0 0 '+(o.mb||0.15)+'  0 0 0 '+(o.ma||0.22)+' 0"/></filter>'+
      // leather pebble
      '<filter id="leather" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.35" numOctaves="2" seed="11"/>'+
      '<feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"/></filter>'+
      '<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a5414"/><stop offset=".2" stop-color="#c8962e"/>'+
      '<stop offset=".4" stop-color="#f7dd8c"/><stop offset=".5" stop-color="#fff3c4"/><stop offset=".62" stop-color="#d9aa45"/>'+
      '<stop offset=".8" stop-color="#f2cf72"/><stop offset="1" stop-color="#8a6018"/></linearGradient>'+
      '<linearGradient id="goldV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6018"/><stop offset=".3" stop-color="#f2cf72"/>'+
      '<stop offset=".5" stop-color="#fff3c4"/><stop offset=".7" stop-color="#d9aa45"/><stop offset="1" stop-color="#7a5414"/></linearGradient>'+
      '<filter id="emboss"><feDropShadow dx="0" dy="2" stdDeviation="1.2" flood-color="#000" flood-opacity=".55"/></filter>'+
      '<filter id="deboss"><feDropShadow dx="0" dy="-1.5" stdDeviation="1" flood-color="#000" flood-opacity=".55"/><feDropShadow dx="0" dy="1.5" stdDeviation=".8" flood-color="#fff" flood-opacity=".12"/></filter>'+
      // interlaced arabesque tile (overlapping circles + star)
      '<pattern id="arab" width="56" height="56" patternUnits="userSpaceOnUse"><g fill="none" stroke="url(#gold)" stroke-width="1.8">'+
      '<circle cx="0" cy="0" r="28"/><circle cx="56" cy="0" r="28"/><circle cx="0" cy="56" r="28"/><circle cx="56" cy="56" r="28"/><circle cx="28" cy="28" r="28"/>'+
      '<circle cx="28" cy="28" r="9"/></g><g fill="url(#gold)">'+V2.oct8(28,28,7)+'</g></pattern>'+
      (o.extra||'')+
      '</defs>';
  },
  oct8: function(cx, cy, s){
    var h = s/2;
    return '<rect x="'+(cx-h)+'" y="'+(cy-h)+'" width="'+s+'" height="'+s+'"/><rect x="'+(cx-h)+'" y="'+(cy-h)+'" width="'+s+'" height="'+s+'" transform="rotate(45 '+cx+' '+cy+')"/>';
  },
  texture: function(w, h, kind){
    var s = '<rect width="'+w+'" height="'+h+'" filter="url(#mottle)"/><rect width="'+w+'" height="'+h+'" filter="url(#grain)"/>';
    if (kind === 'leather') s += '<rect width="'+w+'" height="'+h+'" filter="url(#leather)"/>';
    return s;
  },
  vignette: function(w, h, a){
    return '<radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="'+a+'"/></radialGradient>'+
      '<rect width="'+w+'" height="'+h+'" fill="url(#vig)"/>';
  },
  // vertical ornamental band: arabesque fill between double gold rules
  bandV: function(x, y, w, h){
    return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="rgba(0,0,0,.18)"/>'+
      '<rect x="'+(x+10)+'" y="'+y+'" width="'+(w-20)+'" height="'+h+'" fill="url(#arab)" filter="url(#emboss)"/>'+
      '<g fill="url(#goldV)" filter="url(#emboss)"><rect x="'+x+'" y="'+y+'" width="4" height="'+h+'"/><rect x="'+(x+w-4)+'" y="'+y+'" width="4" height="'+h+'"/>'+
      '<rect x="'+(x+7)+'" y="'+y+'" width="1.5" height="'+h+'"/><rect x="'+(x+w-8.5)+'" y="'+y+'" width="1.5" height="'+h+'"/></g>';
  },
  bandH: function(x, y, w, h){
    return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="rgba(0,0,0,.2)"/>'+
      '<rect x="'+x+'" y="'+(y+12)+'" width="'+w+'" height="'+(h-24)+'" fill="url(#arab)" filter="url(#emboss)"/>'+
      '<g fill="url(#gold)" filter="url(#emboss)"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="5"/><rect x="'+x+'" y="'+(y+h-5)+'" width="'+w+'" height="5"/>'+
      '<rect x="'+x+'" y="'+(y+9)+'" width="'+w+'" height="1.5"/><rect x="'+x+'" y="'+(y+h-10.5)+'" width="'+w+'" height="1.5"/></g>';
  },
  star: function(cx, cy, R, r, n, rot){
    var p = [], a0 = (rot == null ? -90 : rot) * Math.PI / 180;
    for (var i = 0; i < 2*n; i++){ var a = a0 + i*Math.PI/n, rr = i%2 ? r : R; p.push((cx+rr*Math.cos(a)).toFixed(1)+','+(cy+rr*Math.sin(a)).toFixed(1)); }
    return p.join(' ');
  },
  // gold medallion (shamsa) with foil gradient
  shamsa: function(cx, cy, R, inner){
    var g = 'url(#gold)';
    var s = '<g filter="url(#emboss)">';
    s += '<polygon points="'+V2.star(cx,cy,R,R*0.88,32)+'" fill="'+g+'"/>';
    s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R*0.84+'" fill="'+inner+'"/>';
    s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R*0.78+'" fill="none" stroke="'+g+'" stroke-width="'+R*0.02+'"/>';
    for (var k = 0; k < 2; k++) s += '<polygon points="'+V2.star(cx,cy,R*0.74,R*0.52,8,-90+k*22.5)+'" fill="none" stroke="'+g+'" stroke-width="'+R*0.022+'"/>';
    s += '<polygon points="'+V2.star(cx,cy,R*0.42,R*0.3,8,-90)+'" fill="'+g+'"/>';
    s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R*0.13+'" fill="'+inner+'"/></g>';
    return s;
  },
  rosette: function(cx, cy, R, stroke, sw, op){
    var s = '<g fill="none" stroke="'+stroke+'" stroke-width="'+sw+'" opacity="'+(op||1)+'">';
    for (var k = 0; k < 5; k++){ var rr = R*(1-k*0.18);
      s += '<polygon points="'+V2.star(cx,cy,rr,rr*0.72,16,-90+k*11.25)+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+rr*0.72+'" stroke-width="'+sw*0.5+'"/>'; }
    return s + '</g>';
  },
  divider: function(cx, y, w, fill){
    fill = fill || 'url(#gold)';
    return '<g fill="'+fill+'" filter="url(#emboss)"><rect x="'+(cx-w/2)+'" y="'+(y-1.5)+'" width="'+(w/2-26)+'" height="3"/><rect x="'+(cx+26)+'" y="'+(y-1.5)+'" width="'+(w/2-26)+'" height="3"/>'+
      V2.oct8(cx, y, 20)+'<circle cx="'+(cx-w/2)+'" cy="'+y+'" r="4.5"/><circle cx="'+(cx+w/2)+'" cy="'+y+'" r="4.5"/>'+
      '<rect x="'+(cx-38)+'" y="'+(y-4)+'" width="8" height="8" transform="rotate(45 '+(cx-34)+' '+y+')"/><rect x="'+(cx+30)+'" y="'+(y-4)+'" width="8" height="8" transform="rotate(45 '+(cx+34)+' '+y+')"/></g>';
  },
  // tone-on-tone lattice of 8-point stars
  lattice: function(id, size, stroke, sw){
    var h = size/2, q = size*0.22;
    return '<pattern id="'+id+'" width="'+size+'" height="'+size+'" patternUnits="userSpaceOnUse"><g fill="none" stroke="'+stroke+'" stroke-width="'+sw+'">'+
      '<rect x="'+(h-q)+'" y="'+(h-q)+'" width="'+2*q+'" height="'+2*q+'"/><rect x="'+(h-q)+'" y="'+(h-q)+'" width="'+2*q+'" height="'+2*q+'" transform="rotate(45 '+h+' '+h+')"/>'+
      '<path d="M0 '+h+' H'+(h-q*1.3)+' M'+(h+q*1.3)+' '+h+' H'+size+' M'+h+' 0 V'+(h-q*1.3)+' M'+h+' '+(h+q*1.3)+' V'+size+'"/>'+
      '<path d="M0 0 L'+(h-q)+' '+(h-q)+' M'+size+' 0 L'+(h+q)+' '+(h-q)+' M0 '+size+' L'+(h-q)+' '+(h+q)+' M'+size+' '+size+' L'+(h+q)+' '+(h+q)+'"/></g></pattern>';
  }
};
