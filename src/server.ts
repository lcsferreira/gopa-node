import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { authenticate } from "./middleware/authenticate";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
