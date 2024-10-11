import { Product } from '../../models/Product';
import { of } from 'rxjs';
import { IProductService } from './product.service.interface';

export class ProductServiceMock implements IProductService {
  private mockProducts: Product[];

  public get products$() {
    return of(this.mockProducts);
  }

  constructor(products: Product[]) {
    this.mockProducts = products;
  }
}
