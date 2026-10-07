import { useEffect, useState } from "react";
import AuthModal from "./AuthModal.jsx";
import { Hero, Explore, Stream, Footer } from "./Pages.jsx";
import { moviesList, slots, seats as seatTypes, movieMeta, seatInfo, cities, tabs } from "./data.js";

const read = (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const emptySeats = () => Object.fromEntries(seatTypes.map((s) => [s, 0]));

export default function App() {
  const [theme, setTheme] = useState(() => read("theme", "light"));
  const [movie, setMovie] = useState(() => read("movie", ""));
  const [slot, setSlot] = useState(() => read("slot", ""));
  const [seats, setSeats] = useState(() => ({ ...emptySeats(), ...read("seats", {}) }));
  const [last, setLast] = useState(undefined);
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState("Movies");
  const [city, setCity] = useState(() => read("city", "Pune"));
  const [q, setQ] = useState("");
  useEffect(() => write("city", city), [city]);
  const goTab = (t) => { setTab(t); setQ(""); window.scrollTo({ top: 0 }); };
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const auth = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => { document.documentElement.dataset.theme = theme; write("theme", theme); }, [theme]);
  useEffect(() => write("movie", movie), [movie]);
  useEffect(() => write("slot", slot), [slot]);
  useEffect(() => write("seats", seats), [seats]);
  useEffect(() => {
    setLast(undefined);
    fetch("/api/booking", { headers: auth }).then((r) => r.json()).then(setLast).catch(() => setLast({ message: "no previous booking found" }));
    if (token) {
      fetch("/api/auth/me", { headers: auth }).then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => setUser(d.user)).catch(() => logout(true));
    } else setUser(null);
  }, [token]);

  const onAuth = (d) => {
    localStorage.setItem("token", d.token); setToken(d.token); setUser(d.user); setShowAuth(false);
    show("success", `Welcome, ${d.user.name.split(" ")[0]}!`);
  };
  function logout(silent) {
    localStorage.removeItem("token"); setToken(""); setUser(null);
    if (silent !== true) show("success", "You have been logged out.");
  }

  const total = Object.values(seats).reduce((a, b) => a + Number(b || 0), 0);
  const amount = seatTypes.reduce((a, t) => a + (seats[t] || 0) * seatInfo[t][1], 0);
  const show = (type, text) => { setToast({ type, text }); setTimeout(() => setToast(null), 3200); };
  const setSeat = (k, v) => setSeats((s) => ({ ...s, [k]: Math.min(10, Math.max(0, parseInt(v, 10) || 0)) }));

  const submit = async () => {
    if (!user) { setShowAuth(true); return show("error", "Please sign in to book tickets."); }
    if (!movie) return show("error", "Please select a movie.");
    if (!slot) return show("error", "Please select a show time.");
    if (total < 1) return show("error", "Please select at least one seat.");
    setBusy(true);
    const payload = { movie, seats, slot };
    try {
      const res = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json", ...auth }, body: JSON.stringify(payload) });
      if (res.status === 200) {
        setLast(payload);
        setMovie(""); setSlot(""); setSeats(emptySeats());
        ["movie", "slot", "seats"].forEach((k) => localStorage.removeItem(k));
        show("success", "Booking confirmed!");
      } else show("error", "Booking failed. Please try again.");
    } catch { show("error", "Unable to reach the server."); }
    setBusy(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-inner">
          <div className="logo" onClick={() => goTab("Movies")}>book<span>my</span>show</div>
          <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for Movies, Events, Plays, Sports and Activities" aria-label="Search" />
          <select className="city" value={city} onChange={(e) => setCity(e.target.value)} aria-label="City">{cities.map((c) => <option key={c}>{c}</option>)}</select>
          {user ? (
            <div className="user-box"><span className="avatar">{user.name[0].toUpperCase()}</span><span className="uname">{user.name.split(" ")[0]}</span>
              <button className="theme-btn" onClick={() => logout()}>Logout</button></div>
          ) : <button className="signin-btn" onClick={() => setShowAuth(true)}>Sign in</button>}
          <button className="theme-btn" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "☀" : "☾"}</button>
        </div>
        <nav className="subnav"><div className="nav-inner">
          {tabs.map((t) => <a key={t} className={tab === t ? "on" : ""} onClick={() => goTab(t)}>{t}</a>)}
          <span className="sub-right"><a>ListYourShow</a><a>Corporates</a><a>Offers</a><a>Gift Cards</a></span>
        </div></nav>
      </header>

      {tab === "Movies" ? (
        <>
          <Hero />
          <div className="wrap" id="recommended">
            <div className="sec-head"><h2>Recommended Movies</h2><span className="see">Select a movie to book ›</span></div>
            <div className="movie-row">
              {moviesList.filter((m) => m.toLowerCase().includes(q.toLowerCase())).map((m) => {
                const meta = movieMeta[m] || { rating: "7.0", genre: "", lang: "", c: ["#444", "#111"] };
                return (
                  <div key={m} className={`movie-column ${movie === m ? "movie-column-selected selected" : ""}`}
                       onClick={() => setMovie(m)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setMovie(m)}>
                    <div className="poster" style={{ background: `linear-gradient(160deg,${meta.c[0]},${meta.c[1]})` }}>
                      <span className="poster-title">{m}</span>
                      <span className="rating">★ {meta.rating}/10</span>
                    </div>
                    <div className="m-name">{m}</div>
                    <div className="m-sub">{meta.genre}{meta.lang && ` • ${meta.lang}`}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <main className="layout">
            <section className="main-col">
              <div className="section">
                <h2>Select show time</h2>
                <div className="slot-row">
                  {slots.map((s) => (
                    <div key={s} className={`slot-column ${slot === s ? "slot-column-selected selected" : ""}`}
                         onClick={() => setSlot(s)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setSlot(s)}>{s}</div>
                  ))}
                </div>
              </div>
              <div className="section">
                <h2>Select seats</h2>
                <div className="seat-row">
                  {seatTypes.map((t) => (
                    <div key={t} className={`seat-column ${seats[t] > 0 ? "seat-column-selected selected" : ""}`}>
                      <div><h4>Type {t}</h4><small>{seatInfo[t][0]} • ₹{seatInfo[t][1]}</small></div>
                      <div className="stepper">
                        <button type="button" aria-label={`Remove ${t} seat`} onClick={() => setSeat(t, seats[t] - 1)}>−</button>
                        <input id={`seat-${t}`} type="number" min="0" max="10" value={seats[t] || ""} placeholder="0" onChange={(e) => setSeat(t, e.target.value)} />
                        <button type="button" aria-label={`Add ${t} seat`} onClick={() => setSeat(t, (seats[t] || 0) + 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <aside className="side-col">
              <div className="card summary">
                <h3>Booking summary</h3>
                <div className="row"><span>Movie</span><b>{movie || "—"}</b></div>
                <div className="row"><span>Show time</span><b>{slot || "—"}</b></div>
                <div className="row"><span>Tickets</span><b>{total}</b></div>
                <div className="row total"><span>Total</span><b>₹{amount}</b></div>
                <button className="book-btn" onClick={submit} disabled={busy}>{busy ? "Processing…" : "Book tickets"}</button>
              </div>
              <div className="card last-booking">
                <h3>Last Booking Details</h3>
                {last === undefined ? <div className="skeleton" /> :
                  last.message ? <p className="empty">{last.message}</p> : (
                  <div className="ticket">
                    <p className="t-movie">{last.movie}</p>
                    <p className="t-slot">{last.slot}</p>
                    <ul className="seats-list">
                      {seatTypes.map((t) => <li key={t}><span>{t}</span><b>{last.seats?.[t] ?? 0}</b></li>)}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </main>
        </>
      ) : tab === "Stream" ? <Stream q={q} /> : <Explore kind={tab} city={city} q={q} />}

      <Footer />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={onAuth} />}
      {toast && <div className={`toast ${toast.type}`} role="status">{toast.text}</div>}
    </>
  );
}
