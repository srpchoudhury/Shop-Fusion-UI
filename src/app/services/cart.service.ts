import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cartDto } from '../models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: string = "https://localhost:7002/api/cart/";
  constructor(private http: HttpClient, private router: Router) { }
   
  AddToCart(upsert:any){
    return this.http.post<any>(`${this.baseUrl}CartUpsert`,upsert);
  }
}
