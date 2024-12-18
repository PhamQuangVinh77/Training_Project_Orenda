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
export class ListProductComponent implements OnInit {
  productKey = "products";
  categoryKey = "categories";
  productDataSource: any[] = [];
  productGroupData: ProductGroupDTO[] = [];
  constructor(private productService: ProductService, private lsService: LocalStorageService) { }
  ngOnInit(): void {
    this.loadData();
    let storedCategories = this.lsService.getDataLocalStorage(this.categoryKey);
    if (storedCategories) {
      this.productGroupData = storedCategories;
    }
  }

  loadData() {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.productDataSource = data;
        console.log(data);
      }
    })
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        console.log('Response from API:', response);
        alert(response.message);
        this.ngOnInit();
      },
      (err: any) => {
        console.error('Error from API:', err);
        alert(err.error.message);
      }
    );
  }

  deleteAllProduct() {
    // this.productService.deleteAllProduct();
    // this.ngOnInit();
  }

  deleteProductGroup(groupId: string) {
    this.productService.deleteProductGroup(groupId);
    this.ngOnInit();
  }
}
