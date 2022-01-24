import { Router } from "express";
import authenticateRefreshToken from "../middlewares/authenticateRefreshToken";
import { create_access_token } from "../controller/token.controller";

const router: Router = Router();

// Create access token
router.post("/", authenticateRefreshToken, create_access_token);

export default router;
