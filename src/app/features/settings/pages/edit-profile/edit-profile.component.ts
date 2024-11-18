import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth/services';
import { UserService } from '@settings/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  private _userService = inject(UserService);
  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);
  private _matSnackBar = inject(MatSnackBar);

  userId = this._authService.userId;
  showSpinner: boolean = false;

  form = this._fb.group({
    username: new FormControl(''),
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  ngOnInit(): void {
    this.showSpinner = true;
    this._setUser();
  }

  private _setUser(): void {
    this._userService
      .getById(this.userId)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe({
        next: (user) => {
          this.form.patchValue(user);
        },
        error: (err) => {
          this._matSnackBar.open('Error loading user', 'OK', {
            duration: 5000,
          });
        },
      });
  }
}
