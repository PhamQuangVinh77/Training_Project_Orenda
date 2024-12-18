import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {

  }

  getDataLocalStorage(key: string) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setDataLocalStorage(key: string, listData: any) {
    localStorage.setItem(key, JSON.stringify(listData));
  }

  deleteDataLocalStorage(key: string){
    localStorage.removeItem(key);
  }

}
