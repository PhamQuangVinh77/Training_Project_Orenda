import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './authentication/guards/login.guard';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'management', 
    loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
    canActivate: [loginGuard]
  },
  {
    path: 'products', 
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
    canActivate: [loginGuard]
  },
  {
    path: 'accounts',
    loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
    canActivate: [loginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
