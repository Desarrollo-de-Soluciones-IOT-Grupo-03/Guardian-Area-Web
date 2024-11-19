import { Routes } from '@angular/router';
import { isAthenticatedGuard } from './features/auth/guards';
import { MenuComponent } from '@core/components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MenuComponent,
    canActivate: [isAthenticatedGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('@home/pages/main-panel/main-panel.component').then(
            (m) => m.MainPanelComponent,
          ),
      },
      {
        path: 'activity-history',
        loadComponent: () =>
          import(
            '@activities/pages/activity-history/activity-history.component'
          ).then((m) => m.ActivityHistoryComponent),
      },
      {
        path: 'speak-device',
        loadComponent: () =>
          import('@devices/pages/speak-device/speak-device.component').then(
            (m) => m.SpeakDeviceComponent,
          ),
      },
      {
        path: 'vital-functions',
        loadComponent: () =>
          import(
            '@vital-functions/pages/vital-functions/vital-functions.component'
          ).then((m) => m.VitalFunctionsComponent),
      },
      {
        path: 'geofences',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@geofence/pages/geofences/geofences.component').then(
                (m) => m.GeofencesComponent,
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import(
                '@geofence/pages/geofence-add-edit/geofence-add-edit.component'
              ).then((m) => m.GeofenceAddEditComponent),
          },
          {
            path: 'add',
            loadComponent: () =>
              import(
                '@geofence/pages/geofence-add-edit/geofence-add-edit.component'
              ).then((m) => m.GeofenceAddEditComponent),
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@settings/pages/profile/profile.component').then(
                (m) => m.ProfileComponent,
              ),
          },
          {
            path: 'edit',
            loadComponent: () =>
              import(
                '@settings/pages/edit-profile/edit-profile.component'
              ).then((m) => m.EditProfileComponent),
          },
        ],
      },
      {
        path: 'devices',
        loadComponent: () =>
          import('@devices/pages/devices/devices.component').then(
            (m) => m.DevicesComponent,
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@auth/layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent,
      ),
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('@auth/pages/sign-in/sign-in.component').then(
            (m) => m.SignInComponent,
          ),
      },
      {
        path: 'sign-up',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@auth/pages/sign-up/sign-up.component').then(
                (m) => m.SignUpComponent,
              ),
          },
          {
            path: 'form-plan',
            loadComponent: () =>
              import('@auth/pages/form-plans/form-plans.component').then(
                (m) => m.FormPlansComponent,
              ),
          },
          {
            path: 'payment-method',
            loadComponent: () =>
              import(
                '@auth/pages/form-payment-method/form-payment-method.component'
              ).then((m) => m.FormPaymentMethodComponent),
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'sign-in',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
];
