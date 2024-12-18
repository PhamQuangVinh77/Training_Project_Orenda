import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductGroupDTO } from '../../Dto/ProductGroupDTO';
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
  listCategory : ProductGroupDTO[]= [];

  constructor(private fb : FormBuilder, private localStorageService : LocalStorageService, private productService : ProductService){
    this.listCategory=this.localStorageService.getDataLocalStorage(this.categoryKey);
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      productName: ['', Validators.required],
      price:['', Validators.required],
      quantity:['', Validators.required],
      groupId:[this.listCategory[0].groupId],
    })
  }

  onSubmit(){
    let defaultId = 0;
    let value = this.addForm.value;
    this.productService.addNewProduct(defaultId, value.productName, value.price, value.quantity, value.groupId).subscribe(
      (response : any) => {
          alert(response.message);
          window.history.back();
      },
      (err : any) => {
        alert(err.error.message);
      }
    );
  }
}
