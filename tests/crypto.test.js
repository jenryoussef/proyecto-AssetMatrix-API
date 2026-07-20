import request from "supertest";
import mongoose from "mongoose";
import app from "../src/index.js";
import Portfolio from "../src/models/Portfolio.js";

describe("Pruebas Unitarias - Módulo Crypto", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  afterAll(async () => {
    await Portfolio.deleteMany({});
    await mongoose.connection.close();
  });

  describe("GET /crypto/:coin", () => {
    it("debería retornar datos del mercado (CoinGecko API)", async () => {
      const res = await request(app).get("/crypto/bitcoin");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("coinId", "bitcoin");
      expect(res.body.data).toHaveProperty("usd_market_cap");
    });
  });

  describe("POST /crypto/portfolio", () => {
    it("debería registrar una transacción BUY en MongoDB", async () => {
      const payload = {
        coinId: "ethereum",
        type: "buy",
        amount: 2.5,
        priceAtTransaction: 2000,
      };

      const res = await request(app).post("/crypto/portfolio").send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body.data.coinId).toBe("ethereum");
    });
  });

  describe("DELETE /crypto/:tx_id", () => {
    it("debería revertir y eliminar una transacción existente", async () => {
      const created = await request(app).post("/crypto/portfolio").send({
        coinId: "bitcoin",
        type: "buy",
        amount: 0.1,
        priceAtTransaction: 50000,
      });

      const txId = created.body.data._id;
      const res = await request(app).delete(`/crypto/${txId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/eliminada correctamente/);
    });
    it("debería retornar 404 si el ID no existe", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/crypto/${fakeId}`);

      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /crypto/analytics", () => {
    it("debería calcular correctamente el balance de compras y ventas", async () => {
      await request(app).post("/crypto/portfolio").send({
        coinId: "solana",
        type: "buy",
        amount: 10,
        priceAtTransaction: 100,
      });
      await request(app).post("/crypto/portfolio").send({
        coinId: "solana",
        type: "sell",
        amount: 5,
        priceAtTransaction: 120,
      });

      const res = await request(app).get("/crypto/analytics");

      expect(res.statusCode).toBe(200);
      expect(res.body.totalInvested).toBeGreaterThanOrEqual(1000);
      expect(res.body.totalSold).toBeGreaterThanOrEqual(600);
    });
  });
});
