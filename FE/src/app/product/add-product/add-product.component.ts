import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductGroupDTO } from '../../Dto/ProductGroupDTO';
import { ProductDto } from '../../Dto/ProductDTO';
import { ProductService } from '../../services/product.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ConstData } from '../../Dto/ConstData';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{
  addForm!: FormGroup;
  categoryKey = ConstData.CATEGORYKEY;
  defaultDate = new Date().toISOString().split('T')[0];
  listCategory : ProductGroupDTO[]= [];

  constructor(private fb : FormBuilder, private localStorageService : LocalStorageService, private productService : ProductService){
    this.listCategory=this.localStorageService.getDataLocalStorage(this.categoryKey);
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      productName: ['', Validators.required],
      groupId:[this.listCategory[0].groupId],
      expireDate:[this.defaultDate],
      inStock:['', Validators.required],
    })
  }

  onSubmit(){
    let value = this.addForm.value;
    let newProduct: ProductDto = {
      productName: value.productName,
      productCode: String(Math.floor(Math.random() * 1000)),
      expireDate: value.expireDate,
      unitSold: 0,
      inStock: value.inStock,
      groupId: value.groupId
    }
    this.productService.addProduct(newProduct);
    alert("Add product successfully!");
    window.history.back();
  }
}
