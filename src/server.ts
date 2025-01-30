import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "http://localhost:5173",
    ], // Endereços que terão acesso à API
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      console.log(err);
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

// Rota para a raiz "/"
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
