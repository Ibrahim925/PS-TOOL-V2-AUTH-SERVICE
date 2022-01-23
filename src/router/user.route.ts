import { Router, Request, Response } from "express";
import { User } from "../db/entity/User";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	console.log("FJLSFJLSDJK");
	res.send("HELLO WORLD");
	const u1: User = await User.create({ userEmail: "HFJLSJKLF" });
});

export default router;
