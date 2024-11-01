import { inject, Injectable } from '@angular/core';
import { OxygenSaturation } from '../models/oxygen-saturation';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OxygenSaturationService {
  private _http: HttpClient = inject(HttpClient);
  private readonly _apiUrl: string = environment.apiUrl + 'spo2-rates';

  getAllOxygenSaturationRegisters(): Observable<OxygenSaturation[]> {
    return this._http.get<OxygenSaturation[]>(this._apiUrl);
  }
}
