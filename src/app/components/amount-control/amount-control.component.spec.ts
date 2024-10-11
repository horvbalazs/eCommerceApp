import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmountControlComponent } from './amount-control.component';
import { ToastrService } from 'ngx-toastr';

describe('AmountControlComponent', () => {
  let component: AmountControlComponent;
  let fixture: ComponentFixture<AmountControlComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', [
      'error',
    ]);
    await TestBed.configureTestingModule({
      imports: [AmountControlComponent],
    })
      .overrideProvider(ToastrService, { useValue: toastrService })
      .compileComponents();

    fixture = TestBed.createComponent(AmountControlComponent);
    component = fixture.componentInstance;
    component.changeHandler = jasmine.createSpy().and.returnValue(true);
    component.currentValue = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call change handler on form update', () => {
    const value = component.min;
    component.form.setValue(value, {
      emitEvent: false,
    });
    component.form.setValue(value + 1);
    expect(component.changeHandler).toHaveBeenCalledWith(value + 1);
    expect(component.form.value).toEqual(value + 1);
  });

  it('should reset on invalid update', () => {
    component.changeHandler = jasmine.createSpy().and.returnValues(false, true);
    fixture.detectChanges();

    const value = component.min;
    component.form.setValue(value, {
      emitEvent: false,
    });
    component.form.setValue(value + 1);
    expect(component.changeHandler).toHaveBeenCalledWith(value + 1);
    expect(component.form.value).toEqual(value);
  });

  it('should handle add', () => {
    const prev = component.form.value;
    component.handleAdd();
    expect(component.form.value).toEqual(prev + 1);
  });

  it('should handle sub', () => {
    const prev = component.form.value;
    component.handleSub();
    expect(component.form.value).toEqual(prev - 1);
  });

  it('should handle remove', () => {
    const spy = spyOn(component.onRemove, 'emit');
    component.handleRemove();
    expect(spy).toHaveBeenCalled();
  });
});
