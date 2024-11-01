import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment.prod';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requiereToken = !request.url.startsWith(environment.apiUrl + 'auth');
    let token: string = '';
    if (requiereToken) {
      token = this.authService.token;
      if (!token) this.router.navigate(['/']);
    }
    return this.requestWith(request, next, token);
  }

  requestWith(request: HttpRequest<any>, next: HttpHandler, token?: string): Observable<HttpEvent<any>> {
    let tokenStr = token ? `Bearer ${token}` : '';
    request = request.clone({
      setHeaders: {
        Authorization: `${tokenStr}`,
      },
    });
    return next.handle(request);
  }
}

export function tokenInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = new AuthService();
  const router = new Router();
  const interceptor = new TokenInterceptor(authService, router);

  const handler: HttpHandler = {
    handle: next
  };

  return interceptor.intercept(req, handler);
}
