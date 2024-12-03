import { NextFunction, Request, Response } from "express";
import { SUCCESS_FETCH } from "../../constant/message";
import logger from "../../helper/logger";
import { successResponse } from "../../helper/responseHelper";
import { getAllProducts } from "./product.service";

export async function getProductsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Getting product list");
    const data = await getAllProducts();
    logger.info("Product list fetch success");
    successResponse(res, SUCCESS_FETCH, data);
  } catch (error) {
    next(error);
  }
}
