import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '@app/features/devices/services/device.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatButtonModule, MatSlideToggleModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  private _snackBar = inject(MatSnackBar);
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _deviceService = inject(DeviceService);

  form: FormGroup = this._formBuilder.group({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', Validators.required),
  });

  login(): void {
    this._authService.signIn(this.form.value).subscribe(
      {
        next: success => {
          const userId = this._authService.userId();
          if (this._deviceService.deviceRecordId){
            this._router.navigate([userId, 'home']);
          } else {
            this._router.navigate([userId, 'devices']);
          }
        },
        error: (error) => {
          this._snackBar.open(error.error.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      }
    );
  }
}
