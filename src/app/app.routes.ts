import { Routes } from '@angular/router';
import { MenuComponent } from './core/components/menu/menu.component';
import { isAthenticatedGuard } from './features/auth/guards/is-athenticated.guard';

export const routes: Routes = [
  {
    path: ':userId',
    component: MenuComponent,
    canActivate: [isAthenticatedGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('@home/pages/main-panel/main-panel.component').then(m => m.MainPanelComponent),
      },
      {
        path: 'activity-history',
        loadComponent: () => import('@activities/pages/activity-history/activity-history.component').then(m => m.ActivityHistoryComponent),
      },
      {
        path: 'vital-functions',
        loadComponent: () => import('@vital-functions/pages/vital-functions/vital-functions.component').then(m => m.VitalFunctionsComponent),
      },
      {
        path: 'geofences',
        children: [
          {
            path: '',
            loadComponent: () => import('@geofence/pages/geofences/geofences.component').then(m => m.GeofencesComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('@geofence/pages/geofence-add-edit/geofence-add-edit.component').then(m => m.GeofenceAddEditComponent),
          },
          {
            path: 'add',
            loadComponent: () => import('@geofence/pages/geofence-add-edit/geofence-add-edit.component').then(m => m.GeofenceAddEditComponent),
          },
        ]
      },
      {
        path: 'profile',
        loadComponent: () => import('@settings/pages/profile/profile.component').then(m => m.ProfileComponent),
      },
      {
        path: 'devices',
        loadComponent: () => import('@devices/pages/devices/devices.component').then(m => m.DevicesComponent),
      }
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('@auth/auth/layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('@auth/auth/pages/sign-in/sign-in.component').then(m => m.SignInComponent),
      },
      {
        path: 'sign-up',
        children: [
          {
            path: '',
            loadComponent: () => import('@auth/auth/pages/sign-up/sign-up.component').then(m => m.SignUpComponent),
          },
          {
            path: 'form-plan',
            loadComponent: () => import('@auth/auth/pages/form-plans/form-plans.component').then(m => m.FormPlansComponent),
          },
          {
            path: 'payment-method',
            loadComponent: () => import('@auth/auth/pages/form-payment-method/form-payment-method.component').then(m => m.FormPaymentMethodComponent),
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'sign-in',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },

];
