import Watchlist from "../models/Watchlist.js";

export const addStockToWatchlist = async (symbol) => {
  const newWatchItem = new Watchlist({ symbol });
  return await newWatchItem.save();
};

export const deleteStockFromWatchlist = async (id) => {
  const deletedItem = await Watchlist.findByIdAndDelete(id);
  if (!deletedItem) throw new Error("Activo no encontrado");
  return deletedItem;
};
