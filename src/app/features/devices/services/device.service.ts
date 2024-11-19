import { ActivityQuery, Activity } from '@activities/models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Device, DeviceReq } from '@devices/models';
import { environment } from '@env/environment.prod';
import { Geofence } from '@geofence/models';
import { HealthMeasure } from '@vital-functions/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly _baseUrl: string = environment.apiUrl + 'devices';
  private _http = inject(HttpClient);

  selectDevice(device: Device): void {
    const deviceRecordId = device.guardianAreaDeviceRecordId;
    localStorage.setItem('deviceRecordId', deviceRecordId);
    localStorage.setItem('apiKey', device.apiKey);
  }

  register({
    guardianAreaDeviceRecordId,
  }: {
    guardianAreaDeviceRecordId: string;
  }): Observable<void> {
    const url = `${this._baseUrl}/register`;
    return this._http.post<void>(url, { guardianAreaDeviceRecordId });
  }

  update(id: string, device: DeviceReq): Observable<void> {
    return this._http.put<void>(`${this._baseUrl}/${id}`, device);
  }

  getAllGeofences(deviceRecordId: string): Observable<Geofence[]> {
    const url = `${this._baseUrl}/${deviceRecordId}/geo-fences`;
    return this._http.get<Geofence[]>(url);
  }

  getHealthMeasuresMonthlySummary(
    deviceRecordId: string,
  ): Observable<HealthMeasure[]> {
    const url = `${this._baseUrl}/${deviceRecordId}/health-measures-monthly-summary`;
    return this._http.get<HealthMeasure[]>(url);
  }

  getAllByRecordId(
    id: string,
    query: ActivityQuery | null,
  ): Observable<Activity[]> {
    return this._http.get<Activity[]>(`${this._baseUrl}/${id}/activities`, {
      params: { ...query },
    });
  }

  public get deviceRecordId(): string | null {
    let deviceRecordId = localStorage.getItem('deviceRecordId');
    if (deviceRecordId) {
      return deviceRecordId;
    }
    return null;
  }

  public get apiKey(): string | null {
    let apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
      return apiKey;
    }
    return null;
  }
}
