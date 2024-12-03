import { createContext } from "solid-js";
import { ProductProviderPropType } from "../types/product";

export const ProductContext = createContext();

export default function ProductProvider(props: ProductProviderPropType) {
  const {
    productList,
    triggerNewCycle,
    setTriggerNewCycle,
    processProductPurchase,
    processRefundProduct,
    error,
  } = props;

  return (
    <ProductContext.Provider
      value={{
        productHookContext: {
          productList, // list of products
          processProductPurchase: processProductPurchase, // func to trigger for product purchase
          processRefundProduct: processRefundProduct, // func to trigger for product purchase
          error: error,
        },
        triggerNewCycle: triggerNewCycle, // value to determine trigger when a cycle complete
        setTriggerNewCycle: setTriggerNewCycle, // func to set trigger when a cycle complete
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
