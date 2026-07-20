import request from "supertest";
import mongoose from "mongoose";
import app from "../src/index.js";

describe("Pruebas de Integración - Flujo Completo AssetMatrix", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
    await mongoose.connection.close();
  });
  it("Flujo Crypto: El usuario compra cripto, verifica analytics y luego revierte la transacción", async () => {
    const buyRes = await request(app).post("/crypto/portfolio").send({
      coinId: "bitcoin",
      type: "buy",
      amount: 1,
      priceAtTransaction: 50000,
    });
    expect(buyRes.statusCode).toBe(201);
    const txId = buyRes.body.data._id;

    const analyticsRes = await request(app).get("/crypto/analytics");
    expect(analyticsRes.statusCode).toBe(200);
    expect(analyticsRes.body.transactions.length).toBeGreaterThan(0);

    const deleteRes = await request(app).delete(`/crypto/${txId}`);
    expect(deleteRes.statusCode).toBe(200);

    const finalAnalytics = await request(app).get("/crypto/analytics");
    expect(finalAnalytics.body.transactions.length).toBe(0);
  });
});
