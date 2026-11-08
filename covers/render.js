// Renders #front and #back of each cover HTML to out/<name>-front.png / -back.png
// and a side-by-side preview out/<name>-preview.png (back on the left, front on the right).
// Usage: node render.js [file.html ...]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const files = process.argv.slice(2).length ? process.argv.slice(2)
    : fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 2700, height: 1900 } });
  for (const f of files) {
    const name = path.basename(f, '.html');
    await page.goto('file://' + path.resolve(__dirname, f));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    for (const side of ['front', 'back'])
      await page.locator('#' + side).screenshot({ path: path.join(__dirname, 'out', `${name}-${side}.png`) });
    await page.screenshot({ path: path.join(__dirname, 'out', `${name}-preview.png`), fullPage: true });
    console.log(name);
  }
  await browser.close();
})();
