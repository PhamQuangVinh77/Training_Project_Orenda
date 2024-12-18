import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { ConstData } from '../Dto/ConstData';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private httpClient: HttpClient, private service: LocalStorageService) { }

  getAllProvince(): Observable<any[]> {
    let url = ConstData.GETALLDATA;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let data = { "type": 1, "cascader": "" };
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post<any[]>(url, data, { headers });
  }

  getPageProvince(skipCount: number, maxResultCount: number, filter: string) {
    let url = ConstData.PAGGINGPROVINCE;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let data = { "filter": filter, "isActive": null, "skipCount": skipCount, "maxResultCount": maxResultCount };
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post<any>(url, data, { headers });
  }

  createOrUpdateProvince(id: number, maTinh: string, tenTinh: string, cap: string, isActive: boolean) {
    let url = ConstData.CREATEPROVINCE;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let data = { "maTinh": maTinh, "tenTinh": tenTinh, "cap": cap, "isActive": isActive, "id": id };
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post<any>(url, data, { headers });
  }

  deleteProvince(provinceId: number) {
    let url = ConstData.DELETEPROVINCE + "/" + String(provinceId);
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post(url, {}, {headers});
  }
}
