import { Activity, ActivityQuery } from '@activities/models';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { DeviceService } from '@devices/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-table-activities',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './table-activities.component.html',
  styleUrl: './table-activities.component.css',
})
export class TableActivitiesComponent implements OnInit {
  @Input() query?: ActivityQuery;

  private _snackBar = inject(MatSnackBar);
  private _deviceService = inject(DeviceService);

  displayedColumns: string[] = ['activityName', 'datetime', 'activityType'];
  activities: Activity[] = [];
  showSpinner: boolean = false;

  ngOnInit(): void {
    this.getAllActivitiesByUserId();
  }

  getAllActivitiesByUserId(): void {
    this.showSpinner = true;
    const deviceRecordId = this._deviceService.deviceRecordId;
    this._deviceService
      .getAllByRecordId(deviceRecordId!, this.query ?? null)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe({
        next: (activities: Activity[]) =>
          (this.activities = activities.slice(-5)),
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
