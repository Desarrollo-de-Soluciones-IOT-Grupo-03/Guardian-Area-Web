import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-payment-method',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    MatCheckboxModule,
  ],
  templateUrl: './form-payment-method.component.html',
  styleUrl: './form-payment-method.component.css',
})
export class FormPaymentMethodComponent {
  private _formBuilder = inject(FormBuilder);

  form: FormGroup = this._formBuilder.group({
    name: new FormControl<string>('', Validators.required),
    cardNumber: new FormControl<string>('', Validators.required),
    cvv: new FormControl<string>('', Validators.required),
    expirationDate: new FormControl<string>('', Validators.required),
  });
}
