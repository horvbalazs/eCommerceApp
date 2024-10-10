import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/Product';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatProgressSpinner, ProductCardComponent],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public products?: Product[];
  public isLoading = false;

  constructor(private productService: ProductService) {
    this.productService.products$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => (this.products = result));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
