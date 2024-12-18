import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDistrictComponent } from './add-district/add-district.component';
import { EditDistrictComponent } from './edit-district/edit-district.component';
import { RouterModule, Routes } from '@angular/router';
import { DistrictComponent } from './district.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProvinceService } from '../../services/province.service';
import { DistrictService } from '../../services/district.service';

const routes: Routes = [
  {
    path: '',
    component: DistrictComponent
  },
  {
    path: 'add-district',
    component: AddDistrictComponent
  },
  {
    path: 'edit-district/:id',
    component: EditDistrictComponent
  }
];

@NgModule({
  declarations: [
    DistrictComponent,
    AddDistrictComponent,
    EditDistrictComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [LocalStorageService, ProvinceService, DistrictService]
})
export class DistrictModule { }
