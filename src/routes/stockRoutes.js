import { Router } from "express";
import {
  addToWatchlist,
  removeWatchlistAlert,
} from "../controllers/stockController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { stockWatchSchema } from "../validations/schemas.js";

const router = Router();

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

export default router;
