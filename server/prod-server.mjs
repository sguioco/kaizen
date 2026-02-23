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
app.use(express.static(distDir));

app.get("*", (_req, res) => {
  res.sendFile(path.resolve(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Production server running: http://localhost:${port}`);
});
