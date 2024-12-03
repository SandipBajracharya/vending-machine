import { Show, useContext } from "solid-js";
import ProductItem from "../Product/ProductItem";
import { ProductContext } from "../../contexts/ProductProvider";
import ItemList from "../Product/ItemList";
import Payment from "../Payment";
import { createStore } from "solid-js/store";
import {
  CartListTypeWithAction,
  ProductContextProviderType,
  PurchaseProductType,
} from "../../types/product";
import { useCart } from "../../hooks/cart";
import { DispatchDataType } from "../../types/global";
import Loading from "../Loading";

const resetDispatchData = {
  dispatchedProducts: [],
  returnedCoins: 0,
  returnedCash: 0,
  totalReturn: 0,
  totalPrice: 0,
};

export default function PurchaseTab() {
  const {
    triggerNewCycle,
    productHookContext: { productList, processProductPurchase },
  }: ProductContextProviderType = useContext(ProductContext);
  const [dispatchData, setDispatchData] =
    createStore<DispatchDataType>(resetDispatchData);

  const {
    products,
    totalPayable,
    cartList,
    increaseProductCount,
    decreaseProductCount,
  } = useCart(triggerNewCycle, productList);

  const handleButtonClick = (data: CartListTypeWithAction) => {
    const payload = {
      id: data.id,
      name: data.name,
      currentStock: data.stock,
      price: data.price,
    };

    switch (data.action) {
      case "add":
        increaseProductCount(payload);
        break;
      case "subtract":
        decreaseProductCount(payload);
        break;
    }
  };

  const handleProductPurchase = async (payload: PurchaseProductType) => {
    setDispatchData(resetDispatchData);
    const respData = await processProductPurchase(payload);
    setDispatchData(respData);
    return;
  };

  return (
    <>
      <Show when={products.length > 0} fallback={<Loading />}>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            return (
              <ProductItem
                product={product}
                handleButtonClick={handleButtonClick}
              />
            );
          })}
        </div>
      </Show>

      <Show when={cartList && cartList.length > 0}>
        <div class="border-b-2 border-gray-200 py-8">
          <ItemList itemList={cartList} totalPayable={totalPayable} />
        </div>
      </Show>
      <Payment
        totalPayable={totalPayable}
        cartList={cartList}
        handleProductPurchase={handleProductPurchase}
      />
      <Show when={dispatchData && dispatchData?.dispatchedProducts.length > 0}>
        <div class="my-8">
          <h3 class="font-bold">Dispatch Section</h3>
          <div class="mt-2">
            <ItemList itemList={dispatchData.dispatchedProducts} />
          </div>
          <div class="mt-4">
            <div>
              <span class="font-bold">Total Price: </span> Rs{" "}
              {dispatchData.totalPrice}
            </div>
            <div>
              <span class="font-bold">Total Paid: </span> Rs{" "}
              {dispatchData.totalPrice + dispatchData.totalReturn}
            </div>
            <div>
              <span class="font-bold">Total Return: </span> Rs{" "}
              {dispatchData.totalReturn} (coins: Rs {dispatchData.returnedCoins}
              , cash: Rs {dispatchData.returnedCash})
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
