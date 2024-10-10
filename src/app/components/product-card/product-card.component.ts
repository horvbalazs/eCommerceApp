import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart/cart.service';
import { map } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { MatButton } from '@angular/material/button';
import { AmountControlComponent } from '../amount-control/amount-control.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SkeletonModule,
    CommonModule,
    MatButton,
    AmountControlComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input()
  public product!: Product;

  @HostBinding('class.full-screen')
  @Input()
  public fullScreen = false;

  @Output()
  public onClick = new EventEmitter<void>();

  @HostListener('click')
  public onHostClick() {
    this.onClick.emit();
  }

  public imagePath: string = '';
  public loaded = false;

  public get numberInCart$() {
    return this.cartService.cart$.pipe(
      map(cart => {
        const cartItem = cart.products.get(this.product.id);

        return cartItem?.amount ?? 0;
      })
    );
  }

  public get leftInStock$() {
    return this.numberInCart$.pipe(
      map(value => Math.max(this.product.availableAmount - value, 0))
    );
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.imagePath = this.product.img;
    this.loaded = true;
  }

  public addToCart(ev: Event) {
    ev.stopPropagation();
    this.cartService.addProductToCart(this.product);
  }

  public removeFromCart() {
    this.cartService.removeProductFromCart(this.product);
  }

  public updateAmount(amount: number) {
    return this.cartService.setProductAmountInCart(this.product, amount);
  }

  public handleImageError() {
    this.imagePath = 'placeholder.png';
  }
}
