import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';

describe('CartService', () => {
  let service: CartService;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', [
      'error',
    ]);
    TestBed.configureTestingModule({}).overrideProvider(ToastrService, {
      useValue: toastrService,
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    
  });
});
