import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ProvinceService } from '../../../services/province.service';
import { ConstData } from '../../../Dto/ConstData';
import { DistrictService } from '../../../services/district.service';

@Component({
  selector: 'app-edit-district',
  templateUrl: './edit-district.component.html',
  styleUrl: './edit-district.component.scss'
})
export class EditDistrictComponent implements OnInit{
  editDistrictForm!: FormGroup;
  listProvince: any[] = [];
  listDistrict: any[] = [];
  districtId: number = 0;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private localStorageService: 
    LocalStorageService, private provinceService: ProvinceService, private service : DistrictService){
    this.listDistrict = this.localStorageService.getDataLocalStorage(ConstData.LISTDATA);
  }

  ngOnInit(): void {
    this.getListProvinceForSelect();
    this.districtId = this.activatedRoute.snapshot.params?.['id'];
    let selectedDistrict = this.listDistrict.find(d => d.id == this.districtId);
    this.editDistrictForm = this.fb.group({
      maHuyen: selectedDistrict?.maHuyen,
      tenHuyen: selectedDistrict?.tenHuyen,
      cap: selectedDistrict?.cap,
      isActive: selectedDistrict?.isActive == true ? "1" : "0",
      maTinh: selectedDistrict?.maTinh
    })
  }

  getListProvinceForSelect(){
    this.provinceService.getAllProvince().subscribe({
      next: (data: any) => {
        this.listProvince = data;
      },
    })
  }

  onSubmit(){
    let value = this.editDistrictForm.value;
    this.service.createOrUpdateDistrict(this.districtId, value.maHuyen, value.tenHuyen, value.cap, value.isActive == "1" ? true : false, value.maTinh)
    .subscribe(
      (response) => {
        console.log('Response from API:', response);
        if(response.errorMessage == ""){
          alert("Update district successfully!");
          window.history.back();
        }else{
          alert(response.errorMessage);
        }
      },
      (error) => {
        console.error('Error from API:', error);
        alert("Update district failed!");
      }
    );
  }

}
