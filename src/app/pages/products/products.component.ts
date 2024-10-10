import { Component, inject, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/Product';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatProgressSpinner, ProductCardComponent],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  private readonly dialog = inject(MatDialog);

  public products?: Product[];
  public isLoading = true;

  constructor(private productService: ProductService) {
    this.productService.products$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.products = result;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  public handleOpenModal(product: Product) {
    this.dialog.open(ProductModalComponent, {
      data: product,
    });
  }
}
