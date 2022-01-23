import { User } from "../db/entity/User";
import { connection } from "../db/connection";
import { Response } from "express";
import { CustomRequest } from "../types";

interface CreateAdminRequest {
	userEmail: string;
	userPassword: string;
}

// Used by POST /user/
export const create_admin = async (
	req: CustomRequest<CreateAdminRequest>,
	res: Response
): Promise<any> => {
	const { userEmail, userPassword } = req.body;

	// Check email format

	// Check user already exists

	// Turn password

	const newAdmin = new User();
	newAdmin.userEmail = userEmail;
	newAdmin.userPassword = userPassword;
	newAdmin.userProject = null;
	newAdmin.userType = "ADMIN";
	await connection.manager.save(newAdmin);

	res.send("succcess");
};
