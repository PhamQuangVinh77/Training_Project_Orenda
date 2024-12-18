import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCommuneComponent } from './add-commune/add-commune.component';
import { EditCommuneComponent } from './edit-commune/edit-commune.component';
import { RouterModule, Routes } from '@angular/router';
import { CommuneComponent } from './commune.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProvinceService } from '../../services/province.service';
import { DistrictService } from '../../services/district.service';
import { CommuneService } from '../../services/commune.service';

const routes: Routes = [
  {
    path: '',
    component: CommuneComponent
  },
  {
    path: 'add-commune',
    component: AddCommuneComponent
  },
  {
    path: 'edit-commune/:id',
    component: EditCommuneComponent
  }
];

@NgModule({
  declarations: [
    CommuneComponent,
    AddCommuneComponent,
    EditCommuneComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [LocalStorageService, ProvinceService, DistrictService, CommuneService]
})
export class CommuneModule { }
