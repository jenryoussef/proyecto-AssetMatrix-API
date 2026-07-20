import request from "supertest";
import mongoose from "mongoose";
import app from "../src/index.js";
import Watchlist from "../src/models/Watchlist.js";
import dotenv from "dotenv";
dotenv.config();

describe("Pruebas Unitarias - Módulo Stocks", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  afterAll(async () => {
    await Watchlist.deleteMany({});
    await mongoose.connection.close();
  });
  let savedItemId;
  describe("POST /stocks/watch", () => {
    it("debería registrar un ticker exitosamente y retornar 201", async () => {
      const res = await request(app)
        .post("/stocks/watch")
        .send({ symbol: "TSLA" });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty("symbol", "TSLA");
      savedItemId = res.body.data._id;
    });
    it("debería retornar 400 si falla la validación (sin símbolo)", async () => {
      const res = await request(app).post("/stocks/watch").send({});
      expect(res.statusCode).toEqual(400);
    });
  });
  describe("DELETE /stocks/:id", () => {
    it("debería eliminar una alerta de precio existente y retornar 200", async () => {
      const res = await request(app).delete(`/stocks/${savedItemId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe("Alerta eliminada correctamente");
    });
    it("debería retornar 404 si el ID no existe", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/stocks/${fakeId}`);
      expect(res.statusCode).toEqual(404);
    });
  });
});
