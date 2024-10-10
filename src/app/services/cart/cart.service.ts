import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { Cart } from '../../models/Cart';
import { ToastrService } from 'ngx-toastr';
import { map, startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private STORAGE_KEY = 'E_COMMERCE_CART';
  private cart: Cart;
  private cartSubject$: Subject<Cart>;

  public get cart$() {
    return this.cartSubject$.asObservable().pipe(startWith(this.cart));
  }

  public get itemsInCart$() {
    return this.cart$.pipe(map(cart => cart.products.size));
  }

  public get sumTotal$() {
    return this.cart$.pipe(
      map(cart => {
        let total = 0;

        for (const product of cart.products.values()) {
          total += product.amount * product.price;
        }

        return total;
      })
    );
  }

  constructor(private toastr: ToastrService) {
    const storageValue = localStorage.getItem(this.STORAGE_KEY) ?? '';
    this.cart = CartService.parseCart(storageValue);

    console.log(this.cart);

    this.cartSubject$ = new Subject<Cart>();
    this.cart$.subscribe(value =>
      localStorage.setItem(this.STORAGE_KEY, CartService.stringifyCart(value))
    );
  }

  public addProductToCart(product: Product) {
    const cartValue = this.cart.products.get(product.id);

    this.setProductAmountInCart(
      product,
      cartValue ? cartValue.amount + 1 : product.minOrderAmount
    );
  }

  public removeProductFromCart(product: Product) {
    this.setProductAmountInCart(product, 0);
  }

  public setProductAmountInCart(
    product: Product,
    setAmount = product.minOrderAmount
  ): boolean {
    if (setAmount === 0) {
      this.cart.products.delete(product.id);

      this.cartSubject$.next(this.cart);
      return true;
    }

    if (setAmount < product.minOrderAmount) {
      this.toastr.error(
        `You have to order at least ${product.minOrderAmount} of this item.`,
        'Cart action failed.'
      );

      return false;
    }

    if (setAmount > product.availableAmount) {
      this.toastr.error(
        `There are only ${product.availableAmount} products of type '${product.name}' available.`,
        'Cart action failed.'
      );

      return false;
    }

    this.cart.products.set(product.id, {
      ...product,
      amount: setAmount,
    });

    this.cartSubject$.next(this.cart);
    return true;
  }

  private static stringifyCart(cart: Cart): string {
    return JSON.stringify({
      ...cart,
      products: Array.from(cart.products.entries()),
    });
  }

  private static parseCart(value: string): Cart {
    try {
      const parsed = JSON.parse(value);

      return { ...parsed, products: new Map(parsed.products) };
    } catch {
      return { products: new Map() };
    }
  }
}
