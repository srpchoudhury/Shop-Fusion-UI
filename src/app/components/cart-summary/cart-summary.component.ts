import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItmes: any;
  totalSum: any;
  constructor(private cartService: CartService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getCartSummary();
  }
  getCartSummary() {
    if (this.auth.isLoggedIn()) {
      this.cartService.GetCart(this.auth.getUserDetails().id).subscribe({
        next: (res) => {
          this.cartItmes = res.result;
        }
      });
    } else {
      const items = this.cartService.getWithoutLoginAddToCart();
      if(items != null){
        this.cartItmes = items;
      }
    }
  }
  removeCart(productId:number){
    const userId = this.auth.getUserDetails().id;
    if(this.auth.isLoggedIn()){
      this.cartService.RemoveCart(userId,productId).subscribe({
        next: (res) => {
          if(res.isSuccess){
            this.getCartSummary();
          }
        },error: (err) =>{
          alert(err.message);
        }
      });
    } else { 
      let existingCartDetails = this.cartService.getWithoutLoginAddToCart();
      console.log(existingCartDetails);
  
      this.totalSum = 0;
      for (let item of existingCartDetails.cartDetails) {
        this.totalSum += (item.product.productPrice * item.count);
      }
  console.log(this.totalSum)
      if (!existingCartDetails) {
        existingCartDetails = {
          cartHeader: {
            cartHeaderId: 0,
            userId: 0,
            couponCode: '',
            discount: 0,
            cartTotal: this.totalSum
          },
          cartDetails: []
        };
      }
  
      if (!existingCartDetails.cartDetails) {
        existingCartDetails.cartDetails = [];
      }
      let existingProductIndex = existingCartDetails.cartDetails.findIndex((cartDetail: any) => cartDetail.productId === productId);
      if (existingProductIndex !== -1) {
        existingCartDetails.cartDetails[existingProductIndex].count--;
        existingCartDetails.cartHeader.cartTotal= this.totalSum;
      } else {
        existingCartDetails.cartDetails.pop();
        existingCartDetails.cartHeader.cartTotal= this.totalSum;
      }
  
      this.cartService.storeWithoutLoginAddToCart(existingCartDetails);
          
    }

  }
  checkout(){
    if(this.auth.isLoggedIn()){
      alert("Order Successfully Placed");
    } else {
      alert("Please Login First");
    }
  }

}
