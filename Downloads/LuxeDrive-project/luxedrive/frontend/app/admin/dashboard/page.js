"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { api, isAuthed, clearToken } from "../../../lib/api";

const euro = (n) => "€ " + Number(n).toLocaleString("nl-NL");
const EMPTY = { make: "", model: "", year: "", price: "", power: "", accel: "", topspeed: "", status: "available", image: "", description: "" };

export default function Dashboard() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthed()) { router.push("/admin/login"); return; }
    load();
    // eslint-disable-next-line
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await api.listCars();
      setCars(res.data || res);
    } finally {
      setLoading(false);
    }
  }

  function openNew() { setEditing(null); setForm(EMPTY); setError(""); setModal(true); }
  function openEdit(car) { setEditing(car.id); setForm({ ...car }); setError(""); setModal(true); }

  async function save() {
    setError("");
    if (!form.make || !form.model || !form.year || !form.price) {
      setError("Merk, model, jaar en prijs zijn verplicht.");
      return;
    }
    const payload = { ...form, year: Number(form.year), price: Number(form.price) };
    try {
      if (editing) await api.updateCar(editing, payload);
      else await api.createCar(payload);
      setModal(false);
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  async function remove(car) {
    if (!confirm(`Weet je zeker dat je de ${car.make} ${car.model} wilt verwijderen?`)) return;
    await api.deleteCar(car.id);
    load();
  }

  async function logout() {
    try { await api.logout(); } catch (_) {}
    clearToken();
    router.push("/admin/login");
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <Navbar />
      <div className="section" style={{ paddingTop: 140 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 18, marginBottom: 36 }}>
          <div>
            <div className="eyebrow">Beheer</div>
            <h2 className="serif" style={{ fontSize: 46, fontWeight: 600, marginTop: 10 }}>Collectie beheren</h2>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <button className="btn-primary" onClick={openNew}>+ Auto toevoegen</button>
            <button className="btn-ghost" onClick={logout}>Uitloggen</button>
          </div>
        </div>

        {loading ? <p style={{ color: "var(--muted)" }}>Laden…</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--line)" }}>
            <thead>
              <tr>
                {["", "Auto", "Jaar", "Prijs", "Status", ""].map((h, i) => (
                  <th key={i} style={{ textAlign: i === 5 ? "right" : "left", padding: "16px 18px", borderBottom: "1px solid var(--line)", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", background: "var(--panel-2)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cars.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "14px 18px" }}><img src={c.image} alt="" style={{ width: 64, height: 40, objectFit: "cover", border: "1px solid var(--line)" }} /></td>
                  <td style={{ padding: "14px 18px", fontSize: 14 }}><b style={{ fontWeight: 500 }}>{c.make}</b> {c.model}</td>
                  <td style={{ padding: "14px 18px", fontSize: 14 }}>{c.year}</td>
                  <td style={{ padding: "14px 18px", fontSize: 14 }}>{euro(c.price)}</td>
                  <td style={{ padding: "14px 18px" }}>
                    <span style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid var(--line)", color: c.status === "sold" ? "var(--red-soft)" : "#5fc28a" }}>
                      {c.status === "sold" ? "Verkocht" : "Beschikbaar"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "right" }}>
                    <button className="btn-ghost" style={{ padding: "7px 14px", fontSize: 11, marginRight: 8 }} onClick={() => openEdit(c)}>Bewerk</button>
                    <button className="btn-ghost" style={{ padding: "7px 14px", fontSize: 11 }} onClick={() => remove(c)}>Verwijder</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(4,4,6,.86)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "40px 20px" }} onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div style={{ background: "var(--panel)", border: "1px solid var(--line)", maxWidth: 720, width: "100%", padding: 40 }}>
            <h3 className="serif" style={{ fontSize: 34, fontWeight: 600, marginBottom: 28 }}>{editing ? "Auto bewerken" : "Auto toevoegen"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {[["make", "Merk"], ["model", "Model"], ["year", "Bouwjaar"], ["price", "Prijs (€)"], ["power", "Vermogen"], ["accel", "0–100 km/u"], ["topspeed", "Topsnelheid"]].map(([k, label]) => (
                <div key={k} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</label>
                  <input value={form[k] ?? ""} onChange={set(k)} />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)" }}>Status</label>
                <select value={form.status} onChange={set("status")}>
                  <option value="available">Beschikbaar</option>
                  <option value="sold">Verkocht</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, gridColumn: "1/-1" }}>
                <label style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)" }}>Afbeelding URL</label>
                <input value={form.image ?? ""} onChange={set("image")} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, gridColumn: "1/-1" }}>
                <label style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)" }}>Omschrijving</label>
                <textarea value={form.description ?? ""} onChange={set("description")} style={{ minHeight: 90, resize: "vertical" }} />
              </div>
            </div>
            {error && <p style={{ color: "var(--red-soft)", fontSize: 13, marginTop: 16 }}>{error}</p>}
            <div style={{ display: "flex", gap: 14, justifyContent: "flex-end", marginTop: 30 }}>
              <button className="btn-ghost" onClick={() => setModal(false)}>Annuleren</button>
              <button className="btn-primary" onClick={save}>Opslaan</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
