import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../services/cart/cart.service';
import { MatBadge } from '@angular/material/badge';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatBadge],
  providers: [CartService],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.sass',
})
export class CartButtonComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public itemsInCart: number = 0;
  public get showBadge() {
    return this.itemsInCart > 0;
  }

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {
    this.cartService.itemsInCart$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  public onClick() {
    this.router.navigate(['/cart']);
  }
}
