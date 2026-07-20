import request from "supertest";
import app from "../src/index.js";
describe("pruebas del modulo de Historial (/stocks/history)", () => {
  it("deberia retornar 400 si no se proporciona el simbolo en la URL", async () => {
    const res = await request(app).get("/stocks/history");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(
      "Debes proporcionar un simbolo en la consulta (ej. ?symbol=IBM)",
    );
  });
  it("debera retornar 200 OK y la data historica del activo", async () => {
    const res = await request(app).get("/stocks/history?symbol=IBM");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("symbol", "IBM");
    expect(res.body).toHaveProperty("metaData");
    expect(res.body).toHaveProperty("history");
  }, 10000);
});
