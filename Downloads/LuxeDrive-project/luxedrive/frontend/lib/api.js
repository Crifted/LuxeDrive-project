// lib/api.js — central client for the LuxeDrive Laravel API

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("luxedrive_token");
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { Accept: "application/json" };
  if (body) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = "Er ging iets mis.";
    try {
      const data = await res.json();
      message = data.message || Object.values(data.errors || {})[0]?.[0] || message;
    } catch (_) {}
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // ---- Cars (public) ----
  listCars(params = {}) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== "" && v != null)
    ).toString();
    return request(`/cars${qs ? `?${qs}` : ""}`);
  },
  getCar(id) {
    return request(`/cars/${id}`);
  },

  // ---- Auth ----
  login(email, password) {
    return request(`/login`, { method: "POST", body: { email, password } });
  },
  logout() {
    return request(`/logout`, { method: "POST", auth: true });
  },

  // ---- Cars (admin) ----
  createCar(data) {
    return request(`/cars`, { method: "POST", body: data, auth: true });
  },
  updateCar(id, data) {
    return request(`/cars/${id}`, { method: "PUT", body: data, auth: true });
  },
  deleteCar(id) {
    return request(`/cars/${id}`, { method: "DELETE", auth: true });
  },
};

export function saveToken(token) {
  localStorage.setItem("luxedrive_token", token);
}
export function clearToken() {
  localStorage.removeItem("luxedrive_token");
}
export function isAuthed() {
  return !!getToken();
}
