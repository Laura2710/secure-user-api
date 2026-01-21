// src/middlewares/error.middleware.ts

import { BLLError } from "@/errors/bll.error";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Erreurs métiers
	if (err instanceof BLLError) {
		return res.status(err.statusCode).json({ error: err.message });
	}

	// Erreurs inattendues
	console.error(err);
	return res.status(500).json({ error: "Internal server error" });
};
