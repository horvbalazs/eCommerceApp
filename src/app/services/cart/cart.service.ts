import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { Cart } from '../../models/Cart';
import { ToastrService } from 'ngx-toastr';
import { map, startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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
      }),
    );
  }

  constructor(private toastr: ToastrService) {
    this.cart = {
      products: new Map(),
    };

    this.cartSubject$ = new Subject<Cart>();
  }

  public addProductToCart(product: Product) {
    const cartValue = this.cart.products.get(product.id);

    this.setProductAmountInCart(
      product,
      cartValue ? cartValue.amount + 1 : product.minOrderAmount,
    );
  }

  public removeProductFromCart(product: Product, removeAll = false) {
    const cartValue = this.cart.products.get(product.id);

    if (!cartValue) {
      return;
    }

    this.setProductAmountInCart(product, removeAll ? 0 : cartValue.amount - 1);
  }

  public setProductAmountInCart(
    product: Product,
    setAmount = product.minOrderAmount,
  ): boolean {
    if (setAmount === 0) {
      this.cart.products.delete(product.id);

      this.cartSubject$.next(this.cart);
      return true;
    }

    if (setAmount < product.minOrderAmount) {
      this.toastr.error(
        'Add to cart failed.',
        `You have to order at least ${product.minOrderAmount} of this item.`,
      );

      return false;
    }

    if (setAmount > product.availableAmount) {
      this.toastr.error(
        'Add to cart failed.',
        `There are only ${product.availableAmount} products available.`,
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
}
