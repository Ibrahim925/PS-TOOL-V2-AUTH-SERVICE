import { Response } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv";
import { CustomRequest } from "../types";
import { Token } from "../db/entity/Token";
import { connection } from "../db/connection";
import { User } from "../db/entity/User";

const authenticateRefreshToken = (
	req: CustomRequest<{}, {}, {}>,
	res: Response,
	next
) => {
	const authHeader: string = req.headers["authorization"];
	if (!authHeader) return res.sendStatus(401);
	const token = authHeader.split(" ")[1];

	console.log("AUTH HEADER TOKEN: ", token);

	if (token === null) return res.sendStatus(401);

	jwt.verify(
		token,
		process.env.REFRESH_TOKEN_SECRET,
		async (error, data: { id: number }) => {
			if (error) return res.sendStatus(401);

			// Check if refresh token is in token table
			const refreshToken = await connection
				.getRepository(Token)
				.findOne({ where: { token, userId: data.id } });

			// Check if user with specific refresh token exists in database
			const user = await connection
				.getRepository(User)
				.findOne({ where: { id: data.id } });

			if (!refreshToken || !user) {
				return res.sendStatus(401);
			}

			req.id = data.id;
			next();
		}
	);
};

export default authenticateRefreshToken;
