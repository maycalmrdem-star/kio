const { chromium } = require('playwright');
const dir = process.argv[2];
(async () => {
  require('fs').mkdirSync(dir + '/out', { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 5400, height: 1350 } });
  await p.goto('file://' + dir + '/versions.html');
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
  for (let i = 0; i < 5; i++) await p.screenshot({ path: `${dir}/out/version-${i + 1}.png`, clip: { x: i * 1080, y: 0, width: 1080, height: 1350 } });
  await b.close();
})();
