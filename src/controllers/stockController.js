import * as stockService from "../services/stockService.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { symbol } = req.body;
    if (!symbol) {
      return res
        .status(400)
        .json({ error: "el simbolo (ticker) es obligatorio" });
    }
    const newWatchItem = await stockService.addStockToWatchlist(symbol);
    res.status(201).json({
      message: "ACTIVO AGREGADO a la lista de seguimiento",
      data: newWatchItem,
    });
  } catch (error) {
    res.status(500).json({ error: `ERROR EN EL SERVIDOR: ${error.message}` });
  }
};

export const removeWatchlistAlert = async (req, res) => {
  try {
    const { id } = req.params;
    await stockService.deleteStockFromWatchlist(id);
    res.status(200).json({ message: "Alerta eliminada correctamente" });
  } catch (error) {
    if (error.message === "Activo no encontrado") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: `Error del servidor: ${error.message}` });
  }
};

export const getStockPrice = async (req, res) => {
  try {
    const { symbol } = req.params;
    const quoteData = await stockService.fetchStockPrice(symbol);
    res.status(200).json(quoteData);
  } catch (error) {
    if (error.message.includes("No se encontraron datos")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({
      error: `error al conectar con el proveedor externo: ${error.message}`,
    });
  }
};
export const getStockHistory = async (req, res) => {
  try {
    const { symbol } = req.query;
    if (!symbol) {
      return res.status(400).json({
        error: "Debes proporcionar un simbolo en la consulta (ej. ?symbol=IBM)",
      });
    }
    const historyData = await stockService.fetchStockHistory(symbol);
    res.status(200).json(historyData);
  } catch (error) {
    if (error.message.includes("No se encontró historial")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({
      error: `error interno al consultar el historial: ${error.message}`,
    });
  }
};
