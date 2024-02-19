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
  
}
