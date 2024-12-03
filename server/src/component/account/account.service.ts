import { BAD_REQUEST, UNPROCESSABLE } from "../../constant/httpStatusCode";
import {
  INSUFFICIENT_AMOUNT,
  NOT_AVAILABLE,
  OUT_OF_STOCK,
  UNAVAILABLE_PRODUCT,
} from "../../constant/message";
import CustomError from "../../helper/customErrorHelper";
import { RefundTransactionType } from "../fund/fund";
import {
  checkAndCalculateFunds,
  getCurrentFunds,
  updateFunds,
} from "../fund/fund.service";
import { CartListType } from "../product/product";
import { checkForProducts, updateProducts } from "../product/product.service";
import { PaymentType } from "./account";

export async function purchaseTransaction(
  cartList: CartListType[],
  payment: PaymentType
) {
  // check for the availability of products
  const { fileterdCartList, unavailableProducts, outOfStockProducts } =
    await checkForProducts(cartList);

  if (unavailableProducts.length > 0) {
    throw new CustomError(BAD_REQUEST, UNAVAILABLE_PRODUCT);
  }

  if (outOfStockProducts.length > 0) {
    throw new CustomError(UNPROCESSABLE, OUT_OF_STOCK);
  }

  if (fileterdCartList.length === 0) {
    throw new CustomError(UNPROCESSABLE, NOT_AVAILABLE);
  }

  // handle payment
  const { cash, coin } = await getCurrentFunds();
  const totalReceived = payment.total;
  const tobePaid = payment.totalPayable;
  const diffTotal = totalReceived - tobePaid;

  if (diffTotal < 0) {
    throw new CustomError(UNPROCESSABLE, INSUFFICIENT_AMOUNT);
  }

  // update products in db
  const dispatchedProducts = await updateProducts(cartList, true);

  const newCash = cash + payment.cash;
  const newCoin = coin + payment.coin;
  if (diffTotal > 0) {
    const resp = await checkAndCalculateFunds(
      { cash: newCash, coin: newCoin },
      diffTotal
    );
    if (resp instanceof CustomError) {
      return resp;
    }
    const { coinsToReturn, updatedCoins, cashToReturn, updatedCash } = resp;
    await updateFunds(updatedCash, updatedCoins);

    return {
      dispatchedProducts,
      returnedCoins: coinsToReturn,
      returnedCash: cashToReturn,
      totalReturn: diffTotal,
      totalPrice: tobePaid,
    };
  }

  await updateFunds(newCash, newCoin);

  return {
    dispatchedProducts,
    returnedCoins: 0,
    returnedCash: 0,
    totalReturn: 0,
    totalPrice: tobePaid,
  };
}

export async function refundTransaction(
  itemList: CartListType[],
  totalRefundAmount: number
): Promise<RefundTransactionType | CustomError> {
  const { cash, coin } = await getCurrentFunds();

  // 1. decrease amount in stock
  const resp = await checkAndCalculateFunds({ cash, coin }, totalRefundAmount);
  if (resp instanceof CustomError) {
    return resp;
  }
  const { coinsToReturn, updatedCoins, cashToReturn, updatedCash } = resp;

  // 2. add refund products to main stock
  await updateProducts(itemList);

  await updateFunds(updatedCash, updatedCoins);
  return {
    returnedCoins: coinsToReturn,
    returnedCash: cashToReturn,
    totalReturn: totalRefundAmount,
  };
}
