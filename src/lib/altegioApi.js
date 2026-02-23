const API_BASE = "/api/altegio";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  const raw = await response.text();
  let data = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = { message: raw };
  }

  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      "Altegio API request failed";
    throw new Error(message);
  }

  return data;
}

export function getAltegioConfig() {
  return request("/config");
}

export function getAltegioDates({ locationId, date, staffId }) {
  const params = new URLSearchParams({
    locationId: String(locationId),
    date
  });
  if (staffId) {
    params.set("staffId", String(staffId));
  }
  return request(`/dates?${params.toString()}`);
}

export function getAltegioSlots({
  locationId,
  teamMemberId,
  startDate,
  endDate
}) {
  const params = new URLSearchParams({
    locationId: String(locationId),
    teamMemberId: String(teamMemberId),
    startDate,
    endDate
  });
  return request(`/slots?${params.toString()}`);
}

export function createAltegioAppointment(payload) {
  return request("/appointments", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
