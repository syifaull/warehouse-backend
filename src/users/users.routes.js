import { Router } from "express";
import {
  createUserRest,
  getMitrabyIDRest,
  getMitraUnverifiedRest,
  getMitraVerifiedRest,
} from "./users.controller.js";

const router = Router();

router.post("/register", createUserRest);
router.get("/mitra/unverified", getMitraUnverifiedRest);
router.get("/mitra/verified", getMitraVerifiedRest);
router.get("/mitra/:id", getMitrabyIDRest);

export default router;
