import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductGroupDTO } from '../../Dto/ProductGroupDTO';
import { ProductDto } from '../../Dto/ProductDTO';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductService } from '../../services/product.service';
import { ConstData } from '../../Dto/ConstData';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{
  editForm!: FormGroup;
  categoryKey = ConstData.CATEGORYKEY;
  listCategory : ProductGroupDTO[]= [];

  constructor(private fb : FormBuilder, private localStorageService : LocalStorageService, private productService : ProductService, private activatedRoute : ActivatedRoute){
    this.listCategory=this.localStorageService.getDataLocalStorage(this.categoryKey);
  }

  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.params?.['id'];
    let currentProduct = this.productService.getProductByCode(code);
    this.editForm = this.fb.group({
      productName: currentProduct?.productName,
      groupId:currentProduct?.groupId,
      expireDate:currentProduct?.expireDate.toString().split('T')[0],
      inStock:currentProduct?.inStock,
    })
  }

  onSubmit(){
    let value = this.editForm.value;
    let updateProduct: ProductDto = {
      productName: value.productName,
      productCode: this.activatedRoute.snapshot.params?.['id'],
      expireDate: value.expireDate,
      unitSold: 0,
      inStock: value.inStock,
      groupId: value.groupId
    }
    this.productService.updateProduct(updateProduct);
    window.history.back();
  }
}
