import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { RegisterReq } from '@auth/models';
import { AuthService } from '@auth/services';
import { SpinnerService } from '@shared/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-sign-up',
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
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _spinnerService = inject(SpinnerService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  form = this._formBuilder.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    username: new FormControl<string>('', Validators.required),
    terms: new FormControl<boolean>(false),
    role: new FormControl<string>('ROLE_ADMIN', Validators.required),
    roles: new FormControl<string[]>([]),
  });

  signUp(): void {
    this._spinnerService.showSpinner();
    this.form.controls.roles.setValue([this.form.controls.role.value!]);
    this._authService
      .signUp(this.form.getRawValue() as RegisterReq)
      .pipe(finalize(() => this._spinnerService.hiddenSpinner()))
      .subscribe({
        next: () => {
          this._router.navigate(['/auth/sign-in']);
        },
        error: (error) => {
          this._snackBar.open(error.error.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
  }
}
