// Renders the 3D mockup scene for each cover: out/<name>-mockup.png
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const names = process.argv.slice(2).length ? process.argv.slice(2) : ['a-teal', 'b-calligraphy', 'c-royal'];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 2400, height: 1500 } });
  for (const n of names) {
    await page.goto('file://' + path.resolve(__dirname, 'mockup.html') + '?c=' + n);
    await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth));
    await page.waitForTimeout(200);
    await page.locator('#scene').screenshot({ path: path.join(__dirname, 'out', n + '-mockup.png') });
    console.log(n);
  }
  await browser.close();
})();
