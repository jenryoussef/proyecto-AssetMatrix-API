export const fetchCoinStats = async (coinId) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data[coinId]) {
        throw new Error(`No se encontraron datos para la criptomoneda: ${coinId}`);
    }

    return data[coinId];
};