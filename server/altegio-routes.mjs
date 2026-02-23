function getEnvConfig() {
  return {
    baseUrl: process.env.ALTEGIO_BASE_URL || "https://api.alteg.io",
    partnerToken: process.env.ALTEGIO_PARTNER_TOKEN || "",
    userToken: process.env.ALTEGIO_USER_TOKEN || "",
    defaultLocationId:
      process.env.ALTEGIO_LOCATION_ID ||
      process.env.VITE_ALTEGIO_LOCATION_ID ||
      "",
    defaultTeamMemberId:
      process.env.ALTEGIO_TEAM_MEMBER_ID ||
      process.env.VITE_ALTEGIO_TEAM_MEMBER_ID ||
      "",
    appointmentsPathTemplate:
      process.env.ALTEGIO_APPOINTMENTS_PATH || "/api/v1/appointments/{locationId}"
  };
}

function buildAuthHeader(partnerToken, userToken) {
  return `Bearer ${partnerToken}, User ${userToken}`;
}

function resolvePathTemplate(template, locationId) {
  return template.replace("{locationId}", String(locationId || ""));
}

async function altegioRequest(config, path, { method = "GET", query, body } = {}) {
  if (!config.partnerToken || !config.userToken) {
    const error = new Error(
      "Missing ALTEGIO_PARTNER_TOKEN or ALTEGIO_USER_TOKEN in server environment."
    );
    error.status = 500;
    throw error;
  }

  const url = new URL(path, config.baseUrl);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: buildAuthHeader(config.partnerToken, config.userToken),
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });

  const raw = await response.text();
  let parsed = null;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    parsed = { raw };
  }

  if (!response.ok) {
    const error = new Error(
      parsed?.meta?.message ||
        parsed?.message ||
        parsed?.error ||
        `Altegio API error (${response.status})`
    );
    error.status = response.status;
    error.details = parsed;
    throw error;
  }

  return parsed;
}

function extractSlots(payload) {
  if (!payload) return [];
  if (Array.isArray(payload?.slots)) return payload.slots;
  if (Array.isArray(payload?.data?.slots)) return payload.data.slots;
  if (Array.isArray(payload?.data)) {
    const slots = payload.data.flatMap((entry) =>
      Array.isArray(entry?.slots) ? entry.slots : []
    );
    return slots;
  }
  return [];
}

export function registerAltegioRoutes(app) {
  app.get("/api/altegio/config", (_req, res) => {
    const config = getEnvConfig();
    res.json({
      locationId: config.defaultLocationId,
      teamMemberId: config.defaultTeamMemberId
    });
  });

  app.get("/api/altegio/dates", async (req, res) => {
    try {
      const config = getEnvConfig();
      const locationId = req.query.locationId || config.defaultLocationId;
      const date = req.query.date;
      const staffId = req.query.staffId || undefined;

      if (!locationId || !date) {
        return res.status(400).json({
          error: "locationId and date are required"
        });
      }

      const data = await altegioRequest(
        config,
        `/api/v1/timetable/dates/${locationId}/${date}`,
        { query: { staff_id: staffId } }
      );

      res.json(data);
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message,
        details: error.details || null
      });
    }
  });

  app.get("/api/altegio/slots", async (req, res) => {
    try {
      const config = getEnvConfig();
      const locationId = req.query.locationId || config.defaultLocationId;
      const teamMemberId = req.query.teamMemberId || config.defaultTeamMemberId;
      const startDate = req.query.startDate;
      const endDate = req.query.endDate || startDate;

      if (!locationId || !teamMemberId || !startDate) {
        return res.status(400).json({
          error: "locationId, teamMemberId, and startDate are required"
        });
      }

      const data = await altegioRequest(
        config,
        `/api/v1/schedule/${locationId}/${teamMemberId}/${startDate}/${endDate}`
      );

      res.json({
        ...data,
        normalizedSlots: extractSlots(data)
      });
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message,
        details: error.details || null
      });
    }
  });

  app.post("/api/altegio/appointments", async (req, res) => {
    try {
      const config = getEnvConfig();
      const locationId =
        req.body.locationId ||
        req.body.location_id ||
        config.defaultLocationId;
      const endpoint =
        req.body.endpoint || resolvePathTemplate(config.appointmentsPathTemplate, locationId);
      const payload = req.body.payload || req.body;

      if (!locationId) {
        return res.status(400).json({ error: "locationId is required" });
      }

      const data = await altegioRequest(config, endpoint, {
        method: "POST",
        body: payload
      });

      res.json(data);
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message,
        details: error.details || null
      });
    }
  });
}
