import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createFavoriteRest,
  deleteFavoriteRest,
} from "./favorite.controller.js";

const router = Router();

router.post("/favorite", verifyToken, createFavoriteRest);
// router.get("/favorite", verifyToken, getFavoriteRest);
router.delete("/favorite/:id", verifyToken, deleteFavoriteRest);

export default router;
