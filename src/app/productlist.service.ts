import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {
  private apiUrl = 'https://localhost:7000/api/product';
  constructor(private http: HttpClient) { }

 
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getItemCategoryDetails(): Observable<any> {
    return this.http.get("https://localhost:7000/api/product/itemCategoryDetails");
  }
  getMainCategory():Observable<any>{
    return this.http.get('https://localhost:7000/api/product/maincategory');
  }
  getBrands():Observable<any>{
    return this.http.get('https://localhost:7000/api/product/brands');
  }
  getCategories():Observable<any>{
    return this.http.get('https://localhost:7000/api/product/categories');
  }
  getSubCategories():Observable<any>{
    return this.http.get('https://localhost:7000/api/product/subcategories');
  }
  
}
