import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

const templatePath = path.resolve(distDir, "index.html");
const serverEntryPath = path.resolve(distDir, "server", "entry-server.js");

async function prerender() {
  const template = await fs.readFile(templatePath, "utf-8");
  const { render } = await import(pathToFileURL(serverEntryPath).href);
  const appHtml = render("/");
  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  await fs.writeFile(templatePath, html, "utf-8");
  console.log("Prerender complete: /");
}

prerender().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});
