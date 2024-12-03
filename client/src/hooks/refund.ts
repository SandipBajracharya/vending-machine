import { Accessor, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { CartListType, ProductType, RefundProductType } from "../types/product";
import { RefundAmountType } from "../types/global";

export function useRefund(
  triggerNewCycle: Accessor<boolean> | null,
  processRefundProduct:
    | (({ itemList, totalRefundAmount }: RefundProductType) => Promise<any>)
    | null = null,
  error: Accessor<string> | null
) {
  const [refundProduct, setRefundProduct] = createStore<CartListType[]>([]);
  const [totalRefundAmount, setTotalRefundAmount] = createSignal<number>(0);
  const [refundAmount, setRefundAmount] = createStore<RefundAmountType>(null);

  const handleCardClick = (product: ProductType) => {
    const index = refundProduct.findIndex((item) => item.name === product.name);

    if (index < 0) {
      setRefundProduct((prev) => [
        ...prev,
        { id: product.id, name: product.name, price: product.price, qty: 1 },
      ]);
      setTotalRefundAmount((prev) => prev + product.price);
    }
  };

  const handleRefundProcess = async () => {
    const payload = {
      itemList: refundProduct,
      totalRefundAmount: totalRefundAmount(),
    };
    const respData =
      processRefundProduct && (await processRefundProduct(payload));
    setRefundAmount(respData);
  };

  createEffect(() => {
    if (error && error()) {
      setRefundAmount(null);
      setRefundProduct([]);
      setTotalRefundAmount(0);
    } else {
      triggerNewCycle && triggerNewCycle(); // triggers whenever its value changes
      setRefundProduct([]);
      setTotalRefundAmount(0);
    }
  });

  return {
    refundProduct,
    totalRefundAmount,
    handleCardClick,
    handleRefundProcess,
    refundAmount,
  };
}
