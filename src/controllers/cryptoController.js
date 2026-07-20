import * as cryptoService from "../services/cryptoService.js";

export const getCoinData = async (req, res) => {
  try {
    const { coin } = req.params;
    const stats = await cryptoService.fetchCoinStats(coin.toLowerCase());
    res.status(200).json({
      coinId: coin,
      data: stats,
    });
  } catch (error) {
    if (error.message.includes("No se encontraron datos")) {
      return res.status(404).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: `Error al consultar CoinGecko: ${error.message}` });
  }
};

export const addPortfolioTransaction = async (req, res) => {
  try {
    const { coinId, type, amount, priceAtTransaction } = req.body;

    const transaction = await cryptoService.registerTransaction({
      coinId,
      type,
      amount,
      priceAtTransaction,
    });

    res.status(201).json({
      message: "Transacción registrada en el portafolio",
      data: transaction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al registrar transacción: ${error.message}` });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const analytics = await cryptoService.getPortfolioAnalytics();
    res.status(200).json(analytics);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al generar analíticas: ${error.message}` });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { tx_id } = req.params;
    await cryptoService.revertTransaction(tx_id);

    res
      .status(200)
      .json({ message: "Transacción revertida y eliminada correctamente" });
  } catch (error) {
    if (error.message.includes("Transacción no encontrada")) {
      return res.status(404).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: `Error al revertir la transacción: ${error.message}` });
  }
};
