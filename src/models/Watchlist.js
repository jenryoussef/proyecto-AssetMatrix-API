import mongoose from "mongoose";

const watchItemSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: [true, "el simbolo del activo (ticker) es obligatorio"],
      uppercase: true,
      trim: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Watchlist = mongoose.model("Watchlist", watchItemSchema);

export default Watchlist;
