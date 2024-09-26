import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { ActivityQuery } from '../models/activity-query';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private _http: HttpClient = inject(HttpClient);
  private readonly _apiUrl: string = environment.apiUrl + 'activities';

  getAllActivitiesByUserId(query: ActivityQuery): Observable<Activity[]> {
    return this._http.get<Activity[]>(this._apiUrl, { params: { ...query } });
  }

}
