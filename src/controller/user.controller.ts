import { User } from "../db/entity/User";
import { connection } from "../db/connection";
import { Response } from "express";
import { CustomRequest, Errors } from "../types";
import {
	validateEmail,
	validateLogiSenseEmail,
} from "../helpers/emailValidation";
import * as bcrypt from "bcryptjs";

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

	let errors: Errors;

	// Check email format
	if (!validateEmail(userEmail)) {
		errors = {
			errors: [
				{ message: "Please enter a valid email", location: "emailInput" },
			],
		};

		return res.json(errors);
	}

	if (!validateLogiSenseEmail(userEmail)) {
		errors = {
			errors: [
				{ message: "Please enter a LogiSense email!", location: "emailInput" },
			],
		};

		return res.json(errors);
	}

	// Check if user already exists
	const foundUser = await connection
		.getRepository(User)
		.createQueryBuilder("user")
		.where("user.userEmail = :userEmail", { userEmail })
		.getOne();

	if (foundUser) {
		errors = {
			errors: [
				{
					message: "An account with this email already exists",
					location: "emailInput",
				},
			],
		};

		return res.json(errors);
	}

	// Encrypt password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(userPassword, salt);

	// Save user
	const newAdmin: User = new User();
	newAdmin.userEmail = userEmail;
	newAdmin.userPassword = hashedPassword;
	newAdmin.userProject = null;
	newAdmin.userType = "ADMIN";
	await connection.manager.save(newAdmin);

	res.json(newAdmin);
};
