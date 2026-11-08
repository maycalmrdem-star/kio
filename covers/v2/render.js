// Renders #front, #spine and #back of each v2 cover to out/<name>-front|spine|back.png,
// then builds the flat print wrap (front | spine | back, as an Arabic book opens) with wrap.py.
// Usage: node render.js [file.html ...]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const files = process.argv.slice(2).length ? process.argv.slice(2)
    : fs.readdirSync(__dirname).filter(f => /^[a-z]-.*\.html$/.test(f));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 2800, height: 1900 } });
  for (const f of files) {
    const name = path.basename(f, '.html');
    await page.goto('file://' + path.resolve(__dirname, f));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    for (const side of ['front', 'spine', 'back'])
      await page.locator('#' + side).screenshot({ path: path.join(__dirname, 'out', `${name}-${side}.png`) });
    console.log(name);
  }
  await browser.close();
})();
