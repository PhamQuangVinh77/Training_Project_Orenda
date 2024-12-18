import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './authentication/guards/login.guard';

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
    canActivate: [LoginGuard]
  },
  {
    path: 'products', 
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'accounts',
    loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
    canActivate: [LoginGuard]
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
