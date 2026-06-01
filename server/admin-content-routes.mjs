import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_CONTENT = {
  heroVideo: null,
  packages: null,
  membership: null,
  portfolio: null
};

const CONTENT_KEYS = new Set(Object.keys(DEFAULT_CONTENT));

function getContentFilePath() {
  return path.resolve(
    process.env.ADMIN_CONTENT_FILE || path.join(process.cwd(), "server-data", "admin-content.json")
  );
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "DetailersK00";
}

function sanitizeContent(rawContent) {
  const content = { ...DEFAULT_CONTENT };

  if (!rawContent || typeof rawContent !== "object" || Array.isArray(rawContent)) {
    return content;
  }

  Object.keys(DEFAULT_CONTENT).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(rawContent, key)) {
      content[key] = rawContent[key];
    }
  });

  return content;
}

async function readContentFile() {
  try {
    const raw = await fs.readFile(getContentFilePath(), "utf8");
    return sanitizeContent(JSON.parse(raw));
  } catch (error) {
    if (error.code === "ENOENT") return { ...DEFAULT_CONTENT };
    if (error instanceof SyntaxError) {
      error.status = 500;
      error.message = "Admin content storage is not valid JSON.";
    }
    throw error;
  }
}

async function writeContentFile(content) {
  const filePath = getContentFilePath();
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  const payload = JSON.stringify(
    {
      ...sanitizeContent(content),
      updatedAt: new Date().toISOString()
    },
    null,
    2
  );
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;

  await fs.writeFile(tempPath, payload, "utf8");
  await fs.rename(tempPath, filePath);
}

function readPassword(req) {
  return req.get("x-admin-password") || req.body?.password || "";
}

function requireAdmin(req, res) {
  if (readPassword(req) === getAdminPassword()) return true;
  res.status(401).json({ error: "Unauthorized" });
  return false;
}

function setNoStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

function registerCors(app) {
  app.use("/api/admin-content", (req, res, next) => {
    const configuredOrigins = process.env.ADMIN_CONTENT_ALLOWED_ORIGINS || "*";
    const requestOrigin = req.headers.origin;

    if (configuredOrigins === "*") {
      res.setHeader("Access-Control-Allow-Origin", "*");
    } else if (requestOrigin) {
      const allowedOrigins = configuredOrigins
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);

      if (allowedOrigins.includes(requestOrigin)) {
        res.setHeader("Access-Control-Allow-Origin", requestOrigin);
        res.setHeader("Vary", "Origin");
      }
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Password");

    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    next();
  });
}

export function registerAdminContentRoutes(app) {
  registerCors(app);

  app.get("/api/admin-content", async (_req, res) => {
    try {
      setNoStore(res);
      const content = await readContentFile();
      res.json({ content });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  });

  app.post("/api/admin-content/auth", (req, res) => {
    setNoStore(res);
    if (!requireAdmin(req, res)) return;
    res.json({ ok: true });
  });

  app.put("/api/admin-content", async (req, res) => {
    try {
      setNoStore(res);
      if (!requireAdmin(req, res)) return;

      const nextContent = sanitizeContent(req.body?.content);
      await writeContentFile(nextContent);
      res.json({ ok: true, content: nextContent });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  });

  app.put("/api/admin-content/:key", async (req, res) => {
    try {
      setNoStore(res);
      if (!requireAdmin(req, res)) return;

      const key = req.params.key;
      if (!CONTENT_KEYS.has(key)) {
        res.status(400).json({ error: `Unknown admin content key: ${key}` });
        return;
      }

      const currentContent = await readContentFile();
      const nextContent = {
        ...currentContent,
        [key]: req.body?.value ?? null
      };

      await writeContentFile(nextContent);
      res.json({ ok: true, content: nextContent });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  });
}
