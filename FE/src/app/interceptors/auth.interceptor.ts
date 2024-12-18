import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { ConstData } from '../Dto/ConstData';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private localStorageService : LocalStorageService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.localStorageService.getDataLocalStorage(ConstData.ACCESSTOKEN);
    if (token != null) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned); // Gửi request với header đã add thêm token
    }

    return next.handle(req); // Nếu không có token, gửi request gốc
  }
}

