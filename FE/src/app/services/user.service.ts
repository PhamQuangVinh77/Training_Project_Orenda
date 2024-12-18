import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstData } from '../Dto/ConstData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private service: LocalStorageService, private router : Router) {
  }

  login(userName: string, password: string) {
    let url = ConstData.LOGIN;
    let data = {
      UserName: userName,
      Password: password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.httpClient.post<any>(url, data, { headers }).subscribe({
      next: (response) => {
        this.service.setDataLocalStorage(ConstData.CURRENTUSER, userName);
        this.service.setDataLocalStorage(ConstData.ACCESSTOKEN, response.message);
        alert('Login successfully!');
        window.location.href = '/products';
      },
      error: (err) => {
        alert(err.error.message);
      }
    })
  }

  checkToken() {
    let userName = this.service.getDataLocalStorage(ConstData.CURRENTUSER);
    if (userName == null) userName = "";
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    if (token == null) token = "";
    let url = ConstData.SECUREDATA;
    let data = {
      Username: userName,
      Token: token
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.httpClient.post<any>(url, data, { headers }).subscribe({
      next: (response) => {
      },
      error: (err) => {
        alert(err.error.message);
        this.router.navigate(['/login']);
        return false;
      }
    })
    return true;
  }
}