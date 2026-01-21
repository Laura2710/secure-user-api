import jwt from "jsonwebtoken";
import { BLLError } from "../errors/bll.error";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3600";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

type Payload = { userId: number };

/**
 * Generates a JWT token based on the provided payload.
 * The token is signed with the JWT_SECRET and has an expiration time
 * based on the JWT_EXPIRES_IN environment variable.
 * @param {Payload} payload - The payload to be signed into the JWT token
 * @returns {string} - The generated JWT token
 * @throws {Error} - If the JWT_SECRET is not defined
 */
export const signToken = (payload: Payload) => {
  const options = {
    expiresIn: Number(JWT_EXPIRES_IN),
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

/**
 * Verifies a JWT token and returns the decoded payload.
 * @throws {BLLError} - If the token is invalid or expired
 * @returns {Promise<{userId: number, iat: number, exp: number}>} - The decoded payload
 */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      userId: number;
      iat: number;
      exp: number;
    };
  } catch {
    throw new BLLError("Invalid or expired token", 401);
  }
};
