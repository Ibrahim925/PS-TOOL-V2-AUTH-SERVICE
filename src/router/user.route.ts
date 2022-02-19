import { Router } from "express";
import {
	create_admin,
	update_user_password,
	user_sign_in,
} from "../controller/user.controller";
import authenticateAccessToken from "../middlewares/authenticateAccessToken";

const router: Router = Router();

// Create (register) user
router.post("/", create_admin);

// Create user token on sign in
router.post("/token", user_sign_in);

// Change user password
router.put("/", authenticateAccessToken, update_user_password);

export default router;
