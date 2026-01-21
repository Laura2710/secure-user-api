// src/validator/auth.validator.ts
import { BLLError } from "@/errors/bll.error";

export const validateEmailAndPassword = (email: string, password: string) => {
  if (!email || !password) {
    throw new BLLError("Missing email or password", 400);
  }

  if (!email.includes("@")) {
    throw new BLLError("Invalid email address", 400);
  }

  if (password.length < 12) {
    throw new BLLError("Password must be at least 12 characters long", 400);
  }
};
