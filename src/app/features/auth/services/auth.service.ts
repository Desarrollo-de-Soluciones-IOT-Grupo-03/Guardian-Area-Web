import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';
import { map, Observable, tap } from 'rxjs';
import { AuthStatus } from '@auth/enums';
import { AuthenticationReq, InfoSession, RegisterReq } from '@auth/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.apiUrl + 'authentication';
  private http = inject(HttpClient);

  private _currentUserName = signal<string | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.cheking);
  private _userId = signal<number | null>(null);

  public currentUserName = computed(() => this._currentUserName());
  public authStatus = computed(() => this._authStatus());

  signIn(authentication: AuthenticationReq): Observable<boolean> {
    const url = this.baseUrl + '/sign-in';
    return this.http.post<InfoSession>(url, authentication).pipe(
      tap((response: InfoSession) => {
        this._currentUserName.set(response.username);
        this._authStatus.set(AuthStatus.authenticated);
        this._userId.set(response.id);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username.toString());
        localStorage.setItem('userId', response.id.toString());
      }),
      map(() => true),
    );
  }

  signUp(registerReq: RegisterReq): Observable<boolean> {
    const url = this.baseUrl + '/sign-up';
    return this.http.post(url, registerReq).pipe(map(() => true));
  }

  logOut(): void {
    this._currentUserName.set(null);
    this._authStatus.set(AuthStatus.unauthenticated);
    this._userId.set(null);

    localStorage.clear();
  }

  public get token(): string {
    return localStorage.getItem('token')!;
  }

  public get username(): string {
    return localStorage.getItem('username')!;
  }

  public get userId(): number {
    return +localStorage.getItem('userId')!;
  }

  public get devideRecordId(): string {
    return localStorage.getItem('deviceRecordId')!;
  }
}
