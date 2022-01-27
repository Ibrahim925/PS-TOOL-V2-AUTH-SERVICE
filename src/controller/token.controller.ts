import { Response } from "express";
import { CustomRequest } from "../types";
import { createAccessToken } from "../helpers/tokenCreation";

export const create_access_token = async (
	req: CustomRequest<{}, {}, {}>,
	res: Response
) => {
	const { id } = req;

	const accessToken = createAccessToken(id);

	res.json({ accessToken });
};
