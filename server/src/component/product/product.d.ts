export interface ProductType {
  id: number;
  name: string;
  price: number;
  stock?: number;
}

export interface CartListType extends ProductType {
  currentStock?: number;
  qty?: number;
}
