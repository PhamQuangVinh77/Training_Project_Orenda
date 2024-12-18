import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductGroupDTO } from '../../Dto/ProductGroupDTO';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  addCategoryForm!: FormGroup;

  constructor(private fb : FormBuilder, private productService : ProductService){
    this.addCategoryForm = this.fb.group({
      categoryName: "",
    })
  }

  onSubmit(){
    let value = this.addCategoryForm.value;
    let newCategory: ProductGroupDTO = {
      groupId: String(Math.floor(Math.random() * 1000)),
      groupName: value.categoryName
    }
    this.productService.addProductGroup(newCategory);
    alert("Add new category successfully!");
    window.history.back();
  }
}
