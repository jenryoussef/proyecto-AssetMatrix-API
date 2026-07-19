import { Router } from "express";
import { addToWatchlist } from "../controllers/stockController.js";

const router = Router();

router.post("/watch", addToWatchlist);

export default router;
