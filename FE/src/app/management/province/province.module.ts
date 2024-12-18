import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceComponent } from './province.component';
import { ProvinceService } from '../../services/province.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProvinceComponent } from './edit-province/edit-province.component';
import { AddProvinceComponent } from './add-province/add-province.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinceComponent
  },
  {
    path: 'add-province',
    component: AddProvinceComponent
  },
  {
    path: 'edit-province/:id',
    component: EditProvinceComponent
  }
];

@NgModule({
  declarations: [
    ProvinceComponent,
    EditProvinceComponent,
    AddProvinceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [LocalStorageService, ProvinceService]
})
export class ProvinceModule { }
