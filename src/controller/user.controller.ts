import { User } from "../db/entity/User";
import { connection } from "../db/connection";
import { Response } from "express";
import { CustomRequest } from "../types";

interface CreateUserRequest {
	userEmail: string;
	userPassword: string;
}

// Used by POST /user/
export const create_user = async (
	req: CustomRequest<CreateUserRequest>,
	res: Response
): Promise<any> => {
	await User.create({
		userEmail: req.body.userEmail,
		userPassword: req.body.userPassword,
		userType: "ADMIN",
		userProject: null,
	});
};
