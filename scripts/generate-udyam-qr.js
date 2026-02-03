/**
 * Generates a static QR code for UDYAM verification with "C" (Calegar) at center.
 * Center is a rounded white badge (transparent elsewhere) so it integrates cleanly.
 * Output: public/udyam-verification-qr.png
 * Run: node scripts/generate-udyam-qr.js
 */

const QRCode = require("qrcode");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { createCanvas } = require("canvas");

const UDYAM_VERIFICATION_URL =
  "https://udyamregistration.gov.in/verifyudyambarcode.aspx?verifyudrn=cXBF0XeDBvCFZgbrC1WRSpCzCIRijDesXxYCgheNPLs=";

const QR_SIZE = 512;
const CENTER_SIZE_RATIO = 0.16; // ~16% of QR – keeps scanability, looks balanced
const MARGIN = 2;
const ERROR_CORRECTION = "H";

const PROJECT_ROOT = path.resolve(__dirname, "..");
const CALEGAR_FONT_PATH = path.join(PROJECT_ROOT, "public", "fonts", "Calegar.otf");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "public", "udyam-verification-qr.png");

const CENTER_TEXT = "C";

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawCenterWithCalegar(compositeSize) {
  const canvas = createCanvas(compositeSize, compositeSize);
  const ctx = canvas.getContext("2d");

  if (!fs.existsSync(CALEGAR_FONT_PATH)) {
    throw new Error("Calegar font not found at " + CALEGAR_FONT_PATH);
  }

  const { registerFont } = require("canvas");
  registerFont(CALEGAR_FONT_PATH, { family: "Calegar" });

  const inset = Math.round(compositeSize * 0.08);
  const w = compositeSize - inset * 2;
  const h = w;
  const x = inset;
  const y = (compositeSize - h) / 2;
  const radius = Math.round(compositeSize * 0.12);

  ctx.clearRect(0, 0, compositeSize, compositeSize);
  ctx.fillStyle = "#FFFFFF";
  roundRect(ctx, x, y, w, h, radius);
  ctx.fill();

  ctx.fillStyle = "#000000";
  const fontSize = Math.round(compositeSize * 0.75);
  ctx.font = `${fontSize}px Calegar`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(CENTER_TEXT, compositeSize / 2, compositeSize / 2);

  return canvas.toBuffer("image/png");
}

async function generate() {
  const centerSize = Math.round(QR_SIZE * CENTER_SIZE_RATIO);
  const padding = Math.round(centerSize * 0.15);
  const compositeSize = centerSize + padding * 2;

  const dataUrl = await QRCode.toDataURL(UDYAM_VERIFICATION_URL, {
    errorCorrectionLevel: ERROR_CORRECTION,
    margin: MARGIN,
    width: QR_SIZE,
    color: { dark: "#0A0A0A", light: "#FFFFFF" },
  });

  const qrBuffer = Buffer.from(dataUrl.replace(/^data:image\/\w+;base64,/, ""), "base64");
  const centerBuffer = drawCenterWithCalegar(compositeSize);

  await sharp(qrBuffer)
    .composite([
      {
        input: centerBuffer,
        top: Math.round((QR_SIZE - compositeSize) / 2),
        left: Math.round((QR_SIZE - compositeSize) / 2),
      },
    ])
    .png()
    .toFile(OUTPUT_PATH);
}

generate()
  .then(() => console.log("UDYAM verification QR saved to", OUTPUT_PATH))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
