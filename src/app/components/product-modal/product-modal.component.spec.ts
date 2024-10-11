import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModalComponent } from './product-modal.component';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import mockProducts from '../../../mocks/products';

describe('ProductModalComponent', () => {
  let component: ProductModalComponent;
  let fixture: ComponentFixture<ProductModalComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', [
      'error',
    ]);
    await TestBed.configureTestingModule({
      imports: [ProductModalComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: mockProducts[0] }],
    })
      .overrideProvider(ToastrService, { useValue: toastrService })
      .compileComponents();

    fixture = TestBed.createComponent(ProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
