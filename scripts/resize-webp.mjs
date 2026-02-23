import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.resolve("public");
const MAX_SIZE = 500;

const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith(".webp"));

console.log(`Found ${files.length} WebP files\n`);

for (const file of files) {
    const filePath = path.join(PUBLIC_DIR, file);
    const stat = fs.statSync(filePath);
    const sizeBefore = (stat.size / 1024).toFixed(0);

    try {
        // Read entire file into buffer first to avoid lock conflicts
        const inputBuffer = fs.readFileSync(filePath);
        const meta = await sharp(inputBuffer).metadata();

        if (stat.size < 10240 || (meta.width <= MAX_SIZE && meta.height <= MAX_SIZE)) {
            console.log(`SKIP  ${file} (${meta.width}x${meta.height}, ${sizeBefore}KB)`);
            continue;
        }

        const outputBuffer = await sharp(inputBuffer)
            .resize(MAX_SIZE, MAX_SIZE, { fit: "inside", withoutEnlargement: true })
            .webp({ quality: 82 })
            .toBuffer();

        fs.writeFileSync(filePath, outputBuffer);
        const sizeAfter = (outputBuffer.length / 1024).toFixed(0);

        console.log(`DONE  ${file}: ${meta.width}x${meta.height} -> ${MAX_SIZE}max | ${sizeBefore}KB -> ${sizeAfter}KB`);
    } catch (err) {
        console.log(`ERROR ${file}: ${err.message}`);
    }
}

console.log("\nAll done!");
