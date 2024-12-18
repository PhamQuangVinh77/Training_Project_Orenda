import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ConstData } from '../../Dto/ConstData';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  token : string = "";
  url : string = ConstData.LOGOUT;

  constructor(private service : LocalStorageService, private httpClient: HttpClient){}

  ngOnInit(): void {
    this.token = this.service.getDataLocalStorage(ConstData.ACCESSTOKEN);
  }

  logout(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.httpClient.post(this.url, { headers }); 
    this.service.deleteDataLocalStorage(ConstData.ACCESSTOKEN);
    alert("Logout successfully!");
  }
}
