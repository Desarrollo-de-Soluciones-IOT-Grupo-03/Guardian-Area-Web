import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';
import { HeartRate } from '../models/heart-rate';

@Injectable({
  providedIn: 'root'
})
export class HeartRateService {
  private _http: HttpClient = inject(HttpClient);
  private readonly _apiUrl: string = environment.apiUrl + 'heart-rates';

  getAllHeartRateRegisters(): Observable<HeartRate[]> {
    return this._http.get<HeartRate[]>(this._apiUrl);
  }
}
