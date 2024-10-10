import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/Product';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatProgressSpinner, ProductCardComponent, CommonModule],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly dialog = inject(MatDialog);

  public get products$() {
    return this.productService.products$;
  }

  constructor(private productService: ProductService) {}

  public handleOpenModal(product: Product) {
    this.dialog.open(ProductModalComponent, {
      data: product,
    });
  }
}
