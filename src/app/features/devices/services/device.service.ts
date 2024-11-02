import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Geofence } from '@app/features/geofence/models/geofence';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly baseUrl: string = environment.apiUrl + 'devices';
  private http = inject(HttpClient);

  selectDevice(deviceRecordId: string): void {
    localStorage.setItem('deviceRecordId', deviceRecordId);
  }

  register({ guardianAreaDeviceRecordId }: { guardianAreaDeviceRecordId: string }): Observable<void> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<void>(url, { guardianAreaDeviceRecordId });
  }

  getAllGeofences(deviceRecordId: string): Observable<Geofence[]> {
    const url = `${this.baseUrl}/${deviceRecordId}/geo-fences`;
    return this.http.get<Geofence[]>(url);
  }

  public get deviceRecordId(): string | null {
    let deviceRecordId = localStorage.getItem('deviceRecordId');
    if (deviceRecordId) {
      return deviceRecordId;
    }
    return null;
  }
}
