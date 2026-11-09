const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const dir = process.argv[2], mode = process.argv[3] || 'preview';
(async () => {
  const TL = JSON.parse(fs.readFileSync(path.join(dir, 'timeline.json')));
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.addInitScript(tl => { window.TL = tl; }, TL);
  await p.goto('file://' + path.join(dir, 'reel.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => Promise.all([...document.querySelectorAll('video')].map(v => v.readyState >= 2 ? 0 : new Promise(r => v.addEventListener('loadeddata', r, { once: true })))));
  if (mode === 'preview') {
    const times = (process.argv[4] || '').split(',').map(Number);
    fs.mkdirSync(path.join(dir, 'preview'), { recursive: true });
    for (const t of times) { await p.evaluate(t => window.renderAt(t), t); await p.screenshot({ path: path.join(dir, 'preview', `t${t.toFixed(1)}.jpg`), type: 'jpeg', quality: 80 }); }
  } else {
    const fps = 30, n = Math.ceil(TL.total * fps), out = path.join(dir, 'frames');
    fs.mkdirSync(out, { recursive: true });
    for (let f = 0; f < n; f++) {
      await p.evaluate(t => window.renderAt(t), f / fps);
      await p.screenshot({ path: path.join(out, String(f).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 88 });
      if (f % 300 === 0) console.log('frame', f, '/', n);
    }
  }
  await b.close();
})();
