import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Activity } from '../../models/activity';
import { ActivityQuery } from '../../models/activity-query';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-history',
  standalone: true,
  imports: [ MatTableModule, MatSortModule, MatPaginatorModule, CommonModule],
  templateUrl: './activity-history.component.html',
  styleUrl: './activity-history.component.css'
})
export class ActivityHistoryComponent implements OnInit{
  private _activityService: ActivityService = inject(ActivityService);
  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['event', 'datetime', 'duration', 'actionTaken'];

  activities: Activity[] = [];

  ngOnInit(): void {
    this.getAllActivitiesByUserId();
  }

  getAllActivitiesByUserId(): void {
    let query = { userId: 1 } as ActivityQuery;
    this._activityService.getAllActivitiesByUserId(query).subscribe(
      {
        next: (activities: Activity[]) => {
          this.activities = activities
        },
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
