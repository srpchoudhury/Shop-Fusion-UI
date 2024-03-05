import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductlistService } from 'src/app/services/productlist.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItmes: any;
  totalSum: any = 0;
  cartDto!: any;
  isLoggedIn!:boolean;
  constructor(private cartService: CartService, private auth: AuthService,private productlistService: ProductlistService ) { }

  ngOnInit(): void {
    this.getCartSummary();
    this.isLoggedIn=this.auth.isLoggedIn();
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
      if (items != null) {
        this.cartItmes = items;
      }
    }
  }
  removeCart(productId: number) {
    if (this.auth.isLoggedIn()) {
      const userId = this.auth.getUserDetails().id;
      if (userId != null) {
        this.cartService.RemoveCart(userId, productId).subscribe({
          next: (res) => {
            if (res.isSuccess) {
              alert('removed successfully');
              this.getCartSummary();
            }
          }, error: (err) => {
            alert(err.message);
          }
        });
      }
    }
    else {
      let existingCartDetails = this.cartService.getWithoutLoginAddToCart();
      this.totalSum=0;
      let existingProductIndex = existingCartDetails.cartDetails.findIndex((cartDetail: any) => cartDetail.productId === productId);
      if (existingProductIndex !== -1) {
        if (existingCartDetails.cartDetails[existingProductIndex].count <= 1) {
          existingCartDetails.cartDetails.splice(existingProductIndex, 1);
        } else {
          existingCartDetails.cartDetails[existingProductIndex].count--;
        }
        if (existingCartDetails != null) {
          for (let item of existingCartDetails.cartDetails) {
            this.totalSum += (item.product.productPrice * item.count);
          }
          existingCartDetails.cartHeader.cartTotal = this.totalSum;
        }
      }
      
      console.log(existingCartDetails);
      this.cartService.storeWithoutLoginAddToCart(existingCartDetails);
      this.getCartSummary();
      alert('removed successfully');
    }
  }
  AddToCart(productId: number) {
    this.productlistService.getProduct(productId).subscribe(response => {
      if (response.isSuccess) {
        const productDetails = response.result[0];
        const loggedInUserId = this.auth.isLoggedIn() ? this.auth.getUserDetails().id : 0;
        this.cartDto = {
          cartHeader: {
            userId: loggedInUserId,
          },
          cartDetails: [{
            cartHeader: {
              userId: loggedInUserId,
            },
            productId: productDetails.productId,
            product: productDetails,
            count: 1
          }]
        };

        if (this.auth.isLoggedIn()) {
          this.cartService.sendCartData(this.cartDto).subscribe(response => {
            if (response.isSuccess) {
              alert('successfully added');
              this.getCartSummary();
            } else {
              alert('cant insert cart items');
            }
          });
        } else {
          this.updateCartDetailsWithoutLogin(productDetails);
        }
      } else {
        console.log('Failed to get product details.');
      }
    });
  }
  updateCartDetailsWithoutLogin(productDetails: any) {
    let existingCartDetails = this.cartService.getWithoutLoginAddToCart();
  
    this.totalSum = 0;
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
    let existingProductIndex = existingCartDetails.cartDetails.findIndex((cartDetail: any) => cartDetail.productId === productDetails.productId);
    if (existingProductIndex !== -1) {
      existingCartDetails.cartDetails[existingProductIndex].count++;

    } else {
      existingCartDetails.cartDetails.push({
        productId: productDetails.productId,
        product: productDetails,
        count: 1
      });
    }
    if (existingCartDetails != null) {
      for (let item of existingCartDetails.cartDetails) {
        this.totalSum += (item.product.productPrice * item.count);
      }
      existingCartDetails.cartHeader.cartTotal = this.totalSum;
    }
    console.log(existingCartDetails);
    this.cartService.storeWithoutLoginAddToCart(existingCartDetails);
    alert('Added successfullly');
    this.getCartSummary();
  }

  checkout() {
    if (this.isLoggedIn) {
      alert("Order Successfully Placed");
    } else {
      alert("Please Login First");
    }
  }

}
