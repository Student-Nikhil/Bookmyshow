const mongoose = require("./connection");
const seatKeys = ["A1","A2","B1","B2","C1","C2","D1","D2"];
const seats = {};
seatKeys.forEach((k) => (seats[k] = { type: Number, default: 0, min: 0 }));
const bookingSchema = new mongoose.Schema(
  { movie: { type: String, required: true }, slot: { type: String, required: true }, seats,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null } },
  { timestamps: true }
);
const userSchema = new mongoose.Schema(
  { name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true } },
  { timestamps: true }
);
module.exports = { Booking: mongoose.model("Booking", bookingSchema), User: mongoose.model("User", userSchema), seatKeys };
