export class ConstData{
    //Account
    static LOGIN: string= "http://test.nghiencuukhoahoc.com.vn/api/app/account/login";
    static LOGOUT: string= "http://test.nghiencuukhoahoc.com.vn/api/app/account/logout";
    static GETACCOUNT: string = "http://test.nghiencuukhoahoc.com.vn/api/app/account/get-account-bootstrap";
    static UPDATEACCOUNT: string = "http://test.nghiencuukhoahoc.com.vn/api/app/account/update-account-info";
    static DEFAULTPASSWORD: string = "Orenda@123";
    //Province
    static GETALLDATA: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/select-data-source/get-combo-data-source";
    static PAGGINGPROVINCE: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/tinh/get-list";
    static CREATEPROVINCE: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/tinh/create-or-update";
    static DELETEPROVINCE: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/tinh/delete-common-result";

    //District
    static PAGGINGDISTRICT: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/huyen/get-list";
    static CREATEPDISTRICT: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/huyen/create-or-update";
    static DELETEDISTRICT: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/huyen/delete-common-result";

    //Commune
    static PAGGINGCOMMUNE: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/xa/get-list";
    static CREATEPCOMMUNE: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/xa/create-or-update";
    static DELETECOMMUNE: string = "http://test.nghiencuukhoahoc.com.vn/api/master-data/xa/delete-common-result";

    //Local Storage Name
    static CATEGORYKEY : string = "categories";
    static PRODUCTKEY : string = "products";
    static USERSKEY : string = "userDataSource";
    static ACCESSTOKEN : string = "token";
    static LISTDATA: string = "list-data";
}