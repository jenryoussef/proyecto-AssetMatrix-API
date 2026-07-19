import mongoose from "mongoose";

const watchItemSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const Watchlist = mongoose.model("Watchlist", watchItemSchema);

export default Watchlist;
