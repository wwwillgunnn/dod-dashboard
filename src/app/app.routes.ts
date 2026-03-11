import { Routes } from '@angular/router';
import { Deployments } from './deployments/deployments';
import { Finances } from './finances/finances';
import { Assets } from './assets/assets';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'deployments', component: Deployments },
  { path: 'finances', component: Finances },
  { path: 'assets', component: Assets },
];
