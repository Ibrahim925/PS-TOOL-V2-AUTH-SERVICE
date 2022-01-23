import { Router } from "express";
import { create_user } from "../controller/user.controller";

const router = Router();

// Create (register) user
router.post("/", create_user);

export default router;
