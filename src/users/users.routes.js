import { Router } from "express";
import { createUserRest } from "./users.controller.js";

const router = Router();

router.post("/register", createUserRest);

export default router;
