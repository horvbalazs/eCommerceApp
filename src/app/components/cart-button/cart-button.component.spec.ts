import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartButtonComponent } from './cart-button.component';
import { ToastrService } from 'ngx-toastr';

describe('CartButtonComponent', () => {
  let component: CartButtonComponent;
  let fixture: ComponentFixture<CartButtonComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', [
      'error',
    ]);
    await TestBed.configureTestingModule({
      imports: [CartButtonComponent],
    })
      .overrideProvider(ToastrService, { useValue: toastrService })
      .compileComponents();

    fixture = TestBed.createComponent(CartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
