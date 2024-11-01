import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MiniMapComponent } from '@maps/components/mini-map/mini-map.component';
import { ModeComponent } from '@shared/enums/mode-component';
import { MarkerMapComponent } from "@maps/components/marker-map/marker-map.component";
@Component({
  selector: 'app-geofence-add-edit',
  standalone: true,
  imports: [MiniMapComponent, CommonModule, MarkerMapComponent],
  templateUrl: './geofence-add-edit.component.html',
  styleUrl: './geofence-add-edit.component.css'
})
export class GeofenceAddEditComponent {
  mode: ModeComponent = ModeComponent.ADD
}
