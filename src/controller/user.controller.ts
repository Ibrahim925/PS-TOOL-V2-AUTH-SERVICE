import { User } from "../db/entity/User";
import { connection } from "../db/connection";
import { Response } from "express";
import { CustomRequest } from "../types";

interface CreateUserRequest {
	userEmail: string;
	userPassword: string;
}

export const create_user = async (
	req: CustomRequest<CreateUserRequest>,
	res: Response
): Promise<any> => {
	console.log(req.body.userEmail, req.body.userPassword);
	res.json("SUCCESS");
};
