import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  coinId: { type: String, required: true, lowercase: true },
  type: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
    lowercase: true,
  },
  amount: { type: Number, required: true },
  priceAtTransaction: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Portfolio", portfolioSchema);
