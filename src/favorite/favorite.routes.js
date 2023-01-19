import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { createFavoriteRest } from "./favorite.controller.js";

const router = Router();

router.post("/favorite", verifyToken, createFavoriteRest);

export default router;
