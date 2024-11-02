import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { GeofenceReq } from '../models/geofence-req';
import { Observable } from 'rxjs';
import { Geofence } from '../models/geofence';

@Injectable({
  providedIn: 'root'
})
export class GeofenceService {
  private readonly baseUrl: string = environment.apiUrl + 'geo-fences';
  private http = inject(HttpClient);

  create(geofenceReq: GeofenceReq): Observable<Geofence> {
    return this.http.post<Geofence>(this.baseUrl, geofenceReq);
  }

}
