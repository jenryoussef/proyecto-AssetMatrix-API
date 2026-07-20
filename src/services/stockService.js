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

export const fetchStockPrice = async (symbol) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!data["Global Quote"] || Object.keys(data["Global Quote"]).length === 0) {
    throw new Error(`No se encontraron datos para el símbolo: ${symbol}`);
  }
  const quote = data["Global Quote"];
  return {
    symbol: quote["01. symbol"],
    price: parseFloat(quote["05. price"]),
    volume: parseInt(quote["06. volume"]),
    latestTradingDay: quote["07. latest trading day"],
  };
};
export const fetchStockHistory = async (symbol) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey
=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!data["Time Series (Daily)"]) {
    throw new Error(`No se encontró historial para el símbolo: ${symbol}`);
  }
  return {
    symbol: symbol.toUpperCase(),
    metaData: data["Meta Data"],
    history: data["Time Series (Daily)"],
  };
};
