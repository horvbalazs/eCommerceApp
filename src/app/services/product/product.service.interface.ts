import { Product } from '../../models/Product';
import { Observable } from 'rxjs';

export interface IProductService {
  products$: Observable<Product[]>;
}
