const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const dir = process.argv[2], out = process.argv[3];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto('file://' + dir + '/post.html');
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  const n = await p.$$eval('.s', els => els.map(e => e.dataset.out));
  await p.setViewportSize({ width: 1080 * n.length, height: 1350 });
  await p.waitForTimeout(300);
  for (let i = 0; i < n.length; i++) {
    const f = path.join(out, n[i] + '.png'); fs.mkdirSync(path.dirname(f), { recursive: true });
    await p.screenshot({ path: f, clip: { x: i * 1080, y: 0, width: 1080, height: 1350 } });
  }
  await b.close();
})();
