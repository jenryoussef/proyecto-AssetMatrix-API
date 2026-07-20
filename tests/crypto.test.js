import request from "supertest";
import mongoose from "mongoose";
import app from "../src/index.js";

describe("Pruebas Unitarias - Módulo Crypto", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
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
});
