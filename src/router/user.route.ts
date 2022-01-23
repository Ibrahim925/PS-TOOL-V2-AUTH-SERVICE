import { Router } from "express";
import { create_admin } from "../controller/user.controller";

const router = Router();

// Create (register) user
router.post("/", create_admin);

// Sign in (get) user

export default router;
