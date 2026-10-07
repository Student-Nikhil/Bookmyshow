import { useEffect, useState } from "react";
import { banners, explore, streamItems, premieres, footerGroups } from "./data.js";

const pal = [["#e53935", "#5c1210"], ["#1e88e5", "#0b2a4d"], ["#43a047", "#12341a"], ["#8e24aa", "#2c0b38"], ["#fb8c00", "#4a2a00"], ["#00897b", "#06302c"], ["#d81b60", "#430a1e"], ["#546e7a", "#161f24"]];
export const grad = (i) => `linear-gradient(160deg,${pal[i % pal.length][0]},${pal[i % pal.length][1]})`;

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % banners.length), 5000); return () => clearInterval(t); }, []);
  const b = banners[i];
  const go = (d) => setI((i + d + banners.length) % banners.length);
  return (
    <div className="hero-wrap">
      <div className="hero-banner" style={{ background: `linear-gradient(110deg,${b.c[0]},${b.c[1]})` }}>
        <div className="hero-text" key={i}>
          <span className="hero-tag">{b.tag}</span>
          <h1>{b.title}</h1>
          <p>{b.sub}</p>
          <button className="hero-cta" onClick={() => document.getElementById("recommended")?.scrollIntoView({ behavior: "smooth" })}>Book now</button>
        </div>
        <button className="arrow l" onClick={() => go(-1)} aria-label="Previous">‹</button>
        <button className="arrow r" onClick={() => go(1)} aria-label="Next">›</button>
        <div className="dots">{banners.map((_, k) => <i key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} />)}</div>
      </div>
    </div>
  );
}

function Card({ it, i }) {
  return (
    <div className="ev-card">
      <div className="ev-poster" style={{ background: grad(i) }}>
        {it.promoted && <span className="promo">PROMOTED</span>}
        <b>{it.title}</b>
        <span className="ev-date">{it.date}</span>
      </div>
      <div className="ev-title">{it.title}</div>
      <div className="ev-sub">{it.venue}{it.lang && ` • ${it.lang}`}</div>
    </div>
  );
}

export function Explore({ kind, city, q }) {
  const d = explore[kind];
  const [cat, setCat] = useState(null);
  const [lang, setLang] = useState(null);
  useEffect(() => { setCat(null); setLang(null); }, [kind]);
  const items = d.items.filter((x) => (!cat || x.cat === cat) && (!lang || x.lang === lang) && x.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="ex-layout">
      <aside>
        <h2>Filters</h2>
        <div className="f-card">
          <div className="f-head"><span>Categories</span><a onClick={() => setCat(null)}>Clear</a></div>
          <div className="f-chips">{d.cats.map((c) => <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(cat === c ? null : c)}>{c}</button>)}</div>
        </div>
        <div className="f-card">
          <div className="f-head"><span>Languages</span><a onClick={() => setLang(null)}>Clear</a></div>
          <div className="f-chips">{["Hindi", "English", "Marathi"].map((l) => <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(lang === l ? null : l)}>{l}</button>)}</div>
        </div>
      </aside>
      <section>
        <h2>{kind} In {city}</h2>
        <div className="pills">{d.cats.map((c) => <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(cat === c ? null : c)}>{c}</button>)}</div>
        {items.length ? <div className="ev-grid">{items.map((it, i) => <Card key={it.title} it={it} i={i} />)}</div> : <p className="empty">No {kind.toLowerCase()} found. Try clearing the filters.</p>}
      </section>
    </div>
  );
}

export function Stream({ q }) {
  const [i, setI] = useState(0);
  const f = streamItems[i];
  const list = premieres.filter((t) => t.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="stream-hero" style={{ background: `linear-gradient(100deg,${f.c[1]} 30%,${f.c[0]})` }}>
        <div className="stream-in" key={i}>
          <div className="stream-poster" style={{ background: grad(i + 3) }}><b>{f.title}</b></div>
          <div className="stream-text">
            <span className="premiere">▶ PREMIERE</span>
            <p className="s-sub">Brand new releases every Friday</p>
            <h1>{f.title}</h1>
            <p>{f.meta}</p><p>{f.lang}</p>
            <p className="s-desc">{f.desc}</p>
          </div>
        </div>
        <div className="dots">{streamItems.map((_, k) => <i key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} />)}</div>
      </div>
      <div className="wrap">
        <h2>Premiere of the week</h2>
        <div className="ev-grid">{list.map((t, k) => <Card key={t} i={k} it={{ title: t, date: "Streaming now", venue: "Rent • ₹149", lang: "English" }} />)}</div>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        {footerGroups.map(([h, links]) => (
          <div key={h} className="f-group"><h5>{h}</h5><p>{links.map((l) => <a key={l}>{l}</a>)}</p></div>
        ))}
        <div className="f-logo"><span className="logo">book<span>my</span>show</span></div>
        <div className="socials">{["f", "X", "in", "▶", "P"].map((s) => <i key={s}>{s}</i>)}</div>
        <p className="copy">Learning project – a BookMyShow-style demo. All names, posters and events are placeholders.</p>
      </div>
    </footer>
  );
}
