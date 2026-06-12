"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { api, saveToken } from "../../../lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.login(email, password);
      saveToken(res.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="section" style={{ paddingTop: 160, maxWidth: 460 }}>
        <div style={{ background: "var(--panel)", border: "1px solid var(--line)", padding: "48px 40px" }}>
          <div className="eyebrow">Beveiligde toegang</div>
          <h2 className="serif" style={{ fontSize: 38, fontWeight: 600, margin: "12px 0 6px" }}>Admin portaal</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 30 }}>Log in om de collectie te beheren.</p>

          <form onSubmit={submit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>E-mailadres</label>
              <input style={{ width: "100%" }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@luxedrive.nl" />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>Wachtwoord</label>
              <input style={{ width: "100%" }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <button className="btn-primary" style={{ width: "100%", textAlign: "center" }} disabled={loading}>
              {loading ? "Bezig…" : "Inloggen"}
            </button>
          </form>

          {error && <p style={{ color: "var(--red-soft)", fontSize: 13, marginTop: 14 }}>{error}</p>}

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--line)", fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
            Standaard inloggegevens (uit seeder):<br />
            E-mail <code style={{ color: "var(--gold-soft)" }}>admin@luxedrive.nl</code><br />
            Wachtwoord <code style={{ color: "var(--gold-soft)" }}>luxedrive2026</code>
          </div>
        </div>
      </div>
    </>
  );
}
