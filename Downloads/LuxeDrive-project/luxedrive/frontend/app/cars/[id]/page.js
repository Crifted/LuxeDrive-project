"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { api } from "../../../lib/api";

const euro = (n) => "€ " + Number(n).toLocaleString("nl-NL");

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getCar(id)
      .then((res) => setCar(res.data || res))
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return (<><Navbar /><div className="section" style={{ paddingTop: 140 }}><p style={{ color: "var(--red-soft)" }}>Auto niet gevonden.</p><Link href="/" className="btn-ghost" style={{ marginTop: 20 }}>← Terug</Link></div></>);
  if (!car) return (<><Navbar /><div className="section" style={{ paddingTop: 140 }}><p style={{ color: "var(--muted)" }}>Laden…</p></div></>);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 70 }}>
        <div style={{ position: "relative", aspectRatio: "16/8", maxHeight: "70vh", overflow: "hidden", background: "#1a1a20" }}>
          <img src={car.image} alt={`${car.make} ${car.model}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,var(--bg),transparent 50%)" }} />
        </div>

        <div className="section" style={{ marginTop: -80, position: "relative", zIndex: 2 }}>
          <Link href="/" style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>← Terug naar collectie</Link>
          <div className="eyebrow" style={{ marginTop: 24 }}>{car.make}</div>
          <h1 className="serif" style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 600, lineHeight: 1, margin: "10px 0 8px" }}>{car.model}</h1>
          <div className="serif" style={{ fontSize: 34, color: "var(--gold-soft)", marginBottom: 32 }}>{euro(car.price)}</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)", marginBottom: 36 }}>
            {[["Bouwjaar", car.year], ["Vermogen", car.power], ["0–100 km/u", car.accel], ["Topsnelheid", car.topspeed]].map(([k, v]) => (
              <div key={k} style={{ background: "var(--panel)", padding: "22px 20px" }}>
                <div style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>{k}</div>
                <div className="serif" style={{ fontSize: 24, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#cfcdc6", maxWidth: 720, marginBottom: 32 }}>{car.description}</p>

          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: car.status === "sold" ? "var(--red-soft)" : "#3ca06a" }} />
              {car.status === "sold" ? "Verkocht" : "Direct beschikbaar"}
            </span>
            {car.status !== "sold" && <a href="mailto:info@luxedrive.nl" className="btn-primary">Interesse tonen</a>}
          </div>
        </div>
      </div>
    </>
  );
}
