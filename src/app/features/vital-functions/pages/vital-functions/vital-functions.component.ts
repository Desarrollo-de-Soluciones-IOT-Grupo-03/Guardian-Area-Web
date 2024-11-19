import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService, SocketService } from '@devices/services';
import {
  HeartRateMonitoringTabComponent,
  OxygenationMonitoringTabComponent,
} from '@vital-functions/components';
import { Chart } from 'chart.js';
import { finalize } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { TableActivitiesComponent } from '@activities/components';

@Component({
  selector: 'app-vital-functions',
  standalone: true,
  imports: [
    HeartRateMonitoringTabComponent,
    OxygenationMonitoringTabComponent,
    MatTabsModule,
    TableActivitiesComponent,
  ],
  templateUrl: './vital-functions.component.html',
  styleUrl: './vital-functions.component.css',
})
export class VitalFunctionsComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private _deviceService = inject(DeviceService);

  id: string = 'heart-tab';
  chart: Chart | null = null;
  chart2: Chart | null = null;
  showSpinner: boolean = false;
  heartRateData: number[] = [];
  oxygenSaturationData: number[] = [];
  dates: string[] = [];

  ngOnInit(): void {
    this._setData();
  }

  tabChange(idName: string): void {
    this.id = idName;
  }

  private _setData(): void {
    this.showSpinner = true;
    this._deviceService
      .getHealthMeasuresMonthlySummary(this._deviceService.deviceRecordId!)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe({
        next: (result) => {
          result.forEach((element) => {
            this.heartRateData.push(element.avgBpm);
            this.oxygenSaturationData.push(element.avgSpo2);
            this.dates.push(element.date);
          });
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
