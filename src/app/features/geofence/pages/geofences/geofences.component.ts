import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-geofences',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './geofences.component.html',
  styleUrl: './geofences.component.css'
})
export class GeofencesComponent {

}
