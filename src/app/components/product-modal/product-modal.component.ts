import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Product } from '../../models/Product';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, ProductCardComponent],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent {
  public readonly data = inject<Product>(MAT_DIALOG_DATA);
}
