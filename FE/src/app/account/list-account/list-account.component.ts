import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProvinceService } from '../../services/province.service';
import { DistrictService } from '../../services/district.service';
import { CommuneService } from '../../services/commune.service';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrl: './list-account.component.scss',
})
export class ListAccountComponent implements OnInit {
  accountForm!: FormGroup;
  provinceList : any;
  districtList: any;
  communeList: any;
  userName : string = '';
  email : string = '';
  name : string = '';
  userId : string = '';
  constructor(private formBuilder: FormBuilder, private accountService: AccountsService, 
              private provinceService : ProvinceService, private districtService : DistrictService,
              private communeService : CommuneService) {}

  ngOnInit(): void {
    this.getAccountInfoFromServer();
    this.getListProvinceFromServer();
  }

  getAccountInfoFromServer(){
    this.accountService.getAccountFromServer().subscribe({
      next: (data: any) => {
        this.accountForm = this.formBuilder.group({
          userName: data.userSession?.userName,
          email: data.userSession?.email,
          phoneNumber: data.userSession?.phoneNumber,
          name: data.userSession?.name,
          birthday: data.userSession.ngaySinh !== null ? data.userSession.ngaySinh.split('T')[0] : "",
          sex: data.userSession?.gioiTinh,
          address: data.userSession?.diaChi,
          provinceCode: data.userSession?.maTinh,
          districtCode: data.userSession?.maHuyen,
          communeCode: data.userSession?.maXa
        });
        this.userName = data.userSession?.userName;
        this.email = data.userSession?.email;
        this.name = data.userSession?.name;
        this.userId = data.userSession?.id;
        if(this.districtList == null){
          this.getListDistrictFromServer(data.userSession?.maTinh);
        }
        if(this.communeList == null){
          this.getListCommuneFromServer(data.userSession?.maHuyen);
        }
      },
    })
  }

  getListProvinceFromServer(){
    this.provinceService.getAllProvince().subscribe({
      next: (data: any) => {
        this.provinceList = data;
      },
    })
  }

  onProvinceChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.getListDistrictFromServer(selectElement.value);
    this.communeList = [];
  }

  getListDistrictFromServer(provinceCode : string){
    this.districtService.getAllDistrict(provinceCode).subscribe({
      next: (data: any) => {
        this.districtList = data;
      },
    })
  }

  onDistrictChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.getListCommuneFromServer(selectElement.value);
  }

  getListCommuneFromServer(districtCode : string){
    this.communeService.getAllCommune(districtCode).subscribe({
      next: (data: any) => {
        this.communeList = data;
      },
    })
  }

  onSubmit(){
    let value = this.accountForm.value;
    let defaultAvatarId = "3a168986-3a3c-e6e4-8183-e623c45b3339";
    console.log(value);
    this.accountService.updateAccountInfo(this.userId, defaultAvatarId, value.email, value.phoneNumber, value.name,
      value.ngaySinh, value.gioiTinh, value.diaChi, value.maTinh, value.maHuyen, value.maXa).subscribe(
        (response) => {
          console.log('Response from API:', response);
          alert("Update account successfully!");
          this.ngOnInit();
        },
        (error) => {
          console.error('Error from API:', error);
          alert("Update account failed!");
        }
    );
  }
}

