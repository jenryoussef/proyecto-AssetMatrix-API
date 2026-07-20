import { Router } from "express";
import {
  getCoinData,
  addPortfolioTransaction,
  getAnalytics,
  deleteTransaction,
} from "../controllers/cryptoController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { cryptoPortfolioSchema } from "../validations/schemas.js";

const router = Router();

/**
 * @swagger
 * /crypto/portfolio:
 *   post:
 *     summary: Registra transacción de compra/venta
 *     tags: [Crypto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [coinId, type, amount, priceAtTransaction]
 *             properties:
 *               coinId: { type: string, example: "bitcoin" }
 *               type: { type: string, example: "buy" }
 *               amount: { type: number, example: 0.5 }
 *               priceAtTransaction: { type: number, example: 45000.00 }
 *     responses:
 *       201:
 *         description: Transacción registrada en el portafolio exitosamente
 *       500:
 *         description: Error al registrar la transacción
 */
router.post(
  "/portfolio",
  validateRequest(cryptoPortfolioSchema),
  addPortfolioTransaction,
);

/**
 * @swagger
 * /crypto/analytics:
 *   get:
 *     summary: Balance total de cartera histórica
 *     tags: [Crypto]
 *     responses:
 *       200:
 *         description: Analíticas generadas correctamente
 *       500:
 *         description: Error al generar analíticas
 */
router.get("/analytics", getAnalytics);

/**
 * @swagger
 * /crypto/{tx_id}:
 *   delete:
 *     summary: Revierte registro de transacción
 *     tags: [Crypto]
 *     parameters:
 *       - in: path
 *         name: tx_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Transacción revertida y eliminada correctamente
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error al revertir la transacción
 */

/**
 * @swagger
 * /crypto/{coin}:
 *   get:
 *     summary: Market cap y fluctuación 24h
 *     description: Obtiene los datos de capitalización de mercado y fluctuación en las últimas 24 horas a través de la API de CoinGecko.
 *     tags:
 *       - Crypto
 *     parameters:
 *       - in: path
 *         name: coin
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador de la criptomoneda (ej. bitcoin)
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente
 *       404:
 *         description: No se encontraron datos para la moneda especificada
 *       500:
 *         description: Error al consultar la API externa
 */

router.delete("/:tx_id", deleteTransaction);
router.get("/:coin", getCoinData);

export default router;
