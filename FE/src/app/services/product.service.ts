import { Injectable } from "@angular/core";
import { ProductDto } from "../Dto/ProductDTO";
import { ProductGroupDTO } from "../Dto/ProductGroupDTO";
import { LocalStorageService } from "./local-storage.service";
import { ConstData } from "../Dto/ConstData";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    defaultListProduct: ProductDto[] = [
        {
            productName: "Ronaldo",
            productCode: "01",
            expireDate: new Date(),
            unitSold: 100,
            inStock: 200,
            groupId: "7"
        },
        {
            productName: "Messi",
            productCode: "02",
            expireDate: new Date(),
            unitSold: 100,
            inStock: 200,
            groupId: "10"
        },
        {
            productName: "Benzema",
            productCode: "03",
            expireDate: new Date(),
            unitSold: 100,
            inStock: 200,
            groupId: "9"
        },
        {
            productName: "Reus",
            productCode: "04",
            expireDate: new Date(),
            unitSold: 100,
            inStock: 200,
            groupId: "11"
        },
        {
            productName: "Van Dijk",
            productCode: "05",
            expireDate: new Date(),
            unitSold: 100,
            inStock: 200,
            groupId: "4"
        },
        {
            productName: "Neuer",
            productCode: "06",
            expireDate: new Date(),
            unitSold: 100,
            inStock: 200,
            groupId: "1"
        },
        {
            productName: "Dumfries",
            productCode: "07",
            expireDate: new Date(),
            unitSold: 100,
            inStock: 200,
            groupId: "2"
        },
        {
            productName: "Kimmich",
            productCode: "08",
            expireDate: new Date(),
            unitSold: 100,
            inStock: 200,
            groupId: "6"
        }
    ]

    defaultListGroupProduct: ProductGroupDTO[] = [
        {
            groupId: "9",
            groupName: "Striker"
        },
        {
            groupId: "7",
            groupName: "Left Winger"
        },
        {
            groupId: "11",
            groupName: "Right Winger"
        },
        {
            groupId: "10",
            groupName: "Centre Attack Middlefield"
        },
        {
            groupId: "8",
            groupName: "Centre Middlefield"
        },
        {
            groupId: "6",
            groupName: "Centre Defender Middlefield"
        },
        {
            groupId: "4",
            groupName: "Centre Back"
        },
        {
            groupId: "2",
            groupName: "Right Back"
        },
        {
            groupId: "3",
            groupName: "Left Back"
        },
        {
            groupId: "1",
            groupName: "Goalkeeper"
        }
    ]

    productKey = ConstData.PRODUCTKEY;
    categoryKey =  ConstData.CATEGORYKEY;
    listProduct: ProductDto[] = [];
    listGroupProduct: ProductGroupDTO[] = [];
    constructor(private service: LocalStorageService) {
        this.listProduct = this.service.getDataLocalStorage(this.productKey);
        if (this.listProduct === null) {
            this.listProduct = this.defaultListProduct;
            this.service.setDataLocalStorage(this.productKey, this.listProduct);
        }

        this.listGroupProduct = this.service.getDataLocalStorage(this.categoryKey);
        if (this.listGroupProduct === null) {
            this.listGroupProduct = this.defaultListGroupProduct;
            this.service.setDataLocalStorage(this.categoryKey, this.listGroupProduct);
        }
    }

    addProduct(newProduct: ProductDto) {
        this.listProduct.push(newProduct);
        this.service.setDataLocalStorage(this.productKey, this.listProduct);
    }

    deleteProduct(productCode: string) {
        this.listProduct = this.listProduct.filter(p => p.productCode != productCode);
        this.service.setDataLocalStorage(this.productKey, this.listProduct);
    }

    deleteAllProduct() {
        this.listProduct = [];
        this.service.setDataLocalStorage(this.productKey, this.listProduct);
    }

    updateProduct(updateProduct: ProductDto) {
        let productIndex = this.listProduct.findIndex(p => p.productCode === updateProduct.productCode);
        this.listProduct[productIndex].productName = updateProduct.productName;
        this.listProduct[productIndex].inStock = updateProduct.inStock;
        this.listProduct[productIndex].expireDate = updateProduct.expireDate;
        this.listProduct[productIndex].groupId = updateProduct.groupId;
        this.service.setDataLocalStorage(this.productKey, this.listProduct);
    }

    getProductByCode(productCode: string) {
        return this.listProduct.find(p => p.productCode === productCode);
    }

    addProductGroup(category : ProductGroupDTO){
        this.listGroupProduct.push(category);
        this.service.setDataLocalStorage(this.categoryKey, this.listGroupProduct);
    }

    deleteProductGroup(groupId: string) {
        this.listGroupProduct = this.listGroupProduct.filter(g=> g.groupId != groupId);
        this.listProduct = this.listProduct.filter(p => p.groupId != groupId);
        this.service.setDataLocalStorage(this.categoryKey, this.listGroupProduct);
        this.service.setDataLocalStorage(this.productKey, this.listProduct);
    }
}