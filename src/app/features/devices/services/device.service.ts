import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly baseUrl: string = environment.apiUrl + 'devices';
  private http = inject(HttpClient);
  private _deviceRecordId = signal<string | null>(null);

  selectDevice(deviceRecordId: string): void {
    localStorage.setItem('deviceRecordId', deviceRecordId);
  }

  public get deviceRecordId(): string | null {
    let deviceRecordId = localStorage.getItem('deviceRecordId');
    if (deviceRecordId) {
      return deviceRecordId;
    }
    return null;
  }
}
