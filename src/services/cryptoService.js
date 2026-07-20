import Portfolio from "../models/Portfolio.js";

export const registerTransaction = async (transactionData) => {
  const newTransaction = new Portfolio(transactionData);
  return await newTransaction.save();
};

export const getPortfolioAnalytics = async () => {
  const transactions = await Portfolio.find().sort({ date: -1 });

  let totalInvested = 0;
  let totalSold = 0;

  transactions.forEach((tx) => {
    const value = tx.amount * tx.priceAtTransaction;
    if (tx.type === "buy") {
      totalInvested += value;
    } else if (tx.type === "sell") {
      totalSold += value;
    }
  });

  // redondeo a 2 decimales para evitar el error de punto flotante de JS
  totalInvested = Number(totalInvested.toFixed(2));
  totalSold = Number(totalSold.toFixed(2));

  const balance = Number((totalInvested - totalSold).toFixed(2));

  return {
    balance,
    totalInvested,
    totalSold,
    transactionCount: transactions.length,
    transactions,
  };
};

export const revertTransaction = async (txId) => {
  const deletedTransaction = await Portfolio.findByIdAndDelete(txId);
  if (!deletedTransaction) {
    throw new Error("Transacción no encontrada en el portafolio");
  }
  return deletedTransaction;
};

export const fetchCoinStats = async (coinId) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data[coinId]) {
    throw new Error(`No se encontraron datos para la criptomoneda: ${coinId}`);
  }

  return data[coinId];
};
