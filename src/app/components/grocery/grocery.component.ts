/*import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductlistService } from 'src/app/services/productlist.service';
import { CartDetailsDto, CartDto, ProductDto, productType } from 'src/app/models/UserDetails';
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
  cartDto!: CartDto;


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
  AddToCart(productId: number) {
    this.productlistService.getProduct(productId).subscribe(response => {
      if (response.isSuccess) {
        const productDetails = response.result[0];
        //const LoggedInUserId = this.auth.getUserDetails().id;
        const LoggedInUserId = this.auth.isLoggedIn() ? this.auth.getUserDetails().id : 0;


        this.cartDto = {
          cartHeader: {
            cartHeaderId: 0,
            userId: LoggedInUserId,
            couponCode: "",
            discount: 0,
            cartTotal: 0
          },
          cartDetails: [
            {
              cartDetailsId: 0,
              cartHeaderId: 0,
              cartHeader: {
                cartHeaderId: 0,
                userId: LoggedInUserId,
                couponCode: "",
                discount: 0,
                cartTotal: 0
              },
              productId: productDetails.productId,
              product: {
                productId: productDetails.productId,
                productName: productDetails.productName,
                productDescription: productDetails.productDescription,
                productImage: productDetails.productImage,
                productPrice: productDetails.productPrice,
                categoryName: productDetails.categoryName,
                subCategoryName: productDetails.subCategoryName,
                categoryId: productDetails.categoryId,
                subCategoryId: productDetails.subCategoryId
              },
              count: 1
            }
          ]
        };
        //let userLogged = this.auth.isLoggedIn();
        if (this.auth.isLoggedIn()) {

          this.cartService.sendCartData(this.cartDto).subscribe(response => {
            if (response.isSuccess) {
              console.log('successfully added');
            } else {
              console.log('cant insert cart items');
            }
          });
        } else {
          let existingCartDetails = this.cartService.getWithoutLoginAddToCart();
          if (!existingCartDetails) {

            existingCartDetails = {
              cartHeader: {
                cartHeaderId: 0,
                userId: 0,
                couponCode: '',
                discount: 0,
                cartTotal: 0
              },
              cartDetails: []
            };
          }

          if (!existingCartDetails.cartDetails) {
            existingCartDetails.cartDetails = []; 
        }
          let existingProductIndex = existingCartDetails.cartDetails.findIndex((cartDetail: { productId: any; }) => cartDetail.productId === productDetails.productId);
          console.log(existingProductIndex)
          if (existingProductIndex !== -1) {
            // If product exists, increment count
            existingCartDetails.cartDetails[existingProductIndex].count++;
          } else {
            existingCartDetails.cartDetails.push({
              productId: productDetails.productId,
              product: {
                productId: productDetails.productId,
                productName: productDetails.productName,
                productDescription: productDetails.productDescription,
                productImage: productDetails.productImage,
                productPrice: productDetails.productPrice,
                categoryName: productDetails.categoryName,
                subCategoryName: productDetails.subCategoryName,
                categoryId: productDetails.categoryId,
                subCategoryId: productDetails.subCategoryId
              },
              count: 1
            });
          }
        }

      } else {
        console.log('Failed to get product details.');
      }
    });
  }


}
*/

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductlistService } from 'src/app/services/productlist.service';
import { CartDto, productType } from 'src/app/models/UserDetails';
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
  cartDto!: any;
  mainImageUrl: string = 'https://i.imgur.com/Dhebu4F.jpg';
  productDetails: any;
  totalSum: any;

  constructor(private productlistService: ProductlistService,
    private cartService: CartService,
    private auth: AuthService

  ) { }

  ngOnInit(): void {
    this.loadItemCategories();
    this.loadProducts();
  }

  loadItemCategories() {
    this.productlistService.getItemCategoryDetails().subscribe(itemCategories => {
      this.itemCategories = Object.values(itemCategories.result);
    });
  }

  loadProducts() {
    this.productlistService.getProducts().subscribe(products => {
      this.products = Object.values(products.result);
      this.originalProducts = this.products;
    });
  }

  toggleCategory(category: any) {
    category.expanded = !category.expanded;
  }

  showSubCategoryBasedProduct(event: Event) {
    let elementId: number = parseInt((event.target as Element).id, 10);
    this.filteredProducts = this.originalProducts.filter((product: any) => product.subCategoryId === elementId);
    this.products = this.filteredProducts;
  }

  showCategoryBasedProduct(event: Event) {
    let elementId: number = parseInt((event.target as Element).id, 10);
    this.filteredProducts = this.originalProducts.filter((product: any) => product.categoryId === elementId);
    this.products = this.filteredProducts;
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
              console.log('successfully added');
            } else {
              console.log('cant insert cart items');
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
    let existingProductIndex = existingCartDetails.cartDetails.findIndex((cartDetail: any) => cartDetail.productId === productDetails.productId);
    if (existingProductIndex !== -1) {
      existingCartDetails.cartDetails[existingProductIndex].count++;
      existingCartDetails.cartHeader.cartTotal= this.totalSum;
    } else {
      existingCartDetails.cartDetails.push({
        productId: productDetails.productId,
        product: productDetails,
        count: 1
      });
      existingCartDetails.cartHeader.cartTotal= this.totalSum;
    }

    this.cartService.storeWithoutLoginAddToCart(existingCartDetails);
  }
  changeImage(event: any) {
    const clickedImage = event.target;
    this.mainImageUrl = clickedImage.src;
  }
  openProductDetailsModal(product: any) {
    this.productDetails = product;
  }

}

