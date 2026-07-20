import Joi from "joi";

export const stockWatchSchema = Joi.object({
  symbol: Joi.string().trim().required().messages({
    "any.required": "El símbolo del activo (ticker) es obligatorio",
    "string.empty": "El símbolo no puede estar vacío",
  }),
});
