#!/usr/bin/env node
/**
 * Compress marketing images for web (WebP). Run: node scripts/optimize-public-images.mjs
 */
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public");

const jobs = [
  {
    input: "Product Images/Cusown.png",
    output: "Product Images/Cusown.webp",
    maxWidth: 1200,
    quality: 82,
  },
  {
    input: "Product Images/FreeTrust.png",
    output: "Product Images/FreeTrust.webp",
    maxWidth: 1200,
    quality: 82,
  },
  {
    input: "ClykurLogo.png",
    output: "ClykurLogo.webp",
    maxWidth: 512,
    quality: 85,
  },
  {
    input: "udyam-verification-qr.png",
    output: "udyam-verification-qr.webp",
    maxWidth: 400,
    quality: 90,
  },
];

async function run() {
  const report = [];
  for (const job of jobs) {
    const inPath = path.join(root, job.input);
    const outPath = path.join(root, job.output);
    try {
      await fs.access(inPath);
    } catch {
      console.warn(`Skip (missing): ${job.input}`);
      continue;
    }
    const before = (await fs.stat(inPath)).size;
    await sharp(inPath)
      .resize({ width: job.maxWidth, withoutEnlargement: true })
      .webp({ quality: job.quality })
      .toFile(outPath);
    const after = (await fs.stat(outPath)).size;
    report.push({
      file: job.output,
      beforeKb: Math.round(before / 1024),
      afterKb: Math.round(after / 1024),
      savedPct: Math.round((1 - after / before) * 100),
    });
  }
  console.log(JSON.stringify(report, null, 2));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
