import { Component, inject, OnInit } from '@angular/core';
import { DeviceStatus } from '../../enums/device-status';
import { Device } from '../../models/device';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '@app/shared/components/custom-dialog/custom-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@app/features/settings/services/user.service';
import { finalize } from 'rxjs';
import { UnderScoreToSpacePipe } from '@app/shared/pipes/under-score-to-space.pipe';
import { DeviceService } from '../../services/device.service';
import { DialogAddDeviceComponent } from '../../components/dialog-add-device/dialog-add-device.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, MatIcon, UnderScoreToSpacePipe],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _userService = inject(UserService);
  private _deviceService = inject(DeviceService);
  private _snackBar = inject(MatSnackBar);

  readonly dialog = inject(MatDialog);
  private _userId: string | null = null;
  showSpinner: boolean = false;
  selectedDeviceId = this._deviceService.deviceRecordId || '';

  ngOnInit(): void {
    this._userId = this._activatedRoute.parent?.snapshot.paramMap.get('userId')!;
    this.showSpinner = true;
    this._userService.getAllDevices(this._userId).pipe(finalize(() => this.showSpinner = false)).subscribe(
      {
        next: (devices) => this.devices = devices,
        error: (error) => this._snackBar.open('An error occurred while loading the devices', 'Close',
          { duration: 5000 }
        )
      }
    );
  }

  deviceState = DeviceStatus;

  devices: Device[] = [];

  openDialog(): void {
    this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Add Device',
        message: 'Download the app and follow the instructions to add a new device.',
        secondaryButton: 'Cancel'
      }
    });
  }

  registerDevice(): void {
    const dialogRef = this.dialog.open(DialogAddDeviceComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDeviceId = result;
        this.showSpinner = true;
        this._deviceService.register({ guardianAreaDeviceRecordId: result })
        .pipe(finalize(() => this.showSpinner = false))
          .subscribe({
            next: () => this._snackBar.open('Device added successfully', 'Close', { duration: 5000 }),
            error: () => this._snackBar.open('An error occurred while adding the device', 'Close', { duration: 5000 })
          })
        this._snackBar.open('Device added successfully', 'Close', { duration: 5000 });
      }
    });

  }

  selectDevice(idDevice: string) {
    this.selectedDeviceId = idDevice;
    this._deviceService.selectDevice(idDevice);
  }

}
