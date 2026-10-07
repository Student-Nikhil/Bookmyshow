require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bookmyshow";
console.log("Database:", URI.startsWith("mongodb+srv") ? "Atlas (cloud)" : "local MongoDB");

mongoose.connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => { console.error("MongoDB error:", e.message); process.exit(1); });

module.exports = mongoose;
