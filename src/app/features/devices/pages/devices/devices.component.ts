import { Component, inject } from '@angular/core';
import { DeviceMode } from '../../enums/device-mode';
import { DeviceState } from '../../enums/device-state';
import { Device } from '../../models/device';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '@app/shared/components/custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {
  readonly dialog = inject(MatDialog);

  deviceState = DeviceState;

  devices: Device[] = [
    {
      name: 'Device 1',
      deviceCode: '123',
      mode: DeviceMode.INFANTE,
      state: DeviceState.CONNECTED
    },
    {
      name: 'Device 2',
      deviceCode: '456',
      mode: DeviceMode.ADULTO,
      state: DeviceState.DISCONNECTED
    }
  ];

  openDialog(): void {
    this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Add Device',
        message: 'Download the app and follow the instructions to add a new device.',
        secondaryButton: 'Cancel'
      }
    });
  }

  onpenSelectDevice(): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Select Device',
        message: 'Are you sure you want to select this device?',
        primaryButton: 'Add Device',
        secondaryButton: 'Cancel'
      }
    });
  }

}
