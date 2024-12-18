import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
      path: '', 
      component: LoginComponent,
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [UserService, LocalStorageService]
})
export class AuthenticationModule { }
