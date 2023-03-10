import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createLahanRest,
  deleteLahanRest,
  editLahanRest,
  getLahanGudangRest,
  getLahanRest,
} from "./lahan.controller.js";

const router = Router();

router.post("/lahan", verifyToken, createLahanRest);
router.get("/lahan/:id", verifyToken, getLahanRest);
router.delete("/lahan/:id", verifyToken, deleteLahanRest);
router.get("/gudang/:id/lahan", verifyToken, getLahanGudangRest);
router.put("/lahan/:id", verifyToken, editLahanRest);

export default router;
