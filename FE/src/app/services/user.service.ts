import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConstData } from '../Dto/ConstData';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private service: LocalStorageService) { 
  }

  login(userName: string, password: string) {
    let url = ConstData.LOGIN;
    let data = new HttpParams().set('userName', userName).set('password', password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.httpClient.post<any>(url, data.toString(), {headers}).subscribe({
      next: (response) => {
        this.service.setDataLocalStorage(ConstData.ACCESSTOKEN, response.access_token);
        alert('Login successfully!');
        window.history.back();
      },
      error: (err) => {
        alert("Tài khoản hoặc mật khẩu không chính xác!");
      }
    })
  }
}
