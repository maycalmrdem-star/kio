// Small SVG ornament helpers shared by the cover designs.
var ORN = {
  // star polygon with n points
  star: function(cx, cy, R, r, n, rot){
    var p = [], a0 = (rot || -90) * Math.PI / 180;
    for (var i = 0; i < 2 * n; i++){
      var a = a0 + i * Math.PI / n, rr = i % 2 ? r : R;
      p.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1));
    }
    return p.join(' ');
  },
  // 8-point star made of two squares
  oct: function(cx, cy, s, fill, stroke, sw){
    var h = s / 2, a = 'x="'+(cx-h)+'" y="'+(cy-h)+'" width="'+s+'" height="'+s+'"';
    var st = 'fill="'+fill+'" stroke="'+(stroke||'none')+'" stroke-width="'+(sw||0)+'"';
    return '<rect '+a+' '+st+'/><rect '+a+' '+st+' transform="rotate(45 '+cx+' '+cy+')"/>';
  },
  // shamsa: scalloped gold medallion
  shamsa: function(cx, cy, R, gold, dark, light){
    var s = '<polygon points="'+ORN.star(cx, cy, R, R*0.86, 24)+'" fill="'+gold+'"/>';
    s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R*0.8+'" fill="'+dark+'"/>';
    s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R*0.74+'" fill="none" stroke="'+gold+'" stroke-width="'+R*0.015+'"/>';
    s += '<polygon points="'+ORN.star(cx, cy, R*0.7, R*0.5, 8, -90)+'" fill="none" stroke="'+gold+'" stroke-width="'+R*0.02+'"/>';
    s += '<polygon points="'+ORN.star(cx, cy, R*0.7, R*0.5, 8, -67.5)+'" fill="none" stroke="'+gold+'" stroke-width="'+R*0.02+'" opacity=".6"/>';
    s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R*0.46+'" fill="'+(light||dark)+'" stroke="'+gold+'" stroke-width="'+R*0.02+'"/>';
    return s;
  },
  // rosette line art (concentric star polygons)
  rosette: function(cx, cy, R, color, sw){
    var s = '';
    for (var k = 0; k < 5; k++){
      var rr = R * (1 - k * 0.18);
      s += '<polygon points="'+ORN.star(cx, cy, rr, rr*0.72, 16, -90 + k*11.25)+'" fill="none" stroke="'+color+'" stroke-width="'+sw+'"/>';
      s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+rr*0.72+'" fill="none" stroke="'+color+'" stroke-width="'+sw*0.6+'" opacity=".6"/>';
    }
    return s + ORN.oct(cx, cy, R*0.16, 'none', color, sw);
  },
  // tiled 8-point star pattern
  pattern: function(id, size, color, sw){
    var h = size / 2, q = size * 0.21;
    return '<pattern id="'+id+'" width="'+size+'" height="'+size+'" patternUnits="userSpaceOnUse"><g fill="none" stroke="'+color+'" stroke-width="'+sw+'">'+
      '<rect x="'+(h-q)+'" y="'+(h-q)+'" width="'+2*q+'" height="'+2*q+'"/>'+
      '<rect x="'+(h-q)+'" y="'+(h-q)+'" width="'+2*q+'" height="'+2*q+'" transform="rotate(45 '+h+' '+h+')"/>'+
      '<circle cx="'+h+'" cy="'+h+'" r="'+q*0.5+'"/><path d="M0 0 L'+(h-q*1.41)+' '+(h-q*1.41)+' M'+size+' 0 L'+(h+q*1.41)+' '+(h-q*1.41)+' M0 '+size+' L'+(h-q*1.41)+' '+(h+q*1.41)+' M'+size+' '+size+' L'+(h+q*1.41)+' '+(h+q*1.41)+'"/></g></pattern>';
  },
  // Quran on a stand (same icon as the lesson posters)
  quran: function(x, y, w, navy, gold, page){
    var k = w / 150;
    return '<g transform="translate('+x+' '+y+') scale('+k+')">'+
      '<path d="M8 48 Q40 36 73 48 V100 Q40 90 8 100 Z" fill="'+(page||'#fff')+'" stroke="'+navy+'" stroke-width="7" stroke-linejoin="round"/>'+
      '<path d="M142 48 Q110 36 77 48 V100 Q110 90 142 100 Z" fill="'+(page||'#fff')+'" stroke="'+navy+'" stroke-width="7" stroke-linejoin="round"/>'+
      '<g stroke="'+gold+'" stroke-width="3.2" stroke-linecap="round"><path d="M20 60 Q40 54 62 60 M20 72 Q40 66 62 72 M20 84 Q40 78 62 84 M130 60 Q110 54 88 60 M130 72 Q110 66 88 72 M130 84 Q110 78 88 84"/></g>'+
      '<path d="M4 100 Q40 88 75 102 Q110 88 146 100 V106 Q110 96 75 110 Q40 96 4 106 Z" fill="'+navy+'"/>'+
      '<g stroke="'+gold+'" stroke-width="9" stroke-linecap="round"><line x1="30" y1="104" x2="120" y2="126"/><line x1="120" y1="104" x2="30" y2="126"/></g></g>';
  },
  // divider: line - diamond - line
  divider: function(cx, y, w, color){
    return '<g stroke="'+color+'" stroke-width="2"><line x1="'+(cx-w/2)+'" y1="'+y+'" x2="'+(cx-22)+'" y2="'+y+'"/><line x1="'+(cx+22)+'" y1="'+y+'" x2="'+(cx+w/2)+'" y2="'+y+'"/></g>'+
      ORN.oct(cx, y, 18, color) + '<circle cx="'+(cx-w/2)+'" cy="'+y+'" r="4" fill="'+color+'"/><circle cx="'+(cx+w/2)+'" cy="'+y+'" r="4" fill="'+color+'"/>';
  },
  // pointed mihrab arch: two circular arcs meeting at the apex
  arch: function(x, y, w, h, peak){
    var r = x + w, mid = x + w / 2, sh = y + peak, R = (w * w / 4 + peak * peak) / (2 * peak) * 1.35;
    return 'M'+x+' '+(y+h)+' V'+sh+' A'+R+' '+R+' 0 0 1 '+mid+' '+y+' A'+R+' '+R+' 0 0 1 '+r+' '+sh+' V'+(y+h)+' Z';
  }
};
