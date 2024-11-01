import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.prod';
import { map, Observable, tap } from 'rxjs';
import { InfoSession } from '../models/info-session';
import { HttpClient } from '@angular/common/http';
import { AuthenticationReq } from '../models/authentication-req';
import { AuthStatus } from '../enums/auth-status';
import { RegisterReq } from '../models/register-req';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.apiUrl + 'authentication';
  private http = inject(HttpClient);

  private _currentUserName = signal<string | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.cheking);

  public currentUserName = computed(() => this._currentUserName());
  public authStatus = computed(() => this._authStatus());

  signIn(authentication: AuthenticationReq): Observable<boolean> {
    const url = this.baseUrl + '/sign-in';
    return this.http.post<InfoSession>(url, authentication)
      .pipe(
        tap((response: InfoSession) => {
          this._currentUserName.set(response.username);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', response.token);
        }),
        map(() => true),
      );
  }

  signUp(registerReq: RegisterReq): Observable<boolean> {
    const url = this.baseUrl + '/sign-up';
    return this.http.post(url, registerReq)
      .pipe(
        map(() => true),
      );
  }
}
