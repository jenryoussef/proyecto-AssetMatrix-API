import request from "supertest";
import Watchlist from "../src/models/Watchlist.js";

describe("Pruebas Unitarias - Modelo Watchlist", () => {
  it("deberia validar correctamente un simbolo valido", () => {
    const item = new Watchlist({ symbol: "aapl" });
    const validation = item.validateSync();
    expect(validation).toBeUndefined();
    expect(item.symbol).toBe("AAPL");
  });
  it("deberia fallar si el simbolo esta ausente", () => {
    const item = new Watchlist({});
    const validation = item.validateSync();
    expect(validation.errors.symbol).toBeDefined();
    expect(validation.errors.symbol.message).toBe(
      "el simbolo del activo (ticker) es obligatorio",
    );
  });
  it("deberaa limpiar espacios en blanco del simbolo", () => {
    const item = new Watchlist({ symbol: "  btc  " });
    expect(item.symbol).toBe("BTC");
  });
});
