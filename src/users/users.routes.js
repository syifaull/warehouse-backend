import { Router } from "express";
import { createUserRest, getMitraUnverifiedRest } from "./users.controller.js";

const router = Router();

router.post("/register", createUserRest);
router.get("/mitra/unverified", getMitraUnverifiedRest);

export default router;
