import { Product } from './Product';

export interface CartItem extends Product {
  amount: number;
}

export interface Cart {
  products: Map<string, CartItem>;
}
