import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createGudangRest,
  getAllGudangRest,
  updateGudangRest,
} from "./gudang.controller.js";

const router = Router();

router.post("/gudang", verifyToken, createGudangRest);
router.get("/gudang", verifyToken, getAllGudangRest);
router.put("/gudang", verifyToken, updateGudangRest);

export default router;
