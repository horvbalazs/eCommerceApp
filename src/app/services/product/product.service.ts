import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, startWith, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = 'https://63c10327716562671870f959.mockapi.io/products';
  private productsLoadingSubject$: Subject<boolean>;

  public products$: Observable<Product[]>;
  public get productsLoading$(): Observable<boolean> {
    return this.productsLoadingSubject$.asObservable().pipe(startWith(true));
  }

  constructor(private http: HttpClient) {
    this.productsLoadingSubject$ = new Subject<boolean>();

    this.products$ = this.http.get<Product[]>(this.api).pipe(
      startWith([]),
      shareReplay(),
      tap(() => this.productsLoadingSubject$.next(false)),
    );
  }
}
