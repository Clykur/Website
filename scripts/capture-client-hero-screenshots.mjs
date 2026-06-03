#!/usr/bin/env node
/**
 * Capture hero + navbar screenshots for Clykur client/product sites.
 * Run: npx playwright install chromium && node scripts/capture-client-hero-screenshots.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicRoot = path.join(__dirname, "..", "public");

const TARGETS = [
  { slug: "elevatum", url: "https://elevatum.vercel.app" },
  { slug: "greylabs-ai", url: "https://greylabsai.vercel.app" },
  { slug: "phygitall-library", url: "https://phygitallibrary.vercel.app" },
  { slug: "forge-fitness", url: "https://forgefitness.clykur.com/" },
  { slug: "verity-health", url: "https://verityhealth.clykur.com" },
  { slug: "aurelia-visuals", url: "https://aureliavisuals.clykur.com/" },
  { slug: "yogisthaan-cafe", url: "https://yogisthaancafe.clykur.com/" },
  { slug: "trustbuilder", url: "https://trustbuilder.clykur.com/" },
  { slug: "pavan-travels", url: "https://pavantravels.vercel.app/" },
  {
    slug: "cusown",
    url: "https://cusown.clykur.com/",
    outDir: "Product Images",
    outName: "Cusown",
  },
];

const VIEWPORT = { width: 1440, height: 900 };
const CLIP_HEIGHT = 820;

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function captureOne(page, target) {
  const outDir =
    target.outDir === "Product Images"
      ? path.join(publicRoot, "Product Images")
      : path.join(publicRoot, "client-works");
  await ensureDir(outDir);

  const pngPath = path.join(outDir, `${target.outName ?? target.slug}.png`);
  const webpPath = path.join(outDir, `${target.outName ?? target.slug}.webp`);

  console.log(`→ ${target.url}`);
  await page.goto(target.url, {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });

  if (target.slug === "cusown") {
    // Splash screen runs after first paint; wait for the real marketing hero.
    await page.waitForTimeout(12_000);
    await page
      .getByRole("heading", { name: /smarter way/i })
      .waitFor({ timeout: 20_000 });
  } else if (target.slug === "trustbuilder") {
    await page.waitForTimeout(6_000);
    await page
      .getByRole("heading", { name: /trust layer freelancing/i })
      .waitFor({ timeout: 20_000 });
  } else {
    await page
      .waitForLoadState("networkidle", { timeout: 45_000 })
      .catch(() => {});
    await page.waitForTimeout(2000);
  }
  await page.waitForTimeout(400);
  await page.screenshot({
    path: pngPath,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height: CLIP_HEIGHT },
  });

  const maxWidth = target.outDir === "Product Images" ? 1200 : 1600;
  await sharp(pngPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(webpPath);

  const title = await page.title().catch(() => "");
  console.log(`  saved ${path.relative(publicRoot, webpPath)} (${title})`);
  return { slug: target.slug, title };
}

async function main() {
  await ensureDir(path.join(publicRoot, "client-works"));
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  const meta = [];
  for (const target of TARGETS) {
    try {
      meta.push(await captureOne(page, target));
    } catch (e) {
      console.error(`  FAILED ${target.slug}:`, e.message);
      meta.push({ slug: target.slug, error: e.message });
    }
  }

  await browser.close();
  console.log(JSON.stringify(meta, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
