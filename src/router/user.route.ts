import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	console.log("FJLSFJLSDJK");
	res.send("HELLO WORLD");
});

export default router;
