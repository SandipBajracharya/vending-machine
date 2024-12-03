import { Accessor, Setter } from "solid-js";
import { CartListType } from "./product";

type TabButtonPropType = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

type SignalTuple<T> = [Accessor<T>, Setter<T>]; // type for createSignal

type CommonObjectType = {
  [key: string]: string | number | (() => void) | any; // eslint-disable-line
};

type ButtonPropsType = {
  label: string;
  isPrimary?: boolean;
  className?: string;
  onClick?: (e) => void;
  disabled?: boolean;
};

type InputFieldPropsType = {
  type: string;
  name: string;
  value?: string | number;
  className?: string;
  onInput?: (e) => void;
  min?: number | null;
  checked?: boolean;
};

type ItemListPropsType = {
  itemList: CartListType[] | undefined;
  totalPayable?: () => number;
};

type DispatchDataType = {
  dispatchedProducts: any[];
  returnedCoins: number;
  returnedCash: number;
  totalReturn: number;
  totalPrice: number;
};

type RefundAmountType = {
  totalReturn: number;
  returnedCoins: number;
  returnedCash: number;
};
