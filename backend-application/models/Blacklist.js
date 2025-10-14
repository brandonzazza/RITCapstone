// models/Blacklist.js
import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true }, // Automatic Cleanup
});

export default mongoose.model("Blacklist", blacklistSchema);
