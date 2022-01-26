import { Response } from "express";
import { CustomRequest } from "../types";
import { createAccessToken } from "../helpers/tokenCreation";

export const create_access_token = async (
	req: CustomRequest<{}, { id: number }, {}>,
	res: Response
) => {
	const { id } = req.body;

	const accessToken = createAccessToken(id);

	res.json({ accessToken });
};
