import { BLLError } from "@/errors/bll.error";
import { verifyToken } from "@/utils/jwt";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// lecture du header Authorization
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new BLLError("Authorization header missing", 401);
	}

	// format : Bearer <token>
	const parts = authHeader.split(" ");
	const token = parts[1];

	const decoded = verifyToken(token);

	// ON TRANSMET À LA REQUÊTE
	(req as any).userId = decoded.userId;
	next();
};
