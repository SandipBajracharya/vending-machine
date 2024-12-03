import { FundType } from "../fund/fund";
import { CartListType } from "../product/product";

interface PaymentType extends FundType {
  totalPayable: number;
}

type PurchaseTransactionType = {
  cartList: CartListType[];
  payment: PaymentType;
};
