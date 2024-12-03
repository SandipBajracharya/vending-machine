import { CartListType } from "../product/product";

export interface FundType {
  cash: number;
  coin: number;
  total?: number;
}

export type RefundType = {
  itemList: CartListType[];
  totalRefundAmount: number;
};

export type FundReturnType = {
  coinsToReturn: number;
  updatedCoins: number;
  cashToReturn: number;
  updatedCash: number;
};

export type RefundTransactionType = {
  returnedCoins: number;
  returnedCash: number;
  totalReturn: number;
};
