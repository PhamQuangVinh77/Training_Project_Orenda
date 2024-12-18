import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstData } from '../Dto/ConstData';
import { UserDTO } from '../Dto/UserDTO';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class AccountsService {
  constructor(private httpClient : HttpClient, private service : LocalStorageService) { }

  getAccountFromServer() : Observable<UserDTO>{
    let url = ConstData.GETACCOUNT;
    let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.httpClient.get<UserDTO>(url, { headers });
  }

  updateAccountInfo(userId : string, avatarDocumentId: string, email: string, phoneNumber: string, name: string, 
    ngaySinh: string, gioiTinh: number, diaChi: string, maTinh: string, maHuyen: string, maXa: string){
      let url = ConstData.UPDATEACCOUNT;
      let token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
      let data = {
        "userId": userId, "avatarDocumentId": avatarDocumentId, "email": email, "phoneNumber": phoneNumber,
        "name": name, "ngaySinh": ngaySinh, "gioiTinh": gioiTinh, "diaChi": diaChi, "maTinh": maTinh, "maHuyen": maHuyen, "maXa": maXa
      };
      
      let headers = new HttpHeaders({ 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` });
      return this.httpClient.post(url, data, {headers});
  }
}
