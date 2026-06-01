const ADMIN_API_BASE = (import.meta.env.VITE_ADMIN_API_BASE || "").replace(/\/$/, "");
const ADMIN_CONTENT_PATH = "/api/admin-content";

function buildAdminContentUrl(path = "") {
  return `${ADMIN_API_BASE}${ADMIN_CONTENT_PATH}${path}`;
}

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || `Admin content API error (${response.status})`);
  }

  return payload;
}

export async function fetchAdminContent({ signal } = {}) {
  const response = await fetch(buildAdminContentUrl(), {
    cache: "no-store",
    signal
  });
  const payload = await parseJsonResponse(response);
  return payload?.content || {};
}

export async function verifyAdminPassword(password) {
  const response = await fetch(buildAdminContentUrl("/auth"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });

  await parseJsonResponse(response);
  return true;
}

export async function saveAdminContentValue(key, value, password) {
  const response = await fetch(buildAdminContentUrl(`/${encodeURIComponent(key)}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Password": password
    },
    body: JSON.stringify({ value })
  });

  const payload = await parseJsonResponse(response);
  return payload?.content || {};
}
