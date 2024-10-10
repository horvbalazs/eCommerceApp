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
  constructor(
    private cartService: CartService,
    private toast: ToastrService
  ) {}

  public handleClick() {
    this.toast.error('Checkout is not implemented.');
  }
}
