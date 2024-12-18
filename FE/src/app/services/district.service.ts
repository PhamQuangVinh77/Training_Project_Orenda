import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { ConstData } from '../Dto/ConstData';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private httpClient : HttpClient, private service : LocalStorageService) { }

  getAllDistrict(provinceCode : string): Observable<any[]>{
    let url = ConstData.GETALLDATA;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let data = { "type":2 , "cascader": provinceCode };
    let headers = new HttpHeaders({ 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` });
    return this.httpClient.post<any[]>(url, data, { headers });
  }

  getPageDistrict(skipCount: number, maxResultCount: number, filter: string, maTinh: string) {
    let url = ConstData.PAGGINGDISTRICT;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let data = { "filter": filter, "isActive": null, "skipCount": skipCount, "maxResultCount": maxResultCount, "maTinh": maTinh };
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post<any>(url, data, { headers });
  }

  createOrUpdateDistrict(id: number, maHuyen: string, tenHuyen: string, cap: string, isActive: boolean, maTinh: string) {
    let url = ConstData.CREATEPDISTRICT;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let data = { "maTinh": maTinh, "maHuyen": maHuyen, "tenHuyen": tenHuyen, "cap": cap, "isActive": isActive, "id": id };
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post<any>(url, data, { headers });
  }

  deleteDistrict(districtId: number) {
    let url = ConstData.DELETEDISTRICT + "/" + String(districtId);
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post(url, {}, {headers});
  }
}
