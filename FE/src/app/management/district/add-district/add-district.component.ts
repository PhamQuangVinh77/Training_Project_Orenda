import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DistrictService } from '../../../services/district.service';
import { ProvinceService } from '../../../services/province.service';

@Component({
  selector: 'app-add-district',
  templateUrl: './add-district.component.html',
  styleUrl: './add-district.component.scss'
})
export class AddDistrictComponent implements OnInit{
  provinceList: any;
  addDistrictForm!: FormGroup;
  districtId: number = 0;

  constructor(private fb: FormBuilder, private service: DistrictService, private provinceService : ProvinceService) {}

  ngOnInit(): void {
    this.getListProvinceForSelect();
    this.addDistrictForm = this.fb.group({
      maHuyen: "",
      tenHuyen: "",
      cap: "",
      isActive: "0",
      maTinh: "",
    })
  }

  getListProvinceForSelect(){
    this.provinceService.getAllProvince().subscribe({
      next: (data: any) => {
        this.provinceList = data;
      },
    })
  }

  onSubmit(){
    let value = this.addDistrictForm.value;
    this.service.createOrUpdateDistrict(this.districtId, value.maHuyen, value.tenHuyen, value.cap, value.isActive == "1" ? true : false, value.maTinh).subscribe(
      (response) => {
        console.log('Response from API:', response);
        if(response.errorMessage == ""){
          alert("Add new district successfully!");
          window.history.back();
        }else{
          alert(response.errorMessage);
        }
      },
      (error) => {
        console.error('Error from API:', error);
        alert("Add new district failed!");
      }
    );
  }
}
