import dotenv from "dotenv";
import express from "express";
import { createServer as createViteServer } from "vite";
import { registerAltegioRoutes } from "./altegio-routes.mjs";

dotenv.config();

const port = Number(process.env.PORT || 5555);
const app = express();

app.use(express.json({ limit: "1mb" }));
registerAltegioRoutes(app);

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "spa"
});

app.use(vite.middlewares);

app.listen(port, () => {
  console.log(`Dev server running: http://localhost:${port}`);
});
