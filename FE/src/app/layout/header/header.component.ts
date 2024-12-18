import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ConstData } from '../../Dto/ConstData';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  currentUser : string = "";

  constructor(private lsService : LocalStorageService, private httpClient: HttpClient){}

  ngOnInit(): void {
    this.currentUser = this.lsService.getDataLocalStorage(ConstData.CURRENTUSER);
  }

  logout(){
    this.lsService.deleteDataLocalStorage(ConstData.CURRENTUSER);
    this.lsService.deleteDataLocalStorage(ConstData.ACCESSTOKEN);
    alert("Logout successfully!");
  }
}
