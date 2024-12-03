import { bulkUpdateProducts, fetchproducts, products } from "./db";
import { CartListType } from "./product";

export async function getAllProducts() {
  return await fetchproducts();
}

export async function checkForProducts(cartList: CartListType[]) {
  const products = await fetchproducts();
  const outOfStockProducts = [];
  const unavailableProducts = [];

  const fileterdCartList = cartList.filter((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      unavailableProducts.push(item);
      return false;
    }
    if (product.stock === 0 || product.stock < item.qty) {
      outOfStockProducts.push(item);
      return false;
    }
    return true;
  });

  return { fileterdCartList, unavailableProducts, outOfStockProducts };
}

export async function updateProducts(
  itemList: CartListType[],
  isPurchase: boolean = false
) {
  const products = await fetchproducts();
  const dispatchedProducts = [];
  const updatedProducts = await Promise.all(
    products.map(async (product) => {
      let productToReturn = product;
      const singleItem = itemList.find((item) => item.id === product.id);
      if (singleItem) {
        if (isPurchase) {
          dispatchedProducts.push({
            id: product.id,
            name: product.name,
            qty: singleItem.qty,
            price: product.price,
          });
          productToReturn = {
            ...product,
            stock: product.stock - singleItem.qty,
          };
        } else {
          productToReturn = {
            ...product,
            stock: product.stock + singleItem.qty,
          };
        }
      }
      return productToReturn;
    })
  );

  await bulkUpdateProducts(updatedProducts);
  return dispatchedProducts;
}
