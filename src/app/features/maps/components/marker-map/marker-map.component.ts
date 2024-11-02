import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '@app/features/auth/services/auth.service';
import { DeviceService } from '@app/features/devices/services/device.service';
import { GeofenceStatus } from '@app/features/geofence/enums/geofence-state';
import { GeofenceReq } from '@app/features/geofence/models/geofence-req';
import { GeofenceService } from '@app/features/geofence/services/geofence.service';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-marker-map',
  standalone: true,
  imports: [MatSliderModule, MatIconModule, MatTableModule, CommonModule, MatFormFieldModule,
    MatFormFieldModule, MatInputModule, FormsModule
  ],
  templateUrl: './marker-map.component.html',
  styleUrl: './marker-map.component.css'
})
export class MarkerMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<Marker> | undefined;
  @ViewChild('map') divMap?: ElementRef;

  private _deviceService = inject(DeviceService);
  private _geofenceService = inject(GeofenceService);
  private _router = inject(Router);
  private _authService = inject(AuthService);

  displayedColumns: string[] = ['latitude', 'longitude', 'actions'];
  geofenceName: string | null = null;

  zoom: number = 16;
  map?: Map;
  public currentCenter: LngLat = new LngLat(-77.0428, -12.0464);
  markers: Marker[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) {
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
      if (this.map!.getZoom() < 18) return;
      this.map!.setZoom(18);
    });
  }

  zoomChanged(value: string): void {
    this.zoom = Number(value);
    this.map!.setZoom(this.zoom);
  }

  createMarker(): void {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const center = this.map.getCenter();
    this.addMarker(center, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;
    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push(marker);
    this.table?.renderRows();

    marker.on('dragend', () => {
      this.updatePolygon();
      this.table?.renderRows();
    });

    this.updatePolygon();
  }

  updatePolygon(): void {
    if (!this.map) return;
    if (this.map.getLayer('polygon-layer')) {
      this.map.removeLayer('polygon-layer');
    }
    if (this.map.getSource('polygon-source')) {
      this.map.removeSource('polygon-source');
    }

    const coordinates = this.markers.map(marker => {
      const lngLat = marker.getLngLat();
      return [lngLat.lng, lngLat.lat];
    });
    this.map.addSource('polygon-source', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates]
        },
        properties: {}
      }
    });

    this.map.addLayer({
      id: 'polygon-layer',
      type: 'fill',
      source: 'polygon-source',
      layout: {},
      paint: {
        'fill-color': '#00FF00',
        'fill-opacity': 0.5
      }
    });
  }

  removeMarker(indice: number): void {
    const marker = this.markers[indice];
    if (marker) {
      marker.remove();
      this.markers.splice(indice, 1);
      this.table?.renderRows();
      this.updatePolygon();
    }
  }

  onSave(): void {
    let req = {
      name: this.geofenceName,
      coordinates: this.markers.map(marker => {
        const lngLat = marker.getLngLat();
        return { latitude: lngLat.lat, longitude: lngLat.lng };
      }),
      geoFenceStatus: GeofenceStatus.ACTIVE,
      guardianAreaDeviceRecordId: this._deviceService.deviceRecordId

    } as GeofenceReq;

    this._geofenceService.create(req).subscribe((response) => {
      const userId = this._authService.userId;
      this._router.navigate([`/${userId}/geofences`]);
    });

  }
}
