import { Accessor, JSX, Setter } from "solid-js";
import { PaymentType } from "./payment";

interface ProductType {
  id: number;
  name: string;
  price: number;
  stock?: number;
}

interface CartListType extends ProductType {
  currentStock?: number;
  qty?: number;
}

type RefundProductType = {
  itemList: CartListType[];
  totalRefundAmount: number;
};

type PurchaseProductType = {
  cartList: CartListType[];
  payment: PaymentType;
};

interface ProductHookResponseType {
  productList: ProductType[];
  loading?: Accessor<boolean>;
  error?: Accessor<string>;
  processProductPurchase: ({
    cartList,
    payment,
  }: PurchaseProductType) => Promise<any>;
  processRefundProduct: ({
    itemList,
    totalRefundAmount,
  }: RefundProductType) => Promise<any>;
}

interface ProductProviderPropType extends ProductHookResponseType {
  triggerNewCycle: Accessor<boolean>;
  setTriggerNewCycle: Setter<boolean>;
  children: JSX.Element;
}

type ProductContextProviderType = {
  productHookContext?: ProductHookResponseType;
  children?: JSX.Element;
  triggerNewCycle?: Accessor<boolean>;
  setTriggerNewCycle?: Setter<boolean>;
  increaseProductCount?: (product: CartListType) => void;
  decreaseProductCount?: (product: CartListType) => void;
  cartList?: CartListType[];
  totalPayable?: Accessor<number>;
};

interface CartListTypeWithAction extends CartListType {
  action?: "add" | "subtract";
}
