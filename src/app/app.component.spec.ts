import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ToastrService } from 'ngx-toastr';

describe('AppComponent', () => {
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', [
      'error',
    ]);
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideProvider(ToastrService, { useValue: toastrService })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
