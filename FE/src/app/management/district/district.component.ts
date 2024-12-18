import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProvinceService } from '../../services/province.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { DistrictService } from '../../services/district.service';
import { ConstData } from '../../Dto/ConstData';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrl: './district.component.scss'
})
export class DistrictComponent implements OnInit {
  districtForm!: FormGroup;
  currentPage: number = 1;
  skipCount: number = 0;
  totalCount: number = 0;
  pageCount: number = 0;
  defaultResultCount: number = 10;
  filter: string = "";
  provinceCode: string = "";
  provinceList: any;
  districtList: any;

  constructor(private formBuilder: FormBuilder, private service: DistrictService,
    private provinceService: ProvinceService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode);
    this.getListProvinceForSelect();
    this.districtForm = this.formBuilder.group({
      filter: this.filter,
      provinceCode: this.provinceCode,
    });
  }

  loadData(skipCount: number, resultCount: number, filter: string, maTinh: string) {
    this.districtList = [];
    this.service.getPageDistrict(skipCount, resultCount, filter, maTinh).subscribe({
      next: (data: any) => {
        this.districtList = data.items;
        this.totalCount = data.totalCount;
        this.pageCount = Math.ceil(this.totalCount / this.defaultResultCount);
      }
    },
    );
  }

  getListProvinceForSelect() {
    this.provinceService.getAllProvince().subscribe({
      next: (data: any) => {
        this.provinceList = data;
      },
    })
  }

  onProvinceChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.provinceCode = selectElement.value;
    this.skipCount = 0;
    this.currentPage = 1;
    this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode);
  }

  onSubmit() {
    let value = this.districtForm.value;
    if (value.filter !== this.filter) {
      this.skipCount = 0;
      this.currentPage = 1;
      this.filter = value.filter;
    }
    this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode);
  }

  sendDataToLocalStorage() {
    this.localStorageService.setDataLocalStorage(ConstData.LISTDATA, this.districtList);
  }

  deleteDistrict(districtId: number) {
    this.service.deleteDistrict(districtId).subscribe(
      (response) => {
        console.log('Response from API:', response);
        alert("Delete district successfully!");
        this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode);
      },
      (error) => {
        console.error('Error from API:', error);
        alert("Delete district failed!");
      }
    );;
  }

  first() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.skipCount = 0;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode);
    }
  }

  prev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.skipCount -= this.defaultResultCount;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode);
    }
  }

  next() {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
      this.skipCount += this.defaultResultCount;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode);
    }
  }

  last() {
    if (this.currentPage < this.pageCount) {
      this.currentPage = this.pageCount;
      this.skipCount = (this.pageCount - 1) * this.defaultResultCount;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode);
    }
  }
}
