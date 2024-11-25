import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import mapboxgl from 'mapbox-gl';
import { tokenInterceptorFn } from '@auth/interceptors';
mapboxgl.accessToken =
  'pk.eyJ1IjoibWplbm4iLCJhIjoiY20xZW5oNWZiMnI5djJrb2kzOWd3cWN4byJ9.KyJ5iCnNVesFZgzYoUG2og';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptorFn])),
  ],
};
