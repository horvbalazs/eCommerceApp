import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from '../../services/product/product.service';
import { ProductServiceMock } from '../../services/product/product.service.mock';
import mockProducts from '../../../mocks/products';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        {
          provide: ProductService,
          useValue: new ProductServiceMock(mockProducts),
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
