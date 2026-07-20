import Joi from "joi";

export const stockWatchSchema = Joi.object({
  symbol: Joi.string().trim().required().messages({
    "any.required": "El símbolo del activo (ticker) es obligatorio",
    "string.empty": "El símbolo no puede estar vacío",
  }),
});

export const cryptoPortfolioSchema = Joi.object({
  coinId: Joi.string().trim().lowercase().required(),
  type: Joi.string().valid("buy", "sell").required(),
  amount: Joi.number().positive().required(),
  priceAtTransaction: Joi.number().positive().required(),
});
