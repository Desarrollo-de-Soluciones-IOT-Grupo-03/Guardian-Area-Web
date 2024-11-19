import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth/services';
import {
  DialogAddDeviceComponent,
  DialogEditDeviceComponent,
} from '@devices/components';
import { DeviceStatus } from '@devices/enums';
import { Device } from '@devices/models';
import { DeviceService } from '@devices/services';
import { UserService } from '@settings/services';
import { CustomDialogComponent } from '@shared/components';
import { UnderScoreToSpacePipe } from '@shared/pipes';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, MatIcon, UnderScoreToSpacePipe, MatMenuModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css',
})
export class DevicesComponent implements OnInit {
  private _userService = inject(UserService);
  private _deviceService = inject(DeviceService);
  private _snackBar = inject(MatSnackBar);
  private _authService = inject(AuthService);

  readonly dialog = inject(MatDialog);
  showSpinner: boolean = false;
  selectedDeviceId = this._deviceService.deviceRecordId || '';

  ngOnInit(): void {
    this._setDevices();
  }

  deviceState = DeviceStatus;

  devices: Device[] = [];

  private _setDevices(): void {
    this.showSpinner = true;
    this._userService
      .getAllDevices(this._authService.userId!)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe({
        next: (devices) => (this.devices = devices),
        error: (error) =>
          this._snackBar.open(
            'An error occurred while loading the devices',
            'Close',
            { duration: 5000 },
          ),
      });
  }

  openDialog(): void {
    this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Add Device',
        message:
          'Download the app and follow the instructions to add a new device.',
        secondaryButton: 'Cancel',
      },
    });
  }

  openAddDeviceDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDeviceComponent, {
      minWidth: '240px',
      maxWidth: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDeviceId = result;
        this.showSpinner = true;
        this._deviceService
          .register({ guardianAreaDeviceRecordId: result })
          .pipe(finalize(() => (this.showSpinner = false)))
          .subscribe({
            next: () => {
              this._snackBar.open('Device added successfully', 'Close', {
                duration: 5000,
              });
              this._setDevices();
            },
            error: () =>
              this._snackBar.open(
                'An error occurred while adding the device',
                'Close',
                { duration: 5000 },
              ),
          });
        this._snackBar.open('Device added successfully', 'Close', {
          duration: 5000,
        });
      }
    });
  }

  openEditDeviceDialog(device: Device): void {
    const dialogRef = this.dialog.open(DialogEditDeviceComponent, {
      minWidth: '350px',
      width: '50%',
      maxWidth: '500px',
      data: device,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showSpinner = true;
        this._deviceService
          .update(device.guardianAreaDeviceRecordId, result)
          .pipe(finalize(() => (this.showSpinner = false)))
          .subscribe({
            next: () => {
              this._snackBar.open('Device updated successfully', 'Close', {
                duration: 5000,
              });
              this._setDevices();
            },
            error: () =>
              this._snackBar.open(
                'An error occurred while updating the device',
                'Close',
                { duration: 5000 },
              ),
          });
      }
    });
  }

  selectDevice(device: Device): void {
    this.selectedDeviceId = device.guardianAreaDeviceRecordId;
    this._deviceService.selectDevice(device);
  }
}
