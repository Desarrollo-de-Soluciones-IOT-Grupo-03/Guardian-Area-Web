import { Routes } from '@angular/router';
import { SignInComponent } from './features/auth/pages/sign-in/sign-in.component';
import { MenuComponent } from './core/components/menu/menu.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
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
    path: 'guardian-area',
    component: MenuComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('@home/pages/main-panel/main-panel.component').then(m => m.MainPanelComponent),
      },
      {
        path: 'activity-history',
        loadComponent: () => import('@activities/pages/activity-history/activity-history.component').then(m => m.ActivityHistoryComponent),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },

];
