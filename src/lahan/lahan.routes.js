import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { createLahanRest } from "./lahan.controller.js";

const router = Router();

router.post("/lahan", verifyToken, createLahanRest);
// router.get("/gudang", verifyToken, getAllGudangRest);

export default router;
