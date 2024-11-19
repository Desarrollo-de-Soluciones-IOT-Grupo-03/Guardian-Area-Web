import { TableActivitiesComponent } from '@activities/components';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService, SocketService } from '@devices/services';
import { MiniMapComponent } from '@maps/components';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [MiniMapComponent, TableActivitiesComponent],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css',
})
export class MainPanelComponent implements OnInit {
  private _socketService = inject(SocketService);
  private _deviceService = inject(DeviceService);
  private _snackBar = inject(MatSnackBar);

  bpm: number = 0;
  spo2: number = 0;

  ngOnInit(): void {
    this._socketService.getSensorsData(this._deviceService.apiKey!).subscribe({
      next: (data) => {
        this.bpm = data.bpm;
        this.spo2 = data.spo2;
      },
      error: (error) => {
        this._snackBar.open('There are some problems', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }
}
