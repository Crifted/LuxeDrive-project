"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { api } from "../lib/api";

const euro = (n) => "€ " + Number(n).toLocaleString("nl-NL");

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const dur = 1600;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <b ref={ref}>{val}{suffix}</b>;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ make: "", status: "", min_price: "", max_price: "" });

  useReveal();

  useEffect(() => {
    const onScroll = () => {};
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await api.listCars(filters);
      setCars(res.data || res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, [filters]);

 const makes = [...new Set(cars.map((c) => c.make))].sort();

const available = (cars || []).filter((c) => String(c.status || "").toLowerCase() === "available");

const featured = (cars || [])
  .slice()
  .filter((c) => String(c.status || "").toLowerCase() === "available")
  .sort((a, b) => Number(b.price) - Number(a.price))[0];

const featuredFallback = (cars || [])
  .slice()
  .sort((a, b) => Number(b.price) - Number(a.price))[0];

const featuredToShow = featured || featuredFallback;

const rest = featuredToShow
  ? (cars || []).filter((c) => c.id !== featuredToShow.id)
  : cars;

console.log("cars:", cars);
console.log("available:", available);
console.log("featured:", featured);
console.log("rest:", rest);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <header className="vhero">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bugatti_Chiron_2019_trimmed.jpg/1280px-Bugatti_Chiron_2019_trimmed.jpg"
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}}
          alt=""
        />
        <div style={{position:"absolute",inset:0,zIndex:1,background:"linear-gradient(to top,#08080a 6%,rgba(8,8,10,.45) 50%,rgba(8,8,10,.72))"}} />
        <video
          autoPlay muted loop playsInline
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:2,opacity:0.55}}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        >
          <source
            src="https://videos.pexels.com/video-files/7727416/7727416-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>

        <div className="vhero-inner">
          <div className="eyebrow fade-up">Curated since 2026 · Nederland</div>
          <h1 className="fade-up d1">Niet zomaar een auto.<br /><em>Een statement.</em></h1>
          <p className="fade-up d2">
            Een persoonlijk geselecteerde collectie van de meest begeerde hyper- en supercars
            ter wereld. Gekeurd, gedocumenteerd en klaar voor zijn volgende eigenaar.
          </p>
          <div className="hero-actions fade-up d3">
            <a href="#collection" className="btn-primary">Bekijk collectie</a>
            <a href="#experience" className="btn-ghost">De LuxeDrive ervaring</a>
          </div>
        </div>

        <div className="hero-meta fade-up d4">
          <div className="hm"><b>{available.length || "—"}</b><span>In voorraad</span></div>
          <div className="hm"><b>12M+</b><span>Collectiewaarde</span></div>
          <div className="hm"><b>100%</b><span>Gekeurd</span></div>
        </div>
        <div className="scroll-line" />
      </header>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span key={i}>
              Bugatti <i>◆</i> Ferrari <i>◆</i> Lamborghini <i>◆</i> Koenigsegg <i>◆</i> Pagani <i>◆</i> McLaren <i>◆</i> Porsche <i>◆</i> Aston Martin <i>◆</i>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="section reveal">
        <div className="stats">
          <div><Counter to={available.length || 6} /><span>Auto's beschikbaar</span></div>
          <div><Counter to={48} suffix="u" /><span>Gem. levertijd documenten</span></div>
          <div><Counter to={210} suffix="+" /><span>Inspectiepunten per auto</span></div>
          <div><Counter to={100} suffix="%" /><span>Historie gedocumenteerd</span></div>
        </div>
      </section>

        {/* FEATURED */}
      <section className="section reveal" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <div>
              <div className="eyebrow">Uitgelicht</div>
              <h2>De <em>kroonjuweel</em> van deze maand</h2>
            </div>
          </div>

          {featuredToShow ? (
        <Link href={`/cars/${featuredToShow.id}`} className="feature-row" style={{ display: "grid" }}>
              <div className="feature-img">
                {/* Extra overlay/contrast so the image looks premium */}
                <img
                  src={featuredToShow.image}
                  alt={`${featuredToShow.make} ${featuredToShow.model}`}
                  style={{ filter: "contrast(1.05) saturate(1.08) brightness(0.88)" }}
                />
              </div>
            <div className="feature-info">
              <div className="eyebrow">{featuredToShow.make}</div>
              <h3>{featuredToShow.model}</h3>
              <p>{featuredToShow.description}</p>
              {/* Extra “tasteful” fade overlay to make text readable */}
            <style jsx>{`
              .feature-row .feature-img img { 
                position: relative;
              }
              .feature-row .feature-img::after {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(90deg, rgba(8,8,10,.55) 0%, rgba(8,8,10,0) 55%);
                pointer-events: none;
                z-index: 1;
              }
              .feature-row .feature-info { position: relative; z-index: 2; }
            `}</style>

                <div className="feature-specs">
                  <div><b className="serif">{featuredToShow.power}</b><span>Vermogen</span></div>
                  <div><b className="serif">{featuredToShow.accel}</b><span>0–100 km/u</span></div>
                  <div><b className="serif">{featuredToShow.topspeed}</b><span>Topsnelheid</span></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
                  <span className="price serif" style={{ fontSize: 32 }}>{euro(featuredToShow.price)}</span>
                  <span className="btn-ghost" style={{ padding: "12px 26px" }}>Bekijk dossier →</span>
                </div>
              </div>
            </Link>
          ) : (
            <p style={{ color: "var(--muted)" }}>Uitgelichte auto wordt geladen…</p>
          )}
        </section>

        {/* COLLECTIE */}
      <section className="section" id="collection" style={{ paddingTop: 0 }}>
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">De collectie</div>
            <h2>Beschikbaar <em>nu</em></h2>
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>
            <b style={{ color: "var(--gold)" }}>{available.length}</b> automobielen in voorraad
          </div>
        </div>

        <div className="filters reveal">
          <select value={filters.make} onChange={(e) => setFilters({ ...filters, make: e.target.value })}>
            <option value="">Alle merken</option>
            {makes.map((m) => <option key={m}>{m}</option>)}
          </select>
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">Alle statussen</option>
            <option value="available">Beschikbaar</option>
            <option value="sold">Verkocht</option>
          </select>
          <select onChange={(e) => {
            const v = e.target.value;
            if (!v) return setFilters({ ...filters, min_price: "", max_price: "" });
            const [lo, hi] = v.split("-");
            setFilters({ ...filters, min_price: lo, max_price: hi });
          }}>
            <option value="">Alle prijzen</option>
            <option value="0-1500000">tot € 1,5M</option>
            <option value="1500000-3000000">€ 1,5M – 3M</option>
            <option value="3000000-99000000">€ 3M+</option>
          </select>
        </div>

        {loading && <p style={{ color: "var(--muted)", padding: "40px 0" }}>Collectie laden…</p>}
        {error && <p style={{ color: "var(--red-soft)", padding: "40px 0" }}>Kon de collectie niet laden: {error}</p>}

        {!loading && !error && (
          <div className="grid">
{cars.map((c, i) => (
  <Link
    key={c.id}
    href={`/cars/${c.id}`}
    className="card"
  >
                <div className="card-img">
                  <span className={`badge ${c.status === "sold" ? "sold" : ""}`}>{c.status === "sold" ? "Verkocht" : "Beschikbaar"}</span>
                  <img src={c.image} alt={`${c.make} ${c.model}`} loading="lazy" />
                </div>
                <div className="card-body">
                  <div className="card-make">{c.make}</div>
                  <div className="card-name serif">{c.model}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 16 }}>
                    <span className="price serif">{euro(c.price)}</span>
                    <span style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>{c.year} · {c.power}</span>
                  </div>
                </div>
              </Link>
            ))}
            {rest.length === 0 && (
              <p style={{ color: "var(--muted)", gridColumn: "1/-1", textAlign: "center", padding: "60px 0" }}>
                Geen auto's gevonden binnen deze filters.
              </p>
            )}
          </div>
        )}
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <div className="split">
          <div className="split-img reveal">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop" alt="Atelier" />
            <div className="floating">
              <b>210+</b>
              <span>Inspectiepunten per auto</span>
            </div>
          </div>
          <div className="split-text reveal">
            <div className="eyebrow">Het atelier</div>
            <h2>Vakmanschap in <em>elke transactie</em></h2>
            <p>LuxeDrive bemiddelt in de zeldzaamste automobielen ter wereld. Wij combineren een discrete, persoonlijke aanpak met volledige transparantie.</p>
            <div className="tick-list">
              <div>Onafhankelijke 210-punts technische keuring</div>
              <div>Volledige historie en eigenaarsdossier</div>
              <div>Discrete bemiddeling, wereldwijd transport</div>
              <div>Persoonlijke adviseur per aankoop</div>
            </div>
            <a href="#concierge" className="btn-ghost">Hoe wij werken</a>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="concierge" style={{ paddingTop: 0 }}>
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">Concierge</div>
            <h2>Van eerste gesprek tot <em>sleuteloverdracht</em></h2>
          </div>
        </div>
        <div className="process reveal">
          <div>
            <div className="step-no serif">I</div>
            <h3 className="serif">Kennismaking</h3>
            <p>We bespreken je wensen, budget en tijdlijn. Op zoek naar iets dat niet in de collectie staat? Ons netwerk vindt het.</p>
          </div>
          <div>
            <div className="step-no serif">II</div>
            <h3 className="serif">Keuring & dossier</h3>
            <p>Elke auto ondergaat een onafhankelijke 210-punts inspectie. Je ontvangt het volledige dossier vóór je beslist.</p>
          </div>
          <div>
            <div className="step-no serif">III</div>
            <h3 className="serif">Overdracht</h3>
            <p>Discrete afhandeling, verzekerd transport en registratie geregeld. Jij hoeft alleen nog te rijden.</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-band reveal">
        <blockquote className="serif">
          "Een supercar koop je niet omdat het moet. Je koopt hem omdat niets anders hetzelfde voelt."
        </blockquote>
        <cite>— Het LuxeDrive credo</cite>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">Wat klanten zeggen</div>
            <h2>Vertrouwd door <em>verzamelaars</em></h2>
          </div>
        </div>
        <div className="testi reveal">
          <div>
            <div className="stars">★★★★★</div>
            <p>"Binnen twee weken stond mijn SF90 voor de deur, inclusief volledig dossier. Sneller en strakker dan elke officiële dealer."</p>
            <b>T. van der Berg</b>
            <span>Ferrari SF90 Stradale</span>
          </div>
          <div>
            <div className="stars">★★★★★</div>
            <p>"De keuring was grondiger dan ik ooit had gezien. Elk detail gedocumenteerd. Dit is hoe je auto's van dit kaliber hoort te verhandelen."</p>
            <b>M. Janssen</b>
            <span>Koenigsegg Jesko Absolut</span>
          </div>
          <div>
            <div className="stars">★★★★★</div>
            <p>"Discreet, professioneel en eerlijk over elke kras. Mijn Revuelto kwam exact zoals beloofd."</p>
            <b>R. de Vries</b>
            <span>Lamborghini Revuelto</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section reveal" style={{ paddingTop: 0 }}>
        <div className="cta">
          <h2>Klaar voor jouw <em>volgende hoofdstuk?</em></h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#collection" className="btn-primary">Bekijk collectie</a>
            <a href="mailto:info@luxedrive.nl" className="btn-ghost">Plan een gesprek</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-inner">
          <div className="foot-col">
            <Link href="/" className="logo">Luxe<span>Drive</span></Link>
            <p style={{ color: "var(--muted)", fontSize: 14, maxWidth: 240, lineHeight: 1.6, marginTop: 14 }}>
              Exclusieve automobielen, met zorg geselecteerd.
            </p>
          </div>
          <div className="foot-col">
            <h4>Navigatie</h4>
            <a href="#collection">Collectie</a>
            <a href="#experience">Het atelier</a>
            <a href="#concierge">Concierge</a>
            <Link href="/admin/login">Admin portaal</Link>
          </div>
          <div className="foot-col">
            <h4>Contact</h4>
            <a href="mailto:info@luxedrive.nl">info@luxedrive.nl</a>
            <a href="tel:+31612345678">+31 6 1234 5678</a>
            <a href="#">Tilburg, Nederland</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 LuxeDrive — Marco &amp; Abasin · Praktijksimulatie Yonder</span>
          <span>Next.js · Laravel · MySQL</span>
        </div>
      </footer>
    </>
  );
}