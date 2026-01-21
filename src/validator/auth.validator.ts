// src/validator/auth.validator.ts
import { BLLError } from "../errors/bll.error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/;

export const validateEmailAndPassword = (email: string, password: string) => {
  if (!email || !password) {
    throw new BLLError("Missing email or password", 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new BLLError("Invalid email address", 400);
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new BLLError(
      "Password must be at least 12 characters long and include uppercase, lowercase, number and special character",
      400,
    );
  }
};
