import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProvinceService } from '../../../services/province.service';

@Component({
  selector: 'app-add-province',
  templateUrl: './add-province.component.html',
  styleUrl: './add-province.component.scss'
})
export class AddProvinceComponent implements OnInit {
  addProvinceForm!: FormGroup;
  provinceId: number = 0;
  constructor(private fb: FormBuilder, private service: ProvinceService) {

  }

  ngOnInit(): void {
    this.addProvinceForm = this.fb.group({
      maTinh: "",
      tenTinh: "",
      cap: "",
      isActive: "0",
    })
  }

  onSubmit() {
    let value = this.addProvinceForm.value;
    this.service.createOrUpdateProvince(this.provinceId, value.maTinh, value.tenTinh, value.cap, value.isActive == "1" ? true : false).subscribe(
      (response) => {
        console.log('Response from API:', response);
        if(response.errorMessage == ""){
          alert("Add new province successfully!");
          window.history.back();
        }else{
          alert(response.errorMessage);
        }
      },
      (error) => {
        console.error('Error from API:', error);
        alert("Add new province failed!");
      }
    );
  }
}
