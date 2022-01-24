import { Router } from "express";
import { create_admin, user_sign_in } from "../controller/user.controller";

const router: Router = Router();

// Create (register) user
router.post("/", create_admin);

// Read (sign in) user
router.get("/", user_sign_in);

export default router;
