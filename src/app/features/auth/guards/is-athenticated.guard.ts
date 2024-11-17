import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services';

export const isAthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.token;
  if (token) {
    return true;
  }

  router.navigate(['auth/sign-in']);
  return false;
};
