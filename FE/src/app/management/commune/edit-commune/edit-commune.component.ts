import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ProvinceService } from '../../../services/province.service';
import { DistrictService } from '../../../services/district.service';
import { CommuneService } from '../../../services/commune.service';
import { ConstData } from '../../../Dto/ConstData';

@Component({
  selector: 'app-edit-commune',
  templateUrl: './edit-commune.component.html',
  styleUrl: './edit-commune.component.scss'
})
export class EditCommuneComponent implements OnInit{
  editCommuneForm!: FormGroup;
  listProvince: any;
  listDistrict: any;
  listCommune: any[] = [];
  communeId: number = 0;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService, 
    private provinceService: ProvinceService, private districtService : DistrictService, private service : CommuneService){
      this.listCommune = this.localStorageService.getDataLocalStorage(ConstData.LISTDATA);
    }

  ngOnInit(): void {
    this.getListProvinceForSelect();
    this.communeId = this.activatedRoute.snapshot.params?.['id'];
    let selectedCommune = this.listCommune.find(c => c.id == this.communeId);
    this.editCommuneForm = this.fb.group({
      maXa: selectedCommune?.maXa,
      tenXa: selectedCommune?.tenXa,
      cap: selectedCommune?.cap,
      maTinh: selectedCommune?.maTinh,
      maHuyen: selectedCommune?.maHuyen,
      isActive: selectedCommune?.isActive == true ? "1" : "0",
      isXaNgheo: selectedCommune?.isXaNgheo == true ? "1" : "0",
      isXaMienNui: selectedCommune?.isXaMienNui == true ? "1" : "0",
      isXaDanToc: selectedCommune?.isXaDanToc == true ? "1" : "0",
      isThanhThi: selectedCommune?.isThanhThi == true ? "1" : "0",
    })
    if(this.listDistrict == null){
      this.getListDistrictForSelect(selectedCommune?.maTinh);
    }
  }

  getListProvinceForSelect(){
    this.provinceService.getAllProvince().subscribe({
      next: (data: any) => {
        this.listProvince = data;
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
        this.listDistrict = data;
      },
    })
  }

  onSubmit(){
    let value = this.editCommuneForm.value;
    this.service.createOrUpdateCommune(value.maTinh, value.maHuyen, value.maXa, value.tenXa, value.cap,
      value.isXaNgheo == "1" ? true : false, value.isXaMienNui == "1" ? true : false, value.isXaDanToc == "1" ? true : false, 
      value.isThanhThi == "1" ? true : false, value.isActive == "1" ? true : false, this.communeId)
    .subscribe(
      (response) => {
        console.log('Response from API:', response);
        if(response.errorMessage == ""){
          alert("Update commune successfully!");
          window.history.back();
        }else{
          alert(response.errorMessage);
        }
      },
      (error) => {
        console.error('Error from API:', error);
        alert("Update commune failed!");
      }
    );
  }
}
