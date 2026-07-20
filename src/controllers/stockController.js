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
