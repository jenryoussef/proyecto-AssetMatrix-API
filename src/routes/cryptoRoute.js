import { Router } from "express";
import { getCoinData } from "../controllers/cryptoController.js";

const router = Router();

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
router.get("/:coin", getCoinData);

export default router;