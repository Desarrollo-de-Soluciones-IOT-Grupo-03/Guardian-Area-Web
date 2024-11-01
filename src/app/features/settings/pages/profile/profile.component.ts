import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _userService = inject(UserService);
  private _snackBar = inject(MatSnackBar);

  showSpinner: boolean = false;
  user!: User;

  ngOnInit(): void {
    const id = this._activatedRoute.parent?.snapshot.paramMap.get('userId')!;
    this.showSpinner = true;
    this._userService.getById(id).pipe(finalize(() => this.showSpinner = false)).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        this._snackBar.open(error.error.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }

}
