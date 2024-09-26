import { Component, inject, OnInit } from '@angular/core';
import { MiniMapComponent } from '@app/features/maps/components/mini-map/mini-map.component';
import { MatTableModule } from '@angular/material/table';
import { ActivityService } from '@app/features/activities/services/activity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Activity } from '@app/features/activities/models/activity';
import { ActivityQuery } from '@app/features/activities/models/activity-query';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [MiniMapComponent, MatTableModule, CommonModule],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css'
})
export class MainPanelComponent implements OnInit {
  private _activityService: ActivityService = inject(ActivityService);
  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['evento', 'fechaHora', 'duracion', 'accionTomada'];

  activities: Activity[] = [];

  ngOnInit(): void {
    this.getAllActivitiesByUserId();
  }

  getAllActivitiesByUserId(): void {
    let query = { userId: 1 } as ActivityQuery;
    this._activityService.getAllActivitiesByUserId(query).subscribe(
      {
        next: (activities: Activity[]) => this.activities = activities,
        error: err => this.openSnackBar('Error al obtener las actividades', 'Cerrar')
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
