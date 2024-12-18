import { Component, OnInit } from '@angular/core';
import { ProvinceService } from '../../services/province.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { ConstData } from '../../Dto/ConstData';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrl: './province.component.scss'
})
export class ProvinceComponent implements OnInit {
  currentPage: number = 1;
  skipCount: number = 0;
  defaultResultCount: number = 10;
  filter: string = "";
  totalCount: number = 0;
  pageCount: number = 0;
  provinceList: any[] = [];
  provinceForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: ProvinceService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loadData(this.skipCount, this.defaultResultCount, this.filter);
    this.provinceForm = this.formBuilder.group({
      filter: this.filter,
    });
  }

  loadData(skipCount: number, resultCount: number, filter: string) {
    this.provinceList = [];
    this.service.getPageProvince(skipCount, resultCount, filter).subscribe({
      next: (data: any) => {
        this.provinceList = data.items;
        this.totalCount = data.totalCount;
        this.pageCount = Math.ceil(this.totalCount / this.defaultResultCount);
      }
    },
    );
  }

  onSubmit() {
    let value = this.provinceForm.value;
    if (value.filter !== this.filter) {
      this.skipCount = 0;
      this.currentPage = 1;
      this.filter = value.filter;
    }
    this.loadData(this.skipCount, this.defaultResultCount, this.filter);
  }

  sendDataToLocalStorage() {
    this.localStorageService.setDataLocalStorage(ConstData.LISTDATA, this.provinceList);
  }

  deleteProvince(provinceId: number) {
    this.service.deleteProvince(provinceId).subscribe(
      (response) => {
        console.log('Response from API:', response);
        alert("Delete province successfully!");
        this.loadData(this.skipCount, this.defaultResultCount, this.filter);
      },
      (error) => {
        console.error('Error from API:', error);
        alert("Delete province failed!");
      }
    );
  }

  first(){
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.skipCount = 0;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter);
    }
  }

  prev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.skipCount -= this.defaultResultCount;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter);
    }
  }

  next() {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
      this.skipCount += this.defaultResultCount;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter);
    }
  }

  last(){
    if (this.currentPage < this.pageCount) {
      this.currentPage = this.pageCount;
      this.skipCount = (this.pageCount-1)*this.defaultResultCount;
      this.loadData(this.skipCount, this.defaultResultCount, this.filter);
    }
  }
}
