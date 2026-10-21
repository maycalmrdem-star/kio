// Splits a poster into (1) a background PNG with all text hidden and (2) a JSON list of
// text blocks with position and styled runs, for building an editable PPTX (see build_pptx.py).
// Usage: node extract.js file.html
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

const BLOCKS = [
  '.basmala', '.badge .t1', '.badge .t2', '.banner h1 > span', '.tab', '.def > p', '.def > .ref',
  '.def.cmp thead th', '.def.cmp tbody th', '.def.cmp td > span', '.task span', '.col > h2',
  '.item', '.sub', '.pill span', '.kw:not(.multi)', '.kw .ln', '.ex .lbl', '.ex p', '.ex > .ref',
  '.chips span', '.tiles span', '.sq', '.qr > div', '.qn', '.qr li', '.chain span', '.chain em',
  '.ft .who', '.ft .wish'
].join(',');

(async () => {
  const f = process.argv[2];
  const name = path.basename(f, '.html');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 2000 } });
  await page.goto('file://' + path.resolve(__dirname, f));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  const data = await page.evaluate((BLOCKS) => {
    const blocks = [...document.querySelectorAll(BLOCKS)];
    const isBlock = el => blocks.includes(el);
    const hex = c => { const m = c.match(/\d+(\.\d+)?/g); return m ? m.slice(0,3).map(v => (+v).toString(16).padStart(2,'0')).join('') : '000000'; };
    const style = el => { const s = getComputedStyle(el); return {
      color: hex(s.color), size: parseFloat(s.fontSize), weight: parseInt(s.fontWeight),
      font: s.fontFamily.split(',')[0].replace(/['"]/g,'').trim() }; };
    const pseudo = (el, which) => {
      const s = getComputedStyle(el, which); let c = s.content;
      if (!c || c === 'none' || c === 'normal') return null;
      c = c.replace(/^"|"$/g, ''); if (!c) return null;
      if (getComputedStyle(el).display.includes('flex')) c = which === '::before' ? c + ' ' : ' ' + c;
      return { pseudo: true, text: c, color: hex(s.color), size: parseFloat(s.fontSize), weight: parseInt(s.fontWeight),
               font: s.fontFamily.split(',')[0].replace(/['"]/g,'').trim() };
    };
    const out = [];
    for (const b of blocks) {
      const runs = [], nodes = [];
      const walk = el => {
        const pb = pseudo(el, '::before'); if (pb) runs.push(pb);
        for (const n of el.childNodes) {
          if (n.nodeType === 3) {
            const t = n.textContent.replace(/\s+/g, ' ');
            if (t.trim() || runs.length) { runs.push({ text: t, ...style(el) }); nodes.push(n); }
          } else if (n.nodeType === 1) {
            if (n.tagName === 'BR') runs.push({ text: '\n' });
            else if (n.tagName === 'svg' || isBlock(n) || n.tagName === 'UL') continue;
            else walk(n);
          }
        }
        const pa = pseudo(el, '::after'); if (pa) runs.push(pa);
      };
      walk(b);
      if (!nodes.length) continue;
      // bounds of the actual text
      let x1 = 1e9, y1 = 1e9, x2 = -1e9, y2 = -1e9; const rects = [];
      for (const n of nodes) {
        const r = document.createRange(); r.selectNodeContents(n);
        for (const q of r.getClientRects()) { if (!q.width) continue; rects.push(q);
          x1 = Math.min(x1, q.left); y1 = Math.min(y1, q.top); x2 = Math.max(x2, q.right); y2 = Math.max(y2, q.bottom); }
      }
      // right edge of the first line (later lines may start further right, under a bullet)
      const firstRight = Math.max(...rects.filter(q => q.top < y1 + 4).map(q => q.right));
      // include pseudo-element glyphs: extend to the block's content box horizontally
      const br = b.getBoundingClientRect(), bs = getComputedStyle(b);
      const cx1 = br.left + parseFloat(bs.paddingLeft) + parseFloat(bs.borderLeftWidth);
      const cx2 = br.right - parseFloat(bs.paddingRight) - parseFloat(bs.borderRightWidth);
      const lh = bs.lineHeight === 'normal' ? parseFloat(bs.fontSize) * 1.2 : parseFloat(bs.lineHeight);
      const lines = Math.max(1, Math.round((y2 - y1) / lh));
      const ta = bs.textAlign;
      const centered = ta === 'center' || bs.justifyContent === 'center' || getComputedStyle(b.parentElement).justifyContent === 'center'
        || getComputedStyle(b.parentElement).alignItems === 'center' && getComputedStyle(b.parentElement).flexDirection === 'column';
      // trim leading/trailing spaces
      while (runs.length && !runs[0].text.trim() && runs[0].text !== '\n') runs.shift();
      if (runs.length) runs[0].text = runs[0].text.replace(/^ /, '');
      if (runs.length) runs[runs.length-1].text = runs[runs.length-1].text.replace(/ $/, '');
      out.push({ x: x1, y: y1, x2, y2, cx1, cx2, lh, hasBefore: !!(runs[0] && runs[0].pseudo), firstRight, lines, align: centered ? 'center' : (ta === 'left' ? 'left' : 'right'), runs });
    }
    return { height: document.body.scrollHeight, blocks: out };
  }, BLOCKS);

  await page.addStyleTag({ content: '*,*::before,*::after{color:transparent !important;text-shadow:none !important}' });
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(__dirname, 'out', name + '-bg.png'), fullPage: true });
  fs.writeFileSync(path.join(__dirname, 'out', name + '-text.json'), JSON.stringify(data, null, 1));
  console.log(name, data.blocks.length, 'text blocks');
  await browser.close();
})();
