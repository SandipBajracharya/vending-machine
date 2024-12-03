import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { getApi, putApi } from "../services/apiServices";
import {
  ProductType,
  PurchaseProductType,
  RefundProductType,
} from "../types/product";
import { SignalTuple } from "../types/global";

export function useProduct([
  triggerNewCycle,
  setTriggerNewCycle,
]: SignalTuple<boolean>) {
  const [productList, setProductList] = createStore<ProductType[]>([]);
  const [loading, setLoading] = createSignal<boolean>(true);
  const [error, setError] = createSignal<string>("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await getApi("/api/product");
      setLoading(false);
      if (data.success) {
        setProductList(data.data);
      } else {
        setError(data.message || "Something went wrong!");
      }
      setTriggerNewCycle(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || "Something went wrong!");
    }
  };

  const processProductPurchase = async ({
    cartList,
    payment,
  }: PurchaseProductType) => {
    try {
      setError("");
      setLoading(true);
      const { data } = await putApi("/api/account/purchase", {
        cartList,
        payment,
      });
      setLoading(false);
      if (data.success) {
        setTriggerNewCycle(true);
        return data.data;
      } else {
        setError(data.message || "Something went wrong!");
      }
      setTriggerNewCycle(true);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || "Something went wrong!");
    }
  };

  const processRefundProduct = async ({
    itemList,
    totalRefundAmount,
  }: RefundProductType) => {
    try {
      setError("");
      setLoading(true);
      const { data } = await putApi("/api/account/refund", {
        itemList,
        totalRefundAmount,
      });
      setLoading(false);
      if (data.success) {
        setTriggerNewCycle(true);
        return data.data;
      } else {
        setError(data.message || "Something went wrong!");
      }
      setTriggerNewCycle(true);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || "Something went wrong!");
    }
  };

  createEffect(() => {
    try {
      if (triggerNewCycle()) {
        fetchProducts();
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || "Something went wrong!");
    }
  });

  return {
    productList,
    loading,
    error,
    setError,
    processProductPurchase,
    processRefundProduct,
  };
}
