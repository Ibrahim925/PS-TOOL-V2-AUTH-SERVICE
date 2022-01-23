import { Request } from "express";

// Base custom request body
export interface CustomRequest<T> extends Request {
	body: T;
}
