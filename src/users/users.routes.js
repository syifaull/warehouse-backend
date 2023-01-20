import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createUserRest,
  deleteMitraRest,
  deletePenitipRest,
  editProfileMitraRest,
  editProfilePenitipRest,
  editVerifiedRest,
  getMitrabyIDRest,
  getMitraUnverifiedRest,
  getMitraVerifiedRest,
  getProfileMitraRest,
  getProfilePenitipRest,
} from "./users.controller.js";

const router = Router();

router.post("/register", createUserRest);
router.get("/mitra/unverified", getMitraUnverifiedRest);
router.get("/mitra/verified", getMitraVerifiedRest);
router.get("/mitra/:id", getMitrabyIDRest);
router.get("/mitra", verifyToken, getProfileMitraRest);
router.put("/mitra/verify/:id", editVerifiedRest);
router.put("/mitra", verifyToken, editProfileMitraRest);
router.put("/penitip", verifyToken, editProfilePenitipRest);
router.get("/penitip", verifyToken, getProfilePenitipRest);
router.delete("/mitra/:id", deleteMitraRest);
router.delete("/penitip", verifyToken, deletePenitipRest);

export default router;
