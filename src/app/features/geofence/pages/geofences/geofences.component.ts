import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Geofence } from '../../models/geofence';
import { DeviceService } from '@app/features/devices/services/device.service';
import { finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MiniMapComponent } from "../../../maps/components/mini-map/mini-map.component";
import { PreviewMapComponent } from "../../../maps/components/preview-map/preview-map.component";
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-geofences',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatCardModule, MatButtonModule, MiniMapComponent, PreviewMapComponent,
    CommonModule
  ],
  templateUrl: './geofences.component.html',
  styleUrl: './geofences.component.css'
})
export class GeofencesComponent implements OnInit {
  private _deviceService = inject(DeviceService);
  private _snackBar = inject(MatSnackBar);

  geofences: Geofence[] = [];
  showSpinner: boolean = false;
  ngOnInit(): void {
    this.showSpinner = true;
    this._deviceService.getAllGeofences(this._deviceService.deviceRecordId!)
      .pipe(finalize(() => this.showSpinner = false))
      .subscribe({
        next: (geofences) => {
          this.geofences = geofences;
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
