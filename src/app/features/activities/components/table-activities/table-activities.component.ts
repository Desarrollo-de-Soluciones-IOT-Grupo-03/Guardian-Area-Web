import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Activity } from '../../models/activity';
import { ActivityQuery } from '../../models/activity-query';
import { ActivityService } from '../../services/activity.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-activities',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './table-activities.component.html',
  styleUrl: './table-activities.component.css'
})
export class TableActivitiesComponent implements OnInit{

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
        next: (activities: Activity[]) => this.activities = activities,
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
