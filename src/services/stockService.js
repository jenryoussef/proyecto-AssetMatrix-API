import Watchlist from "../models/Watchlist.js";

export const addStockToWatchlist = async (symbol) => {
  const newWatchItem = new Watchlist({ symbol });
  return await newWatchItem.save();
};
