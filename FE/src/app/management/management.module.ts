import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'province',
    pathMatch: 'full'
  },
  {
    path: 'province',
    loadChildren: () => import('./province/province.module').then((m) => m.ProvinceModule)
  },
  {
    path: 'district',
    loadChildren: () => import('./district/district.module').then((m) => m.DistrictModule)
  },
  {
    path: 'commune',
    loadChildren: () => import('./commune/commune.module').then((m) => m.CommuneModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ManagementModule { }
