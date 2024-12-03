import { Accessor, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { CartListType, ProductType } from "../types/product";

export function useCart(
  triggerNewCycle: Accessor<boolean> | null,
  productList: ProductType[]
) {
  const [cartList, setCartList] = createStore<CartListType[]>([]);
  const [totalPayable, setPayableAmount] = createSignal<number>(0);

  const [products, setProducts] = createStore<ProductType[]>(productList);

  createEffect(() => {
    triggerNewCycle && triggerNewCycle(); // triggers createEffect whenever its value changes. Like dependency in react
    setCartList([]);
    setPayableAmount(0);
  });

  const increaseProductCount = (product: CartListType) => {
    let changeMainStock = false;
    const index = cartList.findIndex((item) => item.name === product.name);
    const productIndex = products.findIndex(
      (item) => item.name === product.name
    );

    if (index > -1) {
      setCartList(index, "qty", (qty) => {
        if (product?.currentStock && product.currentStock > 0) {
          changeMainStock = true;
          return ++qty;
        }
        return qty;
      });
    } else {
      if (product?.currentStock && product.currentStock > 0) {
        changeMainStock = true;
        setCartList([...cartList, { ...product, qty: 1 }]);
      }
    }

    if (changeMainStock) {
      setPayableAmount((amt) => amt + product.price);
      setProducts(productIndex, "stock", (stock) => {
        if (stock) return --stock;
      });
    }
  };

  const decreaseProductCount = (product: CartListType) => {
    let changeMainStock = false;
    const index = cartList.findIndex((item) => item.name === product.name);
    const productIndex = products.findIndex(
      (item) => item.name === product.name
    );

    if (index > -1) {
      setCartList(index, "qty", (qty) => {
        if (qty && qty > 0) {
          changeMainStock = true;
          return --qty;
        }
        return qty;
      });

      if (cartList[index].qty === 0) {
        // remove from list if qty is 0
        setCartList((list) =>
          list.filter((item) => item.name !== product.name)
        );
      }
    }

    if (changeMainStock) {
      setPayableAmount((amt) => amt - product.price);
      setProducts(productIndex, "stock", (stock) => {
        return ++stock;
      });
    }
  };

  return {
    cartList,
    totalPayable,
    increaseProductCount,
    decreaseProductCount,
    products,
  };
}
