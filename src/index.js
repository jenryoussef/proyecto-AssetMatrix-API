import stockRoutes from "./routes/stockRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/stocks", stockRoutes);
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "AssetMatrix API funcionando",
  });
});

if (process.env.NODE_ENV !== "test") {
  connectDB();

  app.listen(PORT, () => {
    console.log(`servidor corriendo exitosamente.`);
  });
}

export default app;
