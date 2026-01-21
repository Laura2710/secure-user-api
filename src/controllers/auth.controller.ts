// src/controllers/auth.controller.ts

import { Request, Response } from "express";
import { createUser, getUser, loginUser } from "../services/user.service";
import { validateEmailAndPassword } from "@/validator/auth.validator";

/**
 * Handles a registration request.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<void>} - A promise that resolves when the request has been handled
 */
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  validateEmailAndPassword(email, password);
  const user = await createUser(email, password);
  return res.status(201).json({
    id: user.id,
    email: user.email,
  });
};

/**
 * Handles a signin request.
 * Validates the email and password from the request body.
 * Logs in the user using the email and password.
 * Returns a JSON response with the user's token.
 * @returns {Promise<void>} - A promise that resolves when the request has been handled
 */
export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  validateEmailAndPassword(email, password);
  const userToken = await loginUser(email, password);
  return res.status(200).json({ token: userToken });
};

export const whoIAm = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const user = await getUser(userId);
  return res.status(200).json({
    message: "You are logged in",
    id: user.id,
    email: user.email,
  });
};
