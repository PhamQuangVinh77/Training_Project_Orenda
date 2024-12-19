import { Injectable, OnInit } from "@angular/core";
import { ProductDto } from "../Dto/ProductDTO";
import { ProductGroupDTO } from "../Dto/ProductGroupDTO";
import { LocalStorageService } from "./local-storage.service";
import { ConstData } from "../Dto/ConstData";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService implements OnInit {
    // defaultListProduct: ProductDto[] = [
    //     {
    //         productName: "Ronaldo",
    //         productCode: "01",
    //         expireDate: new Date(),
    //         unitSold: 100,
    //         inStock: 200,
    //         groupId: "7"
    //     },
    //     {
    //         productName: "Messi",
    //         productCode: "02",
    //         expireDate: new Date(),
    //         unitSold: 100,
    //         inStock: 200,
    //         groupId: "10"
    //     },
    //     {
    //         productName: "Benzema",
    //         productCode: "03",
    //         expireDate: new Date(),
    //         unitSold: 100,
    //         inStock: 200,
    //         groupId: "9"
    //     },
    //     {
    //         productName: "Reus",
    //         productCode: "04",
    //         expireDate: new Date(),
    //         unitSold: 100,
    //         inStock: 200,
    //         groupId: "11"
    //     },
    //     {
    //         productName: "Van Dijk",
    //         productCode: "05",
    //         expireDate: new Date(),
    //         unitSold: 100,
    //         inStock: 200,
    //         groupId: "4"
    //     },
    //     {
    //         productName: "Neuer",
    //         productCode: "06",
    //         expireDate: new Date(),
    //         unitSold: 100,
    //         inStock: 200,
    //         groupId: "1"
    //     },
    //     {
    //         productName: "Dumfries",
    //         productCode: "07",
    //         expireDate: new Date(),
    //         unitSold: 100,
    //         inStock: 200,
    //         groupId: "2"
    //     },
    //     {
    //         productName: "Kimmich",
    //         productCode: "08",
    //         expireDate: new Date(),
    //         unitSold: 100,
    //         inStock: 200,
    //         groupId: "6"
    //     }
    // ]

    defaultListGroupProduct: ProductGroupDTO[] = [
        {
            groupId: "2",
            groupName: "ST"
        },
        {
            groupId: "4",
            groupName: "CF"
        },
        {
            groupId: "5",
            groupName: "LW"
        },
        {
            groupId: "6",
            groupName: "RW"
        },
        {
            groupId: "7",
            groupName: "CAM"
        },
        {
            groupId: "8",
            groupName: "CM"
        },
        {
            groupId: "9",
            groupName: "CDM"
        },
        {
            groupId: "10",
            groupName: "CB"
        },
        {
            groupId: "11",
            groupName: "LB"
        },
        {
            groupId: "14",
            groupName: "RB"
        },
        {
            groupId: "15",
            groupName: "GK"
        }
    ]

    productKey = ConstData.PRODUCTKEY;
    categoryKey = ConstData.CATEGORYKEY;
    listProduct: ProductDto[] = [];
    listGroupProduct: ProductGroupDTO[] = [];
    constructor(private service: LocalStorageService, private httpClient: HttpClient) {
        // this.listProduct = this.service.getDataLocalStorage(this.productKey);
        // if (this.listProduct === null) {
        //     this.listProduct = this.defaultListProduct;
        //     this.service.setDataLocalStorage(this.productKey, this.listProduct);
        // }

        this.listGroupProduct = this.service.getDataLocalStorage(this.categoryKey);
        if (this.listGroupProduct === null) {
            this.listGroupProduct = this.defaultListGroupProduct;
            this.service.setDataLocalStorage(this.categoryKey, this.listGroupProduct);
        }
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    getAllProducts(): Observable<any[]> {
        let url = ConstData.PRODUCTS_URL;
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return this.httpClient.get<any[]>(url, { headers });
    }

    getProductById(productId: number) {
        let url = ConstData.PRODUCTS_URL + "/" + String(productId);
        let body = new HttpParams().set('id', productId);
        let headers = new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
        });
        return this.httpClient.post<any>(url, body.toString(), { headers } );
    }

    deleteProduct(productId: number) {
        let url = ConstData.PRODUCTS_URL + "/delete/" + String(productId);
        let body = new HttpParams().set('id', productId);
        let headers = new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
        });
        return this.httpClient.post(url, body.toString(), { headers });
    }

    addNewProduct(id: number, name: string, price: number, quantity: number, productGroupId: number) {
        let url = ConstData.PRODUCTS_URL;
        let data = { "id": id, "name": name, "price": price, "quantity": quantity, "productGroupId": productGroupId };
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
        });
        return this.httpClient.post<any>(url, data, { headers });
    }

    updateProduct(id: number, name: string, price: number, quantity: number, productGroupId: number) {
        let url = ConstData.PRODUCTS_URL + "/" + String(id);
        let data = { "id": id, "name": name, "price": price, "quantity": quantity, "productGroupId": productGroupId };
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
        });
        return this.httpClient.put<any>(url, data, { headers });
    }
    // addProduct(newProduct: ProductDto) {
    //     this.listProduct.push(newProduct);
    //     this.service.setDataLocalStorage(this.productKey, this.listProduct);
    // }

    // deleteProduct(productCode: string) {
    //     this.listProduct = this.listProduct.filter(p => p.productCode != productCode);
    //     this.service.setDataLocalStorage(this.productKey, this.listProduct);
    // }

    // deleteAllProduct() {
    //     this.listProduct = [];
    //     this.service.setDataLocalStorage(this.productKey, this.listProduct);
    // }

    addProductGroup(category: ProductGroupDTO) {
        this.listGroupProduct.push(category);
        this.service.setDataLocalStorage(this.categoryKey, this.listGroupProduct);
    }

    deleteProductGroup(groupId: string) {
        this.listGroupProduct = this.listGroupProduct.filter(g => g.groupId != groupId);
        //this.listProduct = this.listProduct.filter(p => p.groupId != groupId);
        this.service.setDataLocalStorage(this.categoryKey, this.listGroupProduct);
        this.service.setDataLocalStorage(this.productKey, this.listProduct);
    }
}