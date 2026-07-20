import { Router } from "express";
import {
  addToWatchlist,
  getStockPrice,
  getStockHistory,
  removeWatchlistAlert,
} from "../controllers/stockController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { stockWatchSchema } from "../validations/schemas.js";
const router = Router();
router.post("/watch", validateRequest(stockWatchSchema), addToWatchlist);
/**
 * @swagger
 * /stocks/history:
 *   get:
 *     summary: analisis de tendencias históricas
 *     description: obtiene el historial de precios diarios de un activo desde Alpha 
Vantage.
 *     tags:
 *       - Stocks
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: el simbolo del activo (ejemplo IBM)
 *     responses:
 *       200:
 *         description: Historial obtenido correctamente
 *       400:
 *         description: Faltan parametros en la consulta
 *       404:
 *         description: Historial no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/history", getStockHistory);
router.delete("/:id", removeWatchlistAlert);
/**
 * @swagger
 * /stocks/{symbol}:
 *   get:
 *     summary: Consulta precio y volumen real
 *     description: Obtiene datos en tiempo real desde Alpha Vantage.
 *     tags:
 *       - Stocks
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Símbolo del activo (ej. AAPL)
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente
 *       404:
 *         description: Símbolo no encontrado
 */
router.get("/:symbol", getStockPrice);
export default router;
