import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registerAltegioRoutes } from "./altegio-routes.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");
const port = Number(process.env.PORT || 5555);

const app = express();
app.use(express.json({ limit: "1mb" }));

registerAltegioRoutes(app);
app.use(
  express.static(distDir, {
    setHeaders: (res, filePath) => {
      const staticAssetPattern = /\.(?:js|css|png|jpg|jpeg|webp|svg|gif|mp4|webm|woff2?|ttf|otf)$/i;
      if (staticAssetPattern.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        return;
      }

      if (filePath.endsWith("sw.js")) {
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      }
    }
  })
);

app.get("*", (_req, res) => {
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.sendFile(path.resolve(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Production server running: http://localhost:${port}`);
});
