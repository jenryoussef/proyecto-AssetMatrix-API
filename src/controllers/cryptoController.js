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