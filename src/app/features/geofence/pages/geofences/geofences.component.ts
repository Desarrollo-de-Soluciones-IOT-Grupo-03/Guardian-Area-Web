import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { DeviceService } from '@devices/services';
import { Geofence } from '@geofence/models';
import { PreviewMapComponent } from '@maps/components';
import { finalize } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-geofences',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    PreviewMapComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './geofences.component.html',
  styleUrl: './geofences.component.css',
})
export class GeofencesComponent implements OnInit {
  private _deviceService = inject(DeviceService);
  private _snackBar = inject(MatSnackBar);
  private _router = inject(Router);

  geofences: Geofence[] = [];
  showSpinner: boolean = false;

  ngOnInit(): void {
    this.showSpinner = true;
    this._deviceService
      .getAllGeofences(this._deviceService.deviceRecordId!)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe({
        next: (geofences) => {
          this.geofences = geofences;
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

  goToEditGeofence(id: string): void {
    this._router.navigate(['geofences/edit', id]);
  }
}
