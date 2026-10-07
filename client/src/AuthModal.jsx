import { useState } from "react";

export default function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await res.json();
      if (!res.ok) setErr(data.message || "Something went wrong");
      else onSuccess(data);
    } catch { setErr("Unable to reach the server."); }
    setBusy(false);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <button type="button" className="close" aria-label="Close" onClick={onClose}>×</button>
        <h3>{mode === "login" ? "Sign in" : "Create your account"}</h3>
        <div className="tabs">
          <button type="button" className={mode === "login" ? "on" : ""} onClick={() => { setMode("login"); setErr(""); }}>Login</button>
          <button type="button" className={mode === "signup" ? "on" : ""} onClick={() => { setMode("signup"); setErr(""); }}>Sign up</button>
        </div>
        {mode === "signup" && <input placeholder="Full name" value={f.name} onChange={set("name")} autoComplete="name" required />}
        <input type="email" placeholder="Email address" value={f.email} onChange={set("email")} autoComplete="email" required />
        <input type="password" placeholder="Password (min 6 characters)" value={f.password} onChange={set("password")}
               autoComplete={mode === "login" ? "current-password" : "new-password"} required />
        {err && <p className="form-err">{err}</p>}
        <button className="book-btn" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Login" : "Create account"}</button>
      </form>
    </div>
  );
}
