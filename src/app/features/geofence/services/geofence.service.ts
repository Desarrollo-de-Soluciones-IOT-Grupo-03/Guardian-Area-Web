import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { GeofenceReq, Geofence } from '@geofence/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeofenceService {
  private readonly baseUrl: string = environment.apiUrl + 'geo-fences';
  private http = inject(HttpClient);

  create(geofenceReq: GeofenceReq): Observable<Geofence> {
    return this.http.post<Geofence>(this.baseUrl, geofenceReq);
  }

  getById(id: string): Observable<Geofence> {
    return this.http.get<Geofence>(`${this.baseUrl}/${id}`);
  }

  update(id: string, req: GeofenceReq): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, req);
  }
}
