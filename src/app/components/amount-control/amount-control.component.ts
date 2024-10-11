import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import {
  FormControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { pairwise, startWith } from 'rxjs';

@Component({
  selector: 'app-amount-control',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './amount-control.component.html',
  styleUrl: './amount-control.component.scss',
})
export class AmountControlComponent implements OnInit, OnChanges {
  @Input()
  public max!: number;
  @Input()
  public min: number = 0;
  @Input()
  public currentValue!: number;
  @Input()
  public changeHandler!: (value: number) => boolean;
  @Output()
  public onRemove = new EventEmitter<void>();

  public form!: FormControl<number>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.control(this.currentValue, {
      validators: [
        Validators.min(0),
        Validators.max(this.max),
        Validators.required,
      ],
      updateOn: 'blur',
    });

    this.form.valueChanges
      .pipe(startWith(this.min), pairwise())
      .subscribe(([oldValue, newValue]) => {
        const result = this.changeHandler(newValue);

        if (!result) {
          this.form.setValue(oldValue < this.min ? this.min : oldValue);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentValueChanged = changes['currentValue'];

    if (
      this.form &&
      currentValueChanged &&
      this.form.value !== currentValueChanged.currentValue &&
      currentValueChanged.previousValue !== currentValueChanged.currentValue
    ) {
      this.form.setValue(currentValueChanged.currentValue, {
        emitEvent: false,
      });
    }
  }

  public handleAdd() {
    this.form.setValue(this.form.value + 1);
  }

  public handleSub() {
    this.form.setValue(this.form.value - 1);
  }

  public handleRemove() {
    this.onRemove.emit();
  }
}
