import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Coordinates } from '@geofence/models';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-preview-map',
  standalone: true,
  imports: [],
  templateUrl: './preview-map.component.html',
  styleUrl: './preview-map.component.css',
})
export class PreviewMapComponent implements AfterViewInit {
  @Input({ required: true }) coordinate!: Coordinates;

  @ViewChild('map') divMap?: ElementRef;
  zoom: number = 13;
  map?: Map;
  public currentCenter: LngLat = new LngLat(-77.0428, -12.0464);

  ngAfterViewInit(): void {
    if (!this.divMap) {
      return;
    }
    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentCenter,
      zoom: this.zoom,
      interactive: false,
    });
    this.currentCenter = new LngLat(
      this.coordinate.longitude,
      this.coordinate.latitude,
    );

    new Marker().setLngLat(this.currentCenter).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
