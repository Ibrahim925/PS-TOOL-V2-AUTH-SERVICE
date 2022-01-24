import * as jwt from "jsonwebtoken";
import "dotenv/config";

export const createRefreshToken = (id: number) => {
	const token = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET);

	return token;
};

export const createAccessToken = (id: number) => {
	const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15s",
	});

	return token;
};
