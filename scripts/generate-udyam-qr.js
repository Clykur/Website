/**
 * Generates a static QR code for UDYAM verification with Clykur favicon at center.
 * Center uses public/clykur_favicon.svg (transparent background, no white).
 * Output: public/udyam-verification-qr.png
 * Run: node scripts/generate-udyam-qr.js
 */

const QRCode = require("qrcode");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const UDYAM_VERIFICATION_URL =
  "https://udyamregistration.gov.in/verifyudyambarcode.aspx?verifyudrn=cXBF0XeDBvCFZgbrC1WRSpCzCIRijDesXxYCgheNPLs=";

const QR_SIZE = 512;
const CENTER_SIZE_RATIO = 0.16; // ~16% of QR - keeps scanability, looks balanced
const MARGIN = 2;
const ERROR_CORRECTION = "H";

const PROJECT_ROOT = path.resolve(__dirname, "..");
const FAVICON_SVG_PATH = path.join(
  PROJECT_ROOT,
  "public",
  "clykur_favicon.svg",
);
const OUTPUT_PATH = path.join(
  PROJECT_ROOT,
  "public",
  "udyam-verification-qr.png",
);

async function getCenterImage(compositeSize) {
  if (!fs.existsSync(FAVICON_SVG_PATH)) {
    throw new Error("Favicon SVG not found at " + FAVICON_SVG_PATH);
  }
  return sharp(FAVICON_SVG_PATH)
    .resize(compositeSize, compositeSize)
    .png()
    .toBuffer();
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

  const qrBuffer = Buffer.from(
    dataUrl.replace(/^data:image\/\w+;base64,/, ""),
    "base64",
  );
  const centerBuffer = await getCenterImage(compositeSize);

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
