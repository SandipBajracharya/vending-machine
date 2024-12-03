import CustomError from "../../helper/customErrorHelper";
import { ProductType } from "./product";

/**
 * In-memory database
 */
export const products: ProductType[] = [
  {
    id: 1,
    name: "Coke",
    stock: 10,
    price: 20,
  },
  {
    id: 2,
    name: "Pepsi",
    stock: 10,
    price: 25,
  },
  {
    id: 3,
    name: "Dew",
    stock: 10,
    price: 30,
  },
];

export async function fetchproducts(): Promise<ProductType[]> {
  return products;
}

export async function bulkUpdateProducts(updatedProducts: ProductType[]) {
  updatedProducts.forEach((updateItem) => {
    const index = products.findIndex((product) => product.id === updateItem.id);
    if (index !== -1) {
      // Update product fields
      products[index] = { ...products[index], ...updateItem };
    }
  });
}
