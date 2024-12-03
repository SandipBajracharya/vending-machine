import { Router } from "express";
import {
  purchaseTransactionHandler,
  refundTransactionHandler,
} from "./account.controller";

export const accountRouter = Router();

accountRouter.put("/purchase", purchaseTransactionHandler);
accountRouter.put("/refund", refundTransactionHandler);
