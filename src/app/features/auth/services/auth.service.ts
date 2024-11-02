import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';
import { map, Observable, tap } from 'rxjs';
import { InfoSession } from '../models/info-session';
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
  private _userId = signal<number | null>(null);

  public currentUserName = computed(() => this._currentUserName());
  public authStatus = computed(() => this._authStatus());
  public userId = computed(() => this._userId());

  signIn(authentication: AuthenticationReq): Observable<boolean> {
    const url = this.baseUrl + '/sign-in';
    return this.http.post<InfoSession>(url, authentication)
      .pipe(
        tap((response: InfoSession) => {
          this._currentUserName.set(response.username);
          this._authStatus.set(AuthStatus.authenticated);
          this._userId.set(response.id);
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username.toString());
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

  logOut(): void {
    this._currentUserName.set(null);
    this._authStatus.set(AuthStatus.unauthenticated);
    this._userId.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('deviceRecordId');
  }

  public get token(): string {
    return localStorage.getItem('token')!;
  }

  public get username(): string {
    return localStorage.getItem('username')!;
  }
}
