import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductService } from '../services/product.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
    {
        path: '', 
        component: ListProductComponent
    },
    { 
        path: 'add-product', 
        component: AddProductComponent 
    },
    { 
        path: 'edit-product/:id', 
        component: EditProductComponent
    },
    { 
        path: 'add-category', 
        component: AddCategoryComponent
    }
];

@NgModule({
    declarations: [
        ListProductComponent,
        AddProductComponent,
        EditProductComponent,
        AddCategoryComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ],
    providers: [ProductService, LocalStorageService]
})
export class ProductModule{

}