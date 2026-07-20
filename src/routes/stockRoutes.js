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
 * /stocks/watch:
 *   post:
 *     summary: Guarda ticker en lista de seguimiento
 *     description: Almacena un símbolo financiero en MongoDB.
 *     tags:
 *       - Stocks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - symbol
 *             properties:
 *               symbol:
 *                 type: string
 *                 example: "AAPL"
 *     responses:
 *       201:
 *         description: Activo agregado exitosamente
 *       400:
 *         description: Faltan datos obligatorios
 */
router.post("/watch", validateRequest(stockWatchSchema), addToWatchlist);
/**
 * @swagger
 * /stocks/{id}:
 *   delete:
 *     summary: Elimina alerta de precio
 *     description: Elimina un ticker de la lista de seguimiento por su ID de Mongo.
 *     tags:
 *       - Stocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento en la Watchlist
 *     responses:
 *       200:
 *         description: Alerta eliminada correctamente
 *       404:
 *         description: Activo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", removeWatchlistAlert);

/**
 * @swagger
 * /stocks/history:
 *   get:
 *     summary: analisis de tendencias históricas
 *     description: obtiene el historial de precios diarios de un activo desde Alpha Vantage.
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
