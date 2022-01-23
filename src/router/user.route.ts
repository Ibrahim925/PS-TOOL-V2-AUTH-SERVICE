import { Router, Request, Response } from "express";
import { User } from "../db/entity/User";
import { getConnection } from "typeorm";

const router = Router();

const connection = getConnection();

router.get("/", async (req: Request, res: Response) => {
	const user = new User();
	user.userEmail = "BOB IS COOL";
	user.userPassword = "FJLSFLKSD";
	user.userProject = "FLKDJSFLDS";
	user.userType = "ADMIN";
	await connection.manager.save(user);
	res.send("User added!");
});

export default router;
