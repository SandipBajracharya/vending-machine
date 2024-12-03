import { Accessor } from "solid-js";
import { CartListType } from "./product";
import { CommonObjectType } from "./global";

interface UserPaymentType {
  [key: string]: number;
}

interface PaymentType extends UserPaymentType {
  totalPayable: number;
}

type PaymentPropsType = {
  totalPayable: Accessor<number> | undefined;
  cartList: CartListType[] | undefined;
  handleProductPurchase: (object: CommonObjectType) => Promise<void>;
};
