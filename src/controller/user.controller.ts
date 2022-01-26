import { User } from "../db/entity/User";
import { Token } from "../db/entity/Token";
import { connection } from "../db/connection";
import { Response } from "express";
import { CustomRequest, Errors } from "../types";
import { SuccessMessage } from "../types";
import {
	validateEmail,
	validateLogiSenseEmail,
} from "../helpers/emailValidation";
import * as bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import * as nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";
import "dotenv/config";
import { createRefreshToken } from "../helpers/tokenCreation";

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

	let errors: Errors;

	// Check that the user's actually inputted data
	if (!userEmail) {
		errors = [
			{
				message: "Please enter your email",
				location: "emailInput",
			},
		];

		return res.json(errors);
	}

	// Check email format
	if (!validateEmail(userEmail)) {
		errors = [
			{ message: "Please enter a valid email", location: "emailInput" },
		];

		return res.json(errors);
	}

	if (!validateLogiSenseEmail(userEmail)) {
		errors = [
			{ message: "Please enter a LogiSense email!", location: "emailInput" },
		];

		return res.json(errors);
	}

	// Check if user already exists
	const foundUser = await connection
		.getRepository(User)
		.createQueryBuilder("user")
		.where("user.userEmail = :userEmail", { userEmail })
		.getOne();

	if (foundUser) {
		errors = [
			{
				message: "An account with this email already exists",
				location: "emailInput",
			},
		];

		return res.json(errors);
	}

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

	res.send(SuccessMessage.Success);
};

// Used by POST /user/token
interface SignInUserRequest {
	userEmail: string;
	userPassword: string;
}

export const user_sign_in = async (
	req: CustomRequest<SignInUserRequest>,
	res: Response
) => {
	const { userEmail, userPassword } = req.body;

	let errors: Errors;

	// Check that the data has been inputted
	if (!userEmail || !userPassword) {
		errors = [
			{ message: "Please enter your email", location: "emailInput" },
			{ message: "Please enter your password", location: "passwordInput" },
		];

		return res.json(errors);
	}

	// Check if userEmail is a valid email
	if (!validateEmail(userEmail)) {
		errors = [
			{
				message: "Please enter a valid email",
				location: "emailInput",
			},
		];

		return res.json(errors);
	}

	// Look for user in database
	const foundUser: User = await connection
		.getRepository(User)
		.createQueryBuilder("user")
		.where("user.userEmail = :userEmail", { userEmail })
		.getOne();

	if (!foundUser) {
		errors = [
			{
				message: "An account with this email does not exist",
				location: "emailInput",
			},
		];

		return res.json(errors);
	}

	// Validate user's password
	const isPasswordValid = await bcrypt.compare(
		userPassword,
		foundUser.userPassword
	);

	if (!isPasswordValid) {
		errors = [
			{
				message: "Password is incorrect",
				location: "passwordInput",
			},
		];

		return res.json(errors);
	}

	// CREATE REFRESH TOKEN
	const refreshToken = createRefreshToken(foundUser.id);

	const newToken = new Token();
	newToken.token = refreshToken;
	await connection.manager.save(newToken);

	res.json({ refreshToken });
};
