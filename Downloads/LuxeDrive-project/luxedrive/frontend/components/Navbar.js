"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${solid ? "solid" : ""}`}>
      <Link href="/" className="logo">Luxe<span>Drive</span></Link>
      <div className="nav-links">
        <Link href="/#collection">Collectie</Link>
        <Link href="/#experience">Atelier</Link>
        <Link href="/#concierge">Concierge</Link>
        <Link href="/admin/login" className="nav-cta">Admin</Link>
      </div>
    </nav>
  );
}
