import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountControlComponent } from './amount-control.component';

describe('AmountControlComponent', () => {
  let component: AmountControlComponent;
  let fixture: ComponentFixture<AmountControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
