import { Component } from '@angular/core';
import { MiniMapComponent } from '@app/features/maps/components/mini-map/mini-map.component';
import { TableActivitiesComponent } from "../../../activities/components/table-activities/table-activities.component";

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [MiniMapComponent, TableActivitiesComponent],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css'
})
export class MainPanelComponent {


}
