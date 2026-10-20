// Injects the shared poster header and footer. Title comes from <body data-title="line 1|line 2">.
(function(){
  var GOLD='#e0a82e', NAVY='#17306a';

  // 8-point star used as a small gold ornament
  function star(fill, stroke){
    return '<svg class="star" viewBox="0 0 20 20"><g fill="'+fill+'" stroke="'+(stroke||fill)+'" stroke-width="1">'+
      '<rect x="4" y="4" width="12" height="12"/><rect x="4" y="4" width="12" height="12" transform="rotate(45 10 10)"/></g>'+
      '<circle cx="10" cy="10" r="2.6" fill="'+(stroke?stroke:'#fff')+'"/></svg>';
  }
  function bookIcon(w, c){
    return '<svg width="'+w+'" viewBox="0 0 64 40"><g fill="'+c+'">'+
      '<path d="M2 4 Q16 0 30 5 V38 Q16 33 2 37 Z"/><path d="M62 4 Q48 0 34 5 V38 Q48 33 62 37 Z"/></g>'+
      '<g stroke="'+NAVY+'" stroke-width="2.4" stroke-linecap="round" opacity=".75">'+
      '<path d="M8 12 Q16 10 25 13 M8 19 Q16 17 25 20 M8 26 Q16 24 25 27 M56 12 Q48 10 39 13 M56 19 Q48 17 39 20 M56 26 Q48 24 39 27"/></g></svg>';
  }
  function crescent(size, c){
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 40 40"><path fill="'+c+'" d="M26 4 A17 17 0 1 0 26 36 A13.5 13.5 0 1 1 26 4 Z"/></svg>';
  }

  var mosque =
    '<g fill="'+NAVY+'">'+
    // minarets
    '<rect x="622" y="120" width="20" height="100"/><rect x="616" y="140" width="32" height="8"/><path d="M622 120 L632 92 L642 120 Z"/>'+
    '<rect x="858" y="120" width="20" height="100"/><rect x="852" y="140" width="32" height="8"/><path d="M858 120 L868 92 L878 120 Z"/>'+
    '<line x1="632" y1="92" x2="632" y2="80" stroke="'+NAVY+'" stroke-width="3"/><line x1="868" y1="92" x2="868" y2="80" stroke="'+NAVY+'" stroke-width="3"/>'+
    // side domes
    '<path d="M654 186 Q654 158 680 151 Q706 158 706 186 Z"/><path d="M794 186 Q794 158 820 151 Q846 158 846 186 Z"/>'+
    // central dome
    '<path d="M702 172 Q702 114 750 104 Q798 114 798 172 Z"/><line x1="750" y1="104" x2="750" y2="90" stroke="'+NAVY+'" stroke-width="3"/>'+
    // body
    '<rect x="650" y="184" width="200" height="36"/></g>'+
    '<path d="M744 88 a7 7 0 1 0 8 -8 a5.5 5.5 0 1 1 -8 8z" fill="'+GOLD+'"/>'+
    '<g fill="#f8f6ef"><path d="M668 216 v-18 a6 6 0 0 1 12 0 v18z"/><path d="M700 216 v-18 a6 6 0 0 1 12 0 v18z"/><path d="M788 216 v-18 a6 6 0 0 1 12 0 v18z"/><path d="M820 216 v-18 a6 6 0 0 1 12 0 v18z"/>'+
    '<rect x="628" y="160" width="8" height="14" rx="4"/><rect x="864" y="160" width="8" height="14" rx="4"/></g>'+
    '<path d="M737 220 v-20 a13 13 0 0 1 26 0 v20z" fill="#f7e2a6" stroke="'+GOLD+'" stroke-width="3"/>';

  var deco =
    '<svg class="deco" viewBox="0 0 1500 420">'+
    '<path d="M0 0 H470 V232 H360 Q160 200 0 260 Z" fill="'+NAVY+'"/>'+
    '<path d="M1500 0 H1030 V232 H1140 Q1340 200 1500 260 Z" fill="'+NAVY+'"/>'+
    '<path d="M0 238 Q170 180 360 210 H470" fill="none" stroke="'+GOLD+'" stroke-width="3"/>'+
    '<path d="M1500 238 Q1330 180 1140 210 H1030" fill="none" stroke="'+GOLD+'" stroke-width="3"/>'+
    '<path d="M0 252 Q170 200 330 226" fill="none" stroke="'+GOLD+'" stroke-width="1.5" opacity=".7"/>'+
    '<path d="M1500 252 Q1330 200 1170 226" fill="none" stroke="'+GOLD+'" stroke-width="1.5" opacity=".7"/>'+
    '<path d="M1030 60 Q1200 70 1300 0" fill="none" stroke="'+GOLD+'" stroke-width="2" opacity=".55"/>'+
    '<path d="M470 60 Q300 70 200 0" fill="none" stroke="'+GOLD+'" stroke-width="2" opacity=".55"/>'+
    mosque+
    // crescents and dots around the mosque
    '<path d="M528 104 a32 32 0 1 0 0 52 a25 25 0 1 1 0 -52z" fill="'+GOLD+'"/>'+
    '<path d="M972 104 a32 32 0 1 1 0 52 a25 25 0 1 0 0 -52z" fill="'+GOLD+'"/>'+
    '<g fill="'+GOLD+'"><circle cx="560" cy="96" r="4"/><circle cx="580" cy="160" r="3"/><circle cx="515" cy="186" r="3"/><circle cx="940" cy="96" r="4"/><circle cx="920" cy="160" r="3"/><circle cx="985" cy="186" r="3"/></g>'+
    '</svg>';

  var bannerSvg =
    '<svg viewBox="0 0 870 170" preserveAspectRatio="none">'+
    '<polygon points="0,85 62,0 808,0 870,85 808,170 62,170" fill="'+NAVY+'"/>'+
    '<polygon points="16,85 70,12 800,12 854,85 800,158 70,158" fill="none" stroke="'+GOLD+'" stroke-width="3"/>'+
    '<polygon points="26,85 76,20 794,20 844,85 794,150 76,150" fill="none" stroke="'+GOLD+'" stroke-width="1" opacity=".55"/>'+
    '<g transform="translate(60 70)"><g fill="'+GOLD+'"><rect x="2" y="2" width="26" height="26"/><rect x="2" y="2" width="26" height="26" transform="rotate(45 15 15)"/></g><circle cx="15" cy="15" r="6" fill="'+NAVY+'"/></g>'+
    '<g transform="translate(780 70)"><g fill="'+GOLD+'"><rect x="2" y="2" width="26" height="26"/><rect x="2" y="2" width="26" height="26" transform="rotate(45 15 15)"/></g><circle cx="15" cy="15" r="6" fill="'+NAVY+'"/></g>'+
    '</svg>';

  var quran =
    '<svg width="150" viewBox="0 0 150 130">'+
    '<path d="M108 14 a12 12 0 1 0 6 22 a9 9 0 1 1 -6 -22z" fill="'+GOLD+'"/><circle cx="124" cy="18" r="3" fill="'+GOLD+'"/>'+
    '<path d="M8 48 Q40 36 73 48 V100 Q40 90 8 100 Z" fill="#fff" stroke="'+NAVY+'" stroke-width="7" stroke-linejoin="round"/>'+
    '<path d="M142 48 Q110 36 77 48 V100 Q110 90 142 100 Z" fill="#fff" stroke="'+NAVY+'" stroke-width="7" stroke-linejoin="round"/>'+
    '<g stroke="'+GOLD+'" stroke-width="3.2" stroke-linecap="round"><path d="M20 60 Q40 54 62 60 M20 72 Q40 66 62 72 M20 84 Q40 78 62 84 M130 60 Q110 54 88 60 M130 72 Q110 66 88 72 M130 84 Q110 78 88 84"/></g>'+
    '<path d="M4 100 Q40 88 75 102 Q110 88 146 100 V106 Q110 96 75 110 Q40 96 4 106 Z" fill="'+NAVY+'"/>'+
    '<g stroke="#9a6a14" stroke-width="9" stroke-linecap="round"><line x1="30" y1="104" x2="120" y2="126"/><line x1="120" y1="104" x2="30" y2="126"/></g>'+
    '</svg>';

  var title = (document.body.dataset.title || '').split('|');

  var header =
    '<header class="hd">'+deco+
    '<div class="basmala"><i>'+star(GOLD, '#fff6dc')+'</i>بسم الله الرحمن الرحيم<i>'+star(GOLD, '#fff6dc')+'</i></div>'+
    '<div class="badge teacher"><div><span class="t1">الأستاذ</span><span class="t2">إبراهيم</span>'+bookIcon(56, GOLD)+'</div></div>'+
    '<div class="badge book">'+quran+'</div>'+
    '<div class="banner">'+bannerSvg+'<h1>'+title.map(function(t){return '<span>'+t+'</span>';}).join('')+'</h1></div>'+
    '</header>';

  var footer =
    '<footer class="ft">'+
    '<div class="wish">بالتوفيق إن شاء الله</div>'+
    '<div class="who">'+star(GOLD, '#0f2253')+'الأستاذ إبراهيم'+star(GOLD, '#0f2253')+'</div>'+
    '<div class="icons">'+bookIcon(78, GOLD)+crescent(44, GOLD)+'</div>'+
    '</footer>';

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  // gold star dots inside tabs and keyword pills
  document.querySelectorAll('.tab, .pill span').forEach(function(el){
    el.insertAdjacentHTML('afterbegin', star(GOLD, el.classList.contains('tab') ? NAVY : '#fdf2d3'));
  });
})();
