import { FundType } from "./fund";

/**
 * In-memory database
 */
export const funds: FundType = {
  cash: 200,
  coin: 100,
};

export async function fetchFunds(): Promise<FundType> {
  return funds;
}
