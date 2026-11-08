const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [scale, name] of [[1,'riyad_31mh_post.png'],[2,'riyad_31mh_post@2x.png']]) {
    const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: scale });
    await p.goto('file://' + process.argv[2]);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(600);
    await p.screenshot({ path: process.argv[3] + '/' + name });
  }
  await b.close();
})();
