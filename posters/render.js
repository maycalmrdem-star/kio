// Renders each poster HTML in this folder to out/<name>.png
// Usage: node render.js [file.html ...]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const files = process.argv.slice(2).length ? process.argv.slice(2)
    : fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 2000 } });
  for (const f of files) {
    await page.goto('file://' + path.resolve(__dirname, f));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const out = path.join(__dirname, 'out', path.basename(f, '.html') + '.png');
    await page.screenshot({ path: out, fullPage: true });
    console.log(out, await page.evaluate(() => document.body.scrollHeight));
  }
  await browser.close();
})();
