import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Device } from '@devices/models';
import { environment } from '@env/environment.prod';
import { User } from '@settings/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = environment.apiUrl + 'users';
  private http = inject(HttpClient);

  getById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

  getAllDevices(id: number): Observable<Device[]> {
    const url = `${this.baseUrl}/${id}/devices`;
    return this.http.get<Device[]>(url);
  }
}
