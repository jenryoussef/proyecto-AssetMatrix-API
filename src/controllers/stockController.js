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
