import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DistrictService } from '../../services/district.service';
import { ProvinceService } from '../../services/province.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommuneService } from '../../services/commune.service';
import { ConstData } from '../../Dto/ConstData';

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrl: './commune.component.scss'
})
export class CommuneComponent implements OnInit {
  communeForm!: FormGroup;
  currentPage: number = 1;
  skipCount: number = 0;
  totalCount: number = 0;
  pageCount: number = 0;
  defaultResultCount: number = 10;
  filter: string = "";
  provinceCode: string = "";
  districtCode: string = "";
  provinceList: any;
  districtList: any;
  communeList: any;

  constructor(private formBuilder: FormBuilder, private service: CommuneService, private districtService: DistrictService,
    private provinceService: ProvinceService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode, this.districtCode);
    this.getListProvinceForSelect();
    this.communeForm = this.formBuilder.group({
      filter: this.filter,
      provinceCode: this.provinceCode,
      districtCode: this.districtCode
    });
  }

  onSubmit() {
    let value = this.communeForm.value;
    if (value.filter !== this.filter) {
      this.skipCount = 0;
      this.currentPage = 1;
      this.filter = value.filter;
    }
    this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode, this.districtCode);
  }

  loadData(skipCount: number, resultCount: number, filter: string, maTinh: string, maHuyen: string) {
    this.communeList = [];
    this.service.getPageCommune(skipCount, resultCount, filter, maTinh, maHuyen).subscribe({
      next: (data: any) => {
        this.communeList = data.items;
        this.totalCount = data.totalCount;
        this.pageCount = Math.ceil(this.totalCount / this.defaultResultCount);
      }
    });
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
    this.districtCode = "";
    this.skipCount = 0;
    this.currentPage = 1;
    this.getListDistrictForSelect(this.provinceCode);
    this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode, this.districtCode);
  }

  getListDistrictForSelect(provinceCode : string) {
    this.districtService.getAllDistrict(provinceCode).subscribe({
      next: (data: any) => {
        this.districtList = data;
      },
    })
  }

  onDistrictChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.districtCode = selectElement.value;
    this.skipCount = 0;
    this.currentPage = 1;
    this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode, this.districtCode);
  }

  sendDataToLocalStorage() {
    this.localStorageService.setDataLocalStorage(ConstData.LISTDATA, this.communeList);
  }

  deleteCommune(districtId: number) {
    this.service.deleteCommune(districtId).subscribe(
      (response) => {
        console.log('Response from API:', response);
        alert("Delete commune successfully!");
        this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode, this.districtCode);
      },
      (error) => {
        console.error('Error from API:', error);
        alert("Delete commune failed!");
      }
    );;
  }

  first() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.skipCount = 0;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode, this.districtCode);
    }
  }

  prev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.skipCount -= this.defaultResultCount;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode, this.districtCode);
    }
  }

  next() {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
      this.skipCount += this.defaultResultCount;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode, this.districtCode);
    }
  }

  last() {
    if (this.currentPage < this.pageCount) {
      this.currentPage = this.pageCount;
      this.skipCount = (this.pageCount - 1) * this.defaultResultCount;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter, this.provinceCode, this.districtCode);
    }
  }
}
