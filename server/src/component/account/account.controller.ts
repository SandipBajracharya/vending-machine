import { NextFunction, Request, Response } from "express";
import { SUCCESS_PURCHASE, SUCCESS_REFUND } from "../../constant/message";
import logger from "../../helper/logger";
import { successResponse } from "../../helper/responseHelper";
import { purchaseTransaction, refundTransaction } from "./account.service";
import { RefundType } from "../fund/fund";
import { PurchaseTransactionType } from "./account";

export async function purchaseTransactionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { cartList, payment }: PurchaseTransactionType = req.body;

    logger.info("Starting purchase transaction");
    const data = await purchaseTransaction(cartList, payment);
    logger.info("Purchase transaction complete");
    successResponse(res, SUCCESS_PURCHASE, data);
  } catch (error) {
    next(error);
  }
}

export async function refundTransactionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { itemList, totalRefundAmount }: RefundType = req.body;

    logger.info("Starting refund transaction");
    const data = await refundTransaction(itemList, totalRefundAmount);
    logger.info("Refund transaction complete");
    successResponse(res, SUCCESS_REFUND, data);
  } catch (error) {
    next(error);
  }
}
