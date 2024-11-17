import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
import { MatSliderModule } from '@angular/material/slider';
import { DeviceService, SocketService } from '@devices/services';

@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [MatSliderModule],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements OnInit, AfterViewInit, OnDestroy {
  private _socketService = inject(SocketService);
  private _deviceService = inject(DeviceService);

  @ViewChild('map') divMap?: ElementRef;
  zoom: number = 13;
  map?: Map;
  public currentCenter: LngLat = new LngLat(-77.0428, -12.0464);

  ngOnInit(): void {
    this._socketService.getLocationData(this._deviceService.apiKey!).subscribe({
      next: (data) => {
        this.currentCenter = new LngLat(data.longitude, data.latitude);
        if (this.map) {
          // this.updateLocationOnMap(this.currentCenter);
          // this.map!.setCenter(this.currentCenter);
        }
      },
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

    this.map.on('load', () => {
      const animatedCanvas = this.createAnimatedImage();

      createImageBitmap(animatedCanvas).then((imageBitmap) => {
        this.map!.addImage('animated-location', imageBitmap);
      });

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

      this.map!.addLayer({
        id: 'device-location-symbol',
        type: 'symbol',
        source: 'device-location',
        layout: {
          'icon-image': 'animated-location',
          'icon-size': 1,
        },
      });
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

  private updateLocationOnMap(newCenter: LngLat): void {
    const source = this.map?.getSource('device-location') as any;
    if (source) {
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
  }
}
