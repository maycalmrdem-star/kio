const { chromium } = require('playwright');
const dir = process.argv[2], scale = +(process.argv[3] || 1), out = process.argv[4] || dir + '/out';
(async () => {
  require('fs').mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 7560, height: 1350 }, deviceScaleFactor: scale });
  await p.goto('file://' + dir + '/carousel.html');
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(800);
  for (let i = 0; i < 7; i++)
    await p.screenshot({ path: `${out}/slide-${i + 1}${scale > 1 ? '@2x' : ''}.png`, clip: { x: i * 1080, y: 0, width: 1080, height: 1350 } });
  if (scale === 1) await p.screenshot({ path: `${out}/strip.png` });
  await b.close();
})();
