/**
 * Writes public/llms.txt and public/llms-full.txt from lib/seo/llms-document.ts
 */
import fs from "node:fs";
import path from "node:path";
import { buildLlmsTxtBrief, buildLlmsTxtFull } from "../lib/seo/llms-document";

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

fs.writeFileSync(path.join(publicDir, "llms.txt"), buildLlmsTxtBrief(), "utf8");
fs.writeFileSync(
  path.join(publicDir, "llms-full.txt"),
  buildLlmsTxtFull(),
  "utf8",
);

console.log("Wrote public/llms.txt and public/llms-full.txt");
