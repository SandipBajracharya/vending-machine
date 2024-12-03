import { UNPROCESSABLE } from "../../constant/httpStatusCode";
import { INSUFFICIENT_FUND } from "../../constant/message";
import CustomError from "../../helper/customErrorHelper";
import { fetchFunds } from "./db";
import { FundReturnType, FundType } from "./fund";

export async function getCurrentFunds() {
  return await fetchFunds();
}

export async function updateFunds(
  cash: number,
  coin: number
): Promise<FundType> {
  const funds = await fetchFunds();
  funds.cash = cash;
  funds.coin = coin;
  return funds;
}

export async function checkAndCalculateFunds(
  currFunds: FundType,
  diffAmount: number
): Promise<FundReturnType> {
  if (Object.keys(currFunds).length === 0) {
    currFunds = await fetchFunds();
  }
  const { cash, coin }: { cash: number; coin: number } = currFunds;
  const total = cash + coin;

  if (total < diffAmount) {
    throw new CustomError(UNPROCESSABLE, INSUFFICIENT_FUND);
  }

  // logic to check if the funds are enough to return
  if (coin >= diffAmount) {
    return {
      coinsToReturn: diffAmount,
      updatedCoins: coin - diffAmount,
      cashToReturn: 0,
      updatedCash: cash,
    };
  } else if (coin < diffAmount) {
    const remainingAfterCoin = diffAmount - coin;
    return {
      coinsToReturn: coin,
      updatedCoins: 0,
      cashToReturn: remainingAfterCoin,
      updatedCash: cash - remainingAfterCoin,
    };
  }
}
