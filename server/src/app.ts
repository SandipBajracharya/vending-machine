import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { productRouter } from "./component/product/product.route";
import { accountRouter } from "./component/account/account.route";

export const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/product", productRouter);
app.use("/api/account", accountRouter);

// Global error handler middleware
app.use(errorHandler);
