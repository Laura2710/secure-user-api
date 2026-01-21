import express, { Request, Response } from "express";
import authRouter from "@/routes/auth.routes";
import { errorMiddleware } from "@/middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "running" });
});

app.use("/auth", authRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);
export default app;
