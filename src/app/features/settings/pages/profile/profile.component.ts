import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services';
import { User } from '@settings/models';
import { UserService } from '@settings/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private _userService = inject(UserService);
  private _snackBar = inject(MatSnackBar);
  private _authService = inject(AuthService);

  showSpinner: boolean = false;
  user!: User;

  ngOnInit(): void {
    this.showSpinner = true;
    this._userService
      .getById(this._authService.userId!)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe({
        next: (user) => {
          this.user = user;
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
