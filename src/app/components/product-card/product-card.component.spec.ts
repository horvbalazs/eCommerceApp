import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import MockProducts from '../../../mocks/products';
import { ToastrService } from 'ngx-toastr';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', [
      'error',
    ]);
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    })
      .overrideProvider(ToastrService, { useValue: toastrService })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = MockProducts[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the image path when it cannot be loaded', () => {
    expect(component.imagePath).toBe(component.product.img);
    component.handleImageError();
    expect(component.imagePath).toBe('placeholder.png');
  });
});
