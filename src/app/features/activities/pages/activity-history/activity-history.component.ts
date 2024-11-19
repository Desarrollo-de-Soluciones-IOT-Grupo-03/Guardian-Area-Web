import { Activity } from '@activities/models';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DeviceService } from '@devices/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-activity-history',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, CommonModule],
  templateUrl: './activity-history.component.html',
  styleUrl: './activity-history.component.css',
})
export class ActivityHistoryComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private _deviceService = inject(DeviceService);

  displayedColumns: string[] = ['activityName', 'datetime', 'activityType'];

  activities: Activity[] = [];
  paginatedActivities: Activity[] = [];
  showSpinner: boolean = false;
  page = { pagina: 0, registrosPorPagina: 10, totalRegistros: 0 };

  ngOnInit(): void {
    this.getAllActivitiesByUserId();
  }

  getAllActivitiesByUserId(): void {
    this.showSpinner = true;
    const id = this._deviceService.deviceRecordId!;
    this._deviceService
      .getAllByRecordId(id, null)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe({
        next: (response: Activity[]) => {
          this.activities = response;
          this.page.totalRegistros = response.length;
          this.updatePaginatedActivities();
        },
        error: (error) => {
          this.openSnackBar('Error fetching activities', 'Close');
        },
      });
  }

  updatePaginatedActivities(): void {
    const startIndex = this.page.pagina * this.page.registrosPorPagina;
    const endIndex = startIndex + this.page.registrosPorPagina;
    this.paginatedActivities = this.activities.slice(startIndex, endIndex);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onPage({ pageSize, pageIndex }: PageEvent): void {
    this.page.registrosPorPagina = pageSize;
    this.page.pagina = pageIndex;
    this.updatePaginatedActivities();
  }
}
