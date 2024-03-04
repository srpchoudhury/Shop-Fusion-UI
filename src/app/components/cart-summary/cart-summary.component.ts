import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItmes: any;
  constructor(private cart: CartService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getCartSummary();
  }
  getCartSummary() {
    if (this.auth.isLoggedIn()) {
      this.cart.GetCart(this.auth.getUserDetails().id).subscribe({
        next: (res) => {
          this.cartItmes = res.result;
        }
      });
    } else {
      this.cartItmes = this.cart.getWithoutLoginAddToCart();
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
