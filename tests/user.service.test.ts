import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock JWT
vi.mock("../src/utils/jwt", () => {
  return {
    signToken: vi.fn(() => "fake-jwt-token"),
  };
});

// Mock Prisma
vi.mock("../src/prisma/client", () => {
  return {
    default: {
      user: {
        create: vi.fn(),
        findUnique: vi.fn(),
      },
    },
  };
});

// Imports après mocks
import * as userService from "../src/services/user.service";
import prisma from "../src/prisma/client";
import { BLLError } from "../src/errors/bll.error";

describe("createUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crée un utilisateur avec succès", async () => {
    (prisma.user.create as any).mockResolvedValue({
      id: 1,
      email: "test@test.com",
      password: "hashed",
    });

    const user = await userService.createUser(
      "test@test.com",
      "password123456",
    );

    expect(user).toEqual({
      id: 1,
      email: "test@test.com",
    });
  });

  it("lève une BLLError si l'utilisateur existe déjà", async () => {
    (prisma.user.create as any).mockRejectedValue({
      code: "P2002",
    });

    await expect(
      userService.createUser("test@test.com", "password123456"),
    ).rejects.toBeInstanceOf(BLLError);
  });
});

describe("loginUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne un token si les identifiants sont valides", async () => {
    const hashedPassword = await import("argon2").then((argon2) =>
      argon2.hash("password123456"),
    );

    (prisma.user.findUnique as any).mockResolvedValue({
      id: 1,
      email: "test@test.com",
      password: hashedPassword,
    });

    const token = await userService.loginUser(
      "test@test.com",
      "password123456",
    );

    expect(token).toBe("fake-jwt-token");
  });

  it("lève une BLLError si l'utilisateur n'existe pas", async () => {
    (prisma.user.findUnique as any).mockResolvedValue(null);

    await expect(
      userService.loginUser("test@test.com", "password123456"),
    ).rejects.toBeInstanceOf(BLLError);
  });

  it("lève une BLLError si le mot de passe est invalide", async () => {
    const wrongHashedPassword = await import("argon2").then((argon2) =>
      argon2.hash("wrong-password"),
    );

    (prisma.user.findUnique as any).mockResolvedValue({
      id: 1,
      email: "test@test.com",
      password: wrongHashedPassword,
    });

    await expect(
      userService.loginUser("test@test.com", "password123456"),
    ).rejects.toBeInstanceOf(BLLError);
  });

  describe("getUser", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("retourne l'utilisateur si trouvé", async () => {
      (prisma.user.findUnique as any).mockResolvedValue({
        id: 1,
        email: "test@test.com",
        password: "hashed-password",
      });

      const user = await userService.getUser(1);

      expect(user).toEqual({
        id: 1,
        email: "test@test.com",
      });
    });

    it("lève une BLLError si l'utilisateur n'existe pas", async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);

      await expect(userService.getUser(1)).rejects.toBeInstanceOf(BLLError);
    });
  });
});
describe("getUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne l'utilisateur si trouvé", async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      id: 1,
      email: "test@test.com",
      password: "hashed-password",
    });

    const user = await userService.getUser(1);

    expect(user).toEqual({
      id: 1,
      email: "test@test.com",
    });
  });

  it("lève une BLLError si l'utilisateur n'existe pas", async () => {
    (prisma.user.findUnique as any).mockResolvedValue(null);

    await expect(userService.getUser(1)).rejects.toBeInstanceOf(BLLError);
  });
});
