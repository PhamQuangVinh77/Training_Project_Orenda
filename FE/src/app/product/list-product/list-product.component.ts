import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../Dto/ProductDTO';
import { ProductGroupDTO } from '../../Dto/ProductGroupDTO';
import { ProductService } from '../../services/product.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit{
  productKey = "products";
  categoryKey = "categories";
  productDataSource : ProductDto[] = [];
  productGroupData : ProductGroupDTO[] = [];
  constructor(private productService : ProductService, private lsService : LocalStorageService){}
  ngOnInit(): void {
    let storedProducts = this.lsService.getDataLocalStorage(this.productKey);
    let storedCategories = this.lsService.getDataLocalStorage(this.categoryKey);
    if (storedProducts) {
      this.productDataSource = storedProducts;
    }
    if(storedCategories){
      this.productGroupData = storedCategories;
    }
  }

  deleteProduct(productCode:string){
    this.productService.deleteProduct(productCode);
    this.ngOnInit();
  }

  deleteAllProduct(){
    this.productService.deleteAllProduct();
    this.ngOnInit();
  }

  deleteProductGroup(groupId: string){
    this.productService.deleteProductGroup(groupId);
    this.ngOnInit();
  }
}
