import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductlistService } from 'src/app/services/productlist.service';
import { cartDto, productDto, productType } from 'src/app/models/UserDetails';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
  itemCategories: any = [];
  products: productType[] = [];
  filteredProducts: any = [];
  originalProducts: any = [];

  constructor(private productlistService: ProductlistService,
              private cartService: CartService,
              private auth: AuthService
             ) { }

  ngOnInit(): void {
    //get side bar category details
    this.productlistService.getItemCategoryDetails().subscribe(itemCategories => {
      this.itemCategories = Object.values(itemCategories.result);
    });

    //get total product details
    this.productlistService.getProducts().subscribe(products => {
      this.products = Object.values(products.result);
      this.originalProducts = this.products;
    });
   //console.log(this.cartService.GetProductFromCart());
  }

  //toggle side bar
  toggleCategory(category: any) {
    category.expanded = !category.expanded;
  }
  //after all changed
  showSubCategoryBasedProduct(event: Event) {
    let elementId: number = parseInt((event.target as Element).id, 10);
    this.filteredProducts = this.originalProducts.filter((product: any) => product.subCategoryId === elementId);
    this.products = this.filteredProducts;
  }
  //after subcategory changed
  showCategoryBasedProduct(event: Event) {
    let elementId: number = parseInt((event.target as Element).id, 10);
    this.filteredProducts = this.originalProducts.filter((product: any) => product.categoryId === elementId);
    this.products = this.filteredProducts;
  }
  AddToCart(productId:number){

  }

}
