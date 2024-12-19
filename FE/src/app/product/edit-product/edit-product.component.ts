import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductGroupDTO } from '../../Dto/ProductGroupDTO';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductService } from '../../services/product.service';
import { ConstData } from '../../Dto/ConstData';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  editForm!: FormGroup;
  categoryKey = ConstData.CATEGORYKEY;
  listCategory: ProductGroupDTO[] = [];
  currentProduct: any;
  productId: number = 0;

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService, private productService: ProductService, private activatedRoute: ActivatedRoute) {
    this.listCategory = this.localStorageService.getDataLocalStorage(this.categoryKey);
    this.productId = Number(this.activatedRoute.snapshot.params?.['id']);
  }

  ngOnInit(): void {
    this.productService.getProductById(Number(this.productId)).subscribe(
      (response: any) => {
        this.currentProduct = response;
        this.editForm = this.fb.group({
          productName: this.currentProduct.name,
          price: this.currentProduct.price,
          quantity: this.currentProduct.quantity,
          groupId: this.currentProduct.productGroupId
        })
      },
      (err: any) => {
        alert("Product doesn't exist!");
      }
    );
  }

  onSubmit() {
    let value = this.editForm.value;
    console.log(value);
    this.productService.updateProduct(this.productId, value.productName, value.price, value.quantity, value.groupId).subscribe(
      (response: any) => {
        alert(response.message);
        window.history.back();
      },
      (err: any) => {
        alert(err.error.message);
      }
    );
  }
}
