import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = environment.apiUrl + 'users';
  private http = inject(HttpClient);

  getById(id: string): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

}
