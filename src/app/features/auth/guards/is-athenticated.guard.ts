import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enums/auth-status';

export const isAthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  router.navigate(['auth/sign-in']);
  return false;
};
