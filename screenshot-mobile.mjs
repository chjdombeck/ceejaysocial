import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/chjdo/Documents/Test 1 Website Building Claude/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const existing = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] || '0')).filter(Boolean);
const next = nums.length ? Math.max(...nums) + 1 : 1;
const label = process.argv[3] ? `-${process.argv[3]}` : '-mobile';
const filename = `screenshot-${next}${label}.png`;
const outPath = path.join(dir, filename);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/chjdo/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(process.argv[2] || 'http://localhost:3000', { waitUntil: 'networkidle2' });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log(`Saved: temporary screenshots/${filename}`);
