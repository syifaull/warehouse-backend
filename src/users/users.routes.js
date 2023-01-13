import { Router } from "express";
import {
  createUserRest,
  getMitraUnverifiedRest,
  getMitraVerifiedRest,
} from "./users.controller.js";

const router = Router();

router.post("/register", createUserRest);
router.get("/mitra/unverified", getMitraUnverifiedRest);
router.get("/mitra/verified", getMitraVerifiedRest);

export default router;
