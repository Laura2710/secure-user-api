// src/services/user.service.ts

import * as argon2 from "argon2";
import prisma from "../prisma/client";
import { BLLError } from "../errors/bll.error";
import { signToken } from "../utils/jwt";

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
  });

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return {
      id: user.id,
      email: user.email,
    };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === "P2002"
    ) {
      throw new BLLError("User already exists", 409);
    }

    throw new BLLError("Error creating user", 500);
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new BLLError("Invalid credentials", 401);
  }
  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    throw new BLLError("Invalid credentials", 401);
  }

  const token = signToken({ userId: user.id });
  return token;
};

export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new BLLError("User not found", 404);
  }
  return { id: user.id, email: user.email };
};
