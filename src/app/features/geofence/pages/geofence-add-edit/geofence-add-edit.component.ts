import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService, SocketService } from '@devices/services';
import { GeofenceStatus } from '@geofence/enums';
import { GeofenceReq } from '@geofence/models';
import { GeofenceService } from '@geofence/services';
import { ModeComponent } from '@shared/enums';
import { SpinnerService } from '@shared/services';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-geofence-add-edit',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatSliderModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './geofence-add-edit.component.html',
  styleUrl: './geofence-add-edit.component.css',
})
export class GeofenceAddEditComponent implements OnInit {
  private _deviceService = inject(DeviceService);
  private _geofenceService = inject(GeofenceService);
  private _router = inject(Router);
  private _fb = inject(FormBuilder);
  private _spinnerService = inject(SpinnerService);
  private _matSnackBar = inject(MatSnackBar);
  private _activedRoute = inject(ActivatedRoute);
  private _socketService = inject(SocketService);

  mode: ModeComponent = ModeComponent.ADD;
  @ViewChild(MatTable) table: MatTable<Marker> | undefined;
  @ViewChild('map') divMap?: ElementRef;

  displayedColumns: string[] = ['latitude', 'longitude', 'actions'];
  zoom: number = 16;
  map?: Map;
  markers: Marker[] = [];
  currentCenter: LngLat = new LngLat(-77.0428, -12.0464);
  id: string | null = null;

  form = this._fb.group({
    name: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
    this.id = this._activedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.mode = ModeComponent.EDIT;
      this._setGeofence();
    }
  }

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

    this._socketService.getLocationData(this._deviceService.apiKey!).subscribe({
      next: (data) => {
        this.currentCenter = new LngLat(data.longitude, data.latitude);
        if (this.map) {
          this.updateLocationOnMap(this.currentCenter);
          this.map!.setCenter(this.currentCenter);
        }
      },
    });

    this.map?.on('load', () => {
      const animatedCanvas = this.createAnimatedImage();

      createImageBitmap(animatedCanvas).then((imageBitmap) => {
        this.map!.addImage('animated-location', imageBitmap);
      });

      if (!this.map?.getSource('device-location')) {
        this.map!.addSource('device-location', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [this.currentCenter.lng, this.currentCenter.lat],
                },
                properties: null,
              },
            ],
          },
        });
        this.updatePolygon();
      }

      if (!this.map?.getLayer('device-location-symbol')) {
        this.map!.addLayer({
          id: 'device-location-symbol',
          type: 'symbol',
          source: 'device-location',
          layout: {
            'icon-image': 'animated-location',
            'icon-size': 1,
          },
        });
      }
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this._socketService.closeSocketLocation(this._deviceService.apiKey!);
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

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16),
    );
    const center = this.map.getCenter();
    this.addMarker(center, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;
    const marker = new Marker({
      color: color,
      draggable: true,
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

    const coordinates = this.markers.map((marker) => {
      const lngLat = marker.getLngLat();
      return [lngLat.lng, lngLat.lat];
    });
    this.map.addSource('polygon-source', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
        properties: {},
      },
    });

    this.map.addLayer({
      id: 'polygon-layer',
      type: 'fill',
      source: 'polygon-source',
      layout: {},
      paint: {
        'fill-color': '#00FF00',
        'fill-opacity': 0.5,
      },
    });

    if (this.map.getLayer('device-location-symbol')) {
      this.map.moveLayer('device-location-symbol');
    }
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

  private _setGeofence(): void {
    this._geofenceService.getById(this.id!).subscribe({
      next: (geofence) => {
        this.form.patchValue(geofence);
        this.currentCenter = new LngLat(
          geofence.coordinates[0].longitude,
          geofence.coordinates[0].latitude,
        );
        this.map?.setCenter(this.currentCenter);
        geofence.coordinates.map((coordinate) => {
          const color = '#xxxxxx'.replace(/x/g, (y) =>
            ((Math.random() * 16) | 0).toString(16),
          );
          const lngLat = new LngLat(coordinate.longitude, coordinate.latitude);
          this.addMarker(lngLat, color);
        });
      },
      error: (err) => {
        this._matSnackBar.open('Error on get data', 'Close', {
          duration: 5000,
        });
      },
    });
  }

  onSave(): void {
    this._spinnerService.showSpinner();
    let req = {
      name: this.form.controls.name.value,
      coordinates: this.markers.map((marker) => {
        const lngLat = marker.getLngLat();
        return { latitude: lngLat.lat, longitude: lngLat.lng };
      }),
      geoFenceStatus: GeofenceStatus.ACTIVE,
      guardianAreaDeviceRecordId: this._deviceService.deviceRecordId,
    } as GeofenceReq;

    if (this.id) {
      this._geofenceService
        .update(this.id, req)
        .pipe(finalize(() => this._spinnerService.hiddenSpinner()))
        .subscribe({
          next: (res) => {
            this._router.navigate(['/geofences']);
          },
          error: (err) => {
            this._matSnackBar.open('Error on update', 'Close', {
              duration: 5000,
            });
          },
        });
      return;
    } else {
      this._geofenceService
        .create(req)
        .pipe(finalize(() => this._spinnerService.hiddenSpinner()))
        .subscribe({
          next: (res) => {
            this._router.navigate(['/geofences']);
          },
          error: (err) => {
            this._matSnackBar.open('Error on save', 'Close', {
              duration: 5000,
            });
          },
        });
    }
  }

  private updateLocationOnMap(newCenter: LngLat): void {
    const source = this.map?.getSource('device-location') as any;
    if (!source) {
      console.error('Source "device-location" is not found in the map.');
      return;
    }
    source.setData({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [newCenter.lng, newCenter.lat],
          },
        },
      ],
    });
  }

  private createAnimatedImage(): HTMLCanvasElement {
    const size = 60;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d')!;

    let radius = 15;
    let growing = true;

    const drawFrame = () => {
      context.clearRect(0, 0, size, size);

      context.beginPath();
      context.arc(size / 2, size / 2, radius, 0, Math.PI * 2, true);
      context.fillStyle = 'rgba(30, 144, 255, 0.3)';
      context.fill();

      context.beginPath();
      context.arc(size / 2, size / 2, 10, 0, Math.PI * 2, true);
      context.fillStyle = '#1E90FF';
      context.fill();

      if (growing) {
        radius += 0.5;
        if (radius >= 25) growing = false;
      } else {
        radius -= 0.5;
        if (radius <= 15) growing = true;
      }

      requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return canvas;
  }
}
