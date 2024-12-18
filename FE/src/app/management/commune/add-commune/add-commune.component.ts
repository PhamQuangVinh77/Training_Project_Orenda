import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DistrictService } from '../../../services/district.service';
import { ProvinceService } from '../../../services/province.service';
import { CommuneService } from '../../../services/commune.service';

@Component({
  selector: 'app-add-commune',
  templateUrl: './add-commune.component.html',
  styleUrl: './add-commune.component.scss'
})
export class AddCommuneComponent implements OnInit{
  addCommuneForm!: FormGroup;
  districtList: any;
  provinceList: any;
  communeId: number = 0;

  constructor(private fb: FormBuilder, private districtService: DistrictService, 
    private provinceService : ProvinceService, private service : CommuneService) {}

  ngOnInit(): void {
    this.getListProvinceForSelect();
    this.addCommuneForm = this.fb.group({
      maXa: "",
      tenXa: "",
      cap: "",
      maTinh: "",
      maHuyen: "",
      isActive: "0",
      isXaNgheo: "0",
      isXaMienNui: "0",
      isXaDanToc: "0",
      isThanhThi: "0",
    })
  }

  getListProvinceForSelect(){
    this.provinceService.getAllProvince().subscribe({
      next: (data: any) => {
        this.provinceList = data;
      },
    })
  }

  onProvinceChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.getListDistrictForSelect(selectElement.value);
  }

  getListDistrictForSelect(provinceCode : string){
    this.districtService.getAllDistrict(provinceCode).subscribe({
      next: (data: any) => {
        this.districtList = data;
      },
    })
  }

  onSubmit(){
    let value = this.addCommuneForm.value;
    this.service.createOrUpdateCommune(value.maTinh, value.maHuyen, value.maXa, value.tenXa, value.cap,
      value.isXaNgheo == "1" ? true : false, value.isXaMienNui == "1" ? true : false, value.isXaDanToc == "1" ? true : false, 
      value.isThanhThi == "1" ? true : false, value.isActive == "1" ? true : false, this.communeId)
    .subscribe(
      (response) => {
        console.log('Response from API:', response);
        if(response.errorMessage == ""){
          alert("Add new commune successfully!");
          window.history.back();
        }else{
          alert(response.errorMessage);
        }
      },
      (error) => {
        console.error('Error from API:', error);
        alert("Add new commune failed!");
      }
    );
  }
}
