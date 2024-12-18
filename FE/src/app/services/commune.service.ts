import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { ConstData } from '../Dto/ConstData';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  constructor(private httpClient : HttpClient, private service : LocalStorageService) { }

  getAllCommune(districtCode : string) : Observable<any[]>{
    let url = ConstData.GETALLDATA;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let data = { "type":3 , "cascader": districtCode };
    let headers = new HttpHeaders({ 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` });
    return this.httpClient.post<any[]>(url, data, { headers });
  }

  getPageCommune(skipCount: number, maxResultCount: number, filter: string, maTinh: string, maHuyen: string) {
    let url = ConstData.PAGGINGCOMMUNE;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let data = { "filter": filter, "isActive": null, "skipCount": skipCount, "maxResultCount": maxResultCount, 
      "maTinh": maTinh, "maHuyen": maHuyen };
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post<any>(url, data, { headers });
  }

  createOrUpdateCommune(maTinh: string, maHuyen: string, maXa: string, tenXa: string, cap: string,
    isXaNgheo: boolean, isXaMienNui: boolean, isXaDanToc: boolean, isThanhThi: boolean, isActive: boolean, id: number) {
    let url = ConstData.CREATEPCOMMUNE;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let data = { "maTinh": maTinh, "maHuyen": maHuyen, "maXa": maXa, "tenXa": tenXa, "cap": cap, "isXaNgheo": isXaNgheo,
      "isXaMienNui": isXaMienNui, "isXaDanToc": isXaDanToc, "isThanhThi": isThanhThi, "isActive": isActive, "id": id };
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post<any>(url, data, { headers });
  }

  deleteCommune(communeId: number) {
    let url = ConstData.DELETECOMMUNE + "/" + String(communeId);
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.post(url, {}, {headers});
  }
}
