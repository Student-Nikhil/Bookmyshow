const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Booking, User, seatKeys } = require("./Schema");

const SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";
const app = express();
app.use(cors());
app.use(express.json());

// Reads the token if present; booking endpoints still work without it.
const optionalAuth = (req, _res, next) => {
  const t = (req.headers.authorization || "").replace("Bearer ", "");
  try { req.userId = t ? jwt.verify(t, SECRET).id : null; } catch { req.userId = null; }
  next();
};
const sign = (u) => jwt.sign({ id: u._id }, SECRET, { expiresIn: "7d" });
const pub = (u) => ({ name: u.name, email: u.email });

// ---------- Auth ----------
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(422).json({ message: "Name, email and password are required" });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(422).json({ message: "Enter a valid email address" });
    if (password.length < 6) return res.status(422).json({ message: "Password must be at least 6 characters" });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: "An account with this email already exists" });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.status(201).json({ token: sign(user), user: pub(user) });
  } catch { res.status(500).json({ message: "Server error" }); }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = email && (await User.findOne({ email: String(email).toLowerCase() }));
    if (!user || !(await bcrypt.compare(String(password || ""), user.password)))
      return res.status(401).json({ message: "Incorrect email or password" });
    res.json({ token: sign(user), user: pub(user) });
  } catch { res.status(500).json({ message: "Server error" }); }
});

app.get("/api/auth/me", optionalAuth, async (req, res) => {
  const user = req.userId && (await User.findById(req.userId));
  if (!user) return res.status(401).json({ message: "Not signed in" });
  res.json({ user: pub(user) });
});

// ---------- Booking ----------
app.post("/api/booking", optionalAuth, async (req, res) => {
  try {
    const { movie, slot, seats } = req.body || {};
    if (!movie || !slot || typeof seats !== "object" || seats === null)
      return res.status(422).json({ message: "movie, slot and seats are required" });
    const clean = {};
    let total = 0;
    for (const k of seatKeys) {
      const n = Number(seats[k] || 0);
      if (!Number.isInteger(n) || n < 0) return res.status(422).json({ message: `Invalid seat count for ${k}` });
      clean[k] = n; total += n;
    }
    if (total < 1) return res.status(422).json({ message: "Select at least one seat" });
    await Booking.create({ movie, slot, seats: clean, user: req.userId });
    res.status(200).json({ message: "Booking successful" });
  } catch { res.status(500).json({ message: "Server error" }); }
});

app.get("/api/booking", optionalAuth, async (req, res) => {
  try {
    const last = await Booking.findOne({ user: req.userId || null }).sort({ createdAt: -1 }).lean();
    if (!last) return res.status(200).json({ message: "no previous booking found" });
    res.status(200).json({ movie: last.movie, seats: last.seats, slot: last.slot });
  } catch { res.status(500).json({ message: "Server error" }); }
});

app.use((_req, res) => res.status(404).json({ message: "Invalid endpoint" }));
app.listen(8080, () => console.log("API listening on http://localhost:8080"));
