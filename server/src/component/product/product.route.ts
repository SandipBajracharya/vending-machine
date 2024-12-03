import { Router } from "express";
import { getProductsHandler } from "./product.controller";

export const productRouter = Router();

productRouter.get("/", getProductsHandler);
