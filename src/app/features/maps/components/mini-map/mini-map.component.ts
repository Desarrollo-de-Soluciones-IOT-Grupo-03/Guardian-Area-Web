import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [MatSliderModule],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit, OnDestroy {


  @ViewChild('map') divMap?: ElementRef;
  zoom: number = 13;
  map?: Map;
  public currentCenter: LngLat = new LngLat(-77.0428, -12.0464);

  ngAfterViewInit(): void {
    if (!this.divMap ) {
      return;
    }
    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentCenter,
      zoom: this.zoom,
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(): void {
    this.map?.on('zoom', () => {
      this.zoom = this.map!.getZoom();
    });

    this.map?.on('zoomend', () => {
      if ( this.map!.getZoom() < 18) return;
      this.map!.setZoom(18);

    });
  }

  zoomChanged(value: string): void{
    this.zoom = Number(value);
    this.map!.setZoom(this.zoom);
  }

}
