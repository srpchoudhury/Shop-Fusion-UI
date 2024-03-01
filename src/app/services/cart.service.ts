import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartDto } from '../models/UserDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: string = "https://localhost:7003/api/cart/";
  productAddedToCart: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient, private router: Router) { }
   
  // AddToCart(cartData: any){ 
  //   return this.http.post<any>(`${this.baseUrl}CartUpsert`,cartData);
  // }
  sendCartData(cartDto: CartDto): Observable<any> {
    return this.http.post<CartDto>(`${this.baseUrl}CartUpsert`,cartDto);
  }
  storeWithoutLoginAddToCart(itemDetails: any): void {
    console.log("succesfully added");
  
    localStorage.setItem('itemDetails', JSON.stringify(itemDetails));
    this.productAddedToCart.emit();
  }
  getWithoutLoginAddToCart(): any {
    const itemDetailsString = localStorage.getItem("itemDetails");
   
    if (itemDetailsString) {
      return JSON.parse(itemDetailsString);
    } else {
      return null;
    }
  }
  
}
