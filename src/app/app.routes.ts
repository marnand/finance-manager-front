import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  // lazy loading standalone component
  { path: '', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'registrar', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
];
