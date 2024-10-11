import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart/cart.service';
import mockProducts from '../../../mocks/products';
import { skip } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let cartService: CartService;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', [
      'error',
    ]);
    cartService = new CartService(toastrService);
    cartService.clearCart();

    await TestBed.configureTestingModule({
      imports: [CartComponent],
    })
      .overrideProvider(ToastrService, { useValue: toastrService })
      .overrideProvider(CartService, { useValue: cartService })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show toast', () => {
    component.handleClick();
    expect(toastrService.error).toHaveBeenCalled();
  });

  it('should update sum total', done => {
    component.sumTotal$.pipe(skip(1)).subscribe(value => {
      done();
    });
    cartService.addProductToCart(mockProducts[0]);
  });
});
