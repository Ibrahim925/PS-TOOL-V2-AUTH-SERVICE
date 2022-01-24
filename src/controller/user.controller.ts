import { User } from "../db/entity/User";
import { connection } from "../db/connection";
import { Response } from "express";
import { CustomRequest, Errors } from "../types";
import {
	validateEmail,
	validateLogiSenseEmail,
} from "../helpers/emailValidation";
import * as bcrypt from "bcryptjs";
import { uuid } from "uuidv4";
import * as nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";
import "dotenv/config";

// Initialize SMTP transporter with nodemailer
const transporter: nodemailer.Transporter<SentMessageInfo> =
	nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.email,
			pass: process.env.password,
		},
	});

// Used by POST /user/
interface CreateAdminRequest {
	userEmail: string;
}

export const create_admin = async (
	req: CustomRequest<CreateAdminRequest>,
	res: Response
): Promise<any> => {
	const { userEmail } = req.body;

	// let errors: Errors;

	// // Check email format
	// if (!validateEmail(userEmail)) {
	// 	errors = {
	// 		errors: [
	// 			{ message: "Please enter a valid email", location: "emailInput" },
	// 		],
	// 	};

	// 	return res.json(errors);
	// }

	// if (!validateLogiSenseEmail(userEmail)) {
	// 	errors = {
	// 		errors: [
	// 			{ message: "Please enter a LogiSense email!", location: "emailInput" },
	// 		],
	// 	};

	// 	return res.json(errors);
	// }

	// // Check if user already exists
	// const foundUser = await connection
	// 	.getRepository(User)
	// 	.createQueryBuilder("user")
	// 	.where("user.userEmail = :userEmail", { userEmail })
	// 	.getOne();

	// if (foundUser) {
	// 	errors = {
	// 		errors: [
	// 			{
	// 				message: "An account with this email already exists",
	// 				location: "emailInput",
	// 			},
	// 		],
	// 	};

	// 	return res.json(errors);
	// }

	// Encrypt password
	const userPassword: string = uuid();
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(userPassword, salt);

	// Save user
	const newAdmin: User = new User();
	newAdmin.userEmail = userEmail;
	newAdmin.userPassword = hashedPassword;
	newAdmin.userProject = null;
	newAdmin.userType = "ADMIN";
	await connection.manager.save(newAdmin);

	await transporter.sendMail({
		from: process.env.email,
		to: userEmail,
		subject: "LogiSense Account Creation",
		text: `An account was created with this email. Your password is ${userPassword}`,
	});

	res.send("Admin Successfully Created");
};

// Used by GET /user/
interface SignInUserRequest {
	userEmail: string;
	userPassword: string;
}

export const user_sign_in = async (
	req: CustomRequest<SignInUserRequest>,
	res: Response
) => {
	// TODO: IMPLEMENT USER SIGN IN FUNCTIONALITY
};
