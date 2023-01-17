import { Router } from "express";
import {
  createUserRest,
  deleteMitraRest,
  // editVerifiedRest,
  getMitrabyIDRest,
  getMitraUnverifiedRest,
  getMitraVerifiedRest,
} from "./users.controller.js";

const router = Router();

router.post("/register", createUserRest);
router.get("/mitra/unverified", getMitraUnverifiedRest);
router.get("/mitra/verified", getMitraVerifiedRest);
router.get("/mitra/:id", getMitrabyIDRest);
// router.get("/mitra", getProfileMitraRest);
// router.put("/mitra/verify/:id", editVerifiedRest);
router.delete("/mitra/:id", deleteMitraRest);

export default router;
