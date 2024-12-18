import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ConstData } from '../../../Dto/ConstData';
import { ProvinceService } from '../../../services/province.service';

@Component({
  selector: 'app-edit-province',
  templateUrl: './edit-province.component.html',
  styleUrl: './edit-province.component.scss'
})
export class EditProvinceComponent implements OnInit {
  editProvinceForm!: FormGroup;
  listProvince: any[] = [];
  provinceId: number = 0;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService, private service: ProvinceService) {
    this.listProvince = this.localStorageService.getDataLocalStorage(ConstData.LISTDATA);
  }

  ngOnInit(): void {
    this.provinceId = this.activatedRoute.snapshot.params?.['id'];
    let selectedProvince = this.listProvince.find(x => x.id == this.provinceId);
    this.editProvinceForm = this.fb.group({
      maTinh: selectedProvince?.maTinh,
      tenTinh: selectedProvince?.tenTinh,
      cap: selectedProvince?.cap,
      isActive: selectedProvince?.isActive == true ? "1" : "0"
    })
  }

  onSubmit() {
    let value = this.editProvinceForm.value;
    this.service.createOrUpdateProvince(this.provinceId, value.maTinh, value.tenTinh, value.cap, value.isActive == "1" ? true : false)
    .subscribe(
      (response) => {
        console.log('Response from API:', response);
        if(response.errorMessage == ""){
          alert("Update province successfully!");
          window.history.back();
        }else{
          alert(response.errorMessage);
        }
      },
      (error) => {
        console.error('Error from API:', error);
        alert("Update province failed!");
      }
    );;
  }
}
