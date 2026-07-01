import sharp from "sharp";
import { readdirSync, statSync, existsSync } from "fs";
import { join } from "path";

const PROJECT_IMAGES = "src/images/projects";
const HOME_IMAGES = "src/images/home";
const PUBLIC_BLOG = "public/blog";

async function optimizeFile(inputPath, outputPath, { maxWidth, quality = 80 } = {}) {
  const pipeline = sharp(inputPath);
  if (maxWidth) pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  await pipeline.webp({ quality, effort: 4 }).toFile(outputPath);
  const orig = statSync(inputPath).size;
  const optimized = statSync(outputPath).size;
  const reduction = ((1 - optimized / orig) * 100).toFixed(0);
  console.log(`  ${(orig / 1024).toFixed(0)}KB \u2192 ${(optimized / 1024).toFixed(0)}KB WebP (${reduction}%)`);
}

async function main() {
  console.log("Converting project screenshots (resized to 1200px)...");
  const projects = readdirSync(PROJECT_IMAGES).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
  for (const f of projects) {
    const inFile = join(PROJECT_IMAGES, f);
    const outFile = join(PROJECT_IMAGES, f.replace(/\.(png|jpg|jpeg)$/i, ".webp"));
    process.stdout.write(`  ${f} `);
    await optimizeFile(inFile, outFile, { maxWidth: 1200 });
  }

  console.log("Converting home images...");
  const home = readdirSync(HOME_IMAGES).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
  for (const f of home) {
    const inFile = join(HOME_IMAGES, f);
    const outFile = join(HOME_IMAGES, f.replace(/\.(png|jpg|jpeg)$/i, ".webp"));
    process.stdout.write(`  ${f} `);
    await optimizeFile(inFile, outFile);
  }

  if (existsSync(PUBLIC_BLOG)) {
    console.log("Converting public/blog images...");
    const blog = readdirSync(PUBLIC_BLOG).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
    for (const f of blog) {
      const inFile = join(PUBLIC_BLOG, f);
      const outFile = join(PUBLIC_BLOG, f.replace(/\.(png|jpg|jpeg)$/i, ".webp"));
      process.stdout.write(`  ${f} `);
      await optimizeFile(inFile, outFile);
    }
  }

  console.log("\nDone.");
}

main();
