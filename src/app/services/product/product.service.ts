import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, startWith, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly api = 'https://63c10327716562671870f959.mockapi.io/products';
  private productsLoadingSubject$: Subject<boolean>;

  public products$: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.productsLoadingSubject$ = new Subject<boolean>();

    this.products$ = this.http.get<Product[]>(this.api).pipe(
      startWith([]),
      map(this.fixIds),
      shareReplay(),
      tap(() => this.productsLoadingSubject$.next(false))
    );
  }

  private fixIds(products: Product[]): Product[] {
    // The API returned with non unique IDs.
    // This is a temporary solution.

    let iteration = 1;
    const map = new Map<string, Product>();

    for (const product of products) {
      if (map.has(product.id)) {
        const id = `FIXED_ID_${iteration++}:${product.id}`;
        map.set(id, { ...product, id });
      } else {
        map.set(product.id, product);
      }
    }

    return Array.from(map.values());
  }
}
