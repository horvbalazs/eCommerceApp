import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIcon,
    MatListModule,
    CommonModule,
    ProductCardComponent,
    MatButtonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  public get cartItems$() {
    return this.cartService.cart$.pipe(
      map(cart => Array.from(cart.products.values()))
    );
  }

  public get sumTotal$() {
    return this.cartItems$.pipe(
      map(cartItems =>
        cartItems
          .reduce<number>((acc, curr) => acc + curr.price * curr.amount, 0)
          .toFixed(2)
      )
    );
  }

  public get isEmpty$() {
    return this.cartItems$.pipe(map(cartItems => cartItems.length === 0));
  }

  constructor(
    private cartService: CartService,
    private toast: ToastrService
  ) {}

  public handleClick() {
    this.toast.error('Checkout is not implemented.');
  }

  public clearCart() {
    this.cartService.clearCart();
  }
}
