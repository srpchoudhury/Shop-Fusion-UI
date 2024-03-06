import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productType } from '../models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {
  private baseUrl = 'https://localhost:7000/api/product/';
  constructor(private http: HttpClient) { }

 
  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getProduct(productId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}${productId}`);
  }
 
  getItemCategoryDetails(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}itemCategoryDetails/${id}`);
  }
  getMainCategory():Observable<any>{
    return this.http.get(`${this.baseUrl}maincategory`);
  }
  getBrands():Observable<any>{
    return this.http.get(`${this.baseUrl}brands`);
  }
  getCategories():Observable<any>{
    return this.http.get(`${this.baseUrl}categories`);
  }
  getSubCategories():Observable<any>{
    return this.http.get(`${this.baseUrl}subcategories`);
  }
  
  
}
